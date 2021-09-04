import { ConversionService } from 'src/app/services/conversion.service';
import { userService } from './../../../../services/user.service';
import { ActivityService } from './../../../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { add, substract } from 'src/app/redux/actions/counter.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css'],
})
export class ChargeComponent implements OnInit {
  userId: any = localStorage.getItem('id');
  form: FormGroup;
  count$?: Observable<number>;
  activatedRoute?: any;
  add_: boolean = false;
  payment: boolean = false;
  send: boolean = false;
  exchangeSend: boolean = false;
  exchangeBuy: boolean = false;
  generalAccounts!: any;
  destinatary!: any;
  localAccount!: any;
  compra!: any;
  venta!: any;
  dolar: number = 0;
  constructor(
    private fb: FormBuilder,
    private store: Store<{ count: number }>,
    private router: Router,
    private ActivityService: ActivityService,
    private userService: userService,
    private conver: ConversionService
  ) {
    this.userId = this.userId ? JSON.parse(this.userId) : [];
    this.form = this.fb.group({
      concept: [''],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: [new Date().toUTCString()],
      currency: ['', [Validators.required]],
      dolarValue: '',
      id: [`${this.userId}`],
    });
  }
  ngOnInit(): void {
    (() => {
      // Verifica que tipo de acción es
      if (this.router.url.includes('add')) {
        this.add_ = true;
        this.exchangeBuy = false;
      } else if (this.router.url.includes('send')) {
        this.send = true;
        this.exchangeBuy = false;
      } else if (this.router.url.includes('exchangeBuy')) {
        this.exchangeBuy = true;
      } else if (this.router.url.includes('exchangeSend')) {
        this.exchangeSend = true;
      } else if (this.router.url.includes('payment')) {
        this.payment = true;
        this.exchangeBuy = false;
      }
      console.log(this.exchangeBuy);
      this.conver.getChange().subscribe((data) => {
        let result = data[0].casa;
        const { compra, venta } = result;
        this.compra = compra;
        this.venta = venta;
      });
    })();
  }

  cambioDolar(valor: number) {
    this.dolar = valor / parseInt(this.compra);
    this.dolar = Math.round(this.dolar * 100) / 100;
    console.log(typeof this.dolar);
  }
  getCharge() {
    console.log(this.form.value.dolarValue);
  //***************** */ HAY MANERA DE QUE SE ASIGNE OBTENIENDO EL VALOR DEL VALUE ACA?******************************
    this.form.value.dolarValue = this.dolar;
    console.log(this.form.value);
    this.destinatary = this.router.url;
    this.destinatary = this.destinatary.split(/\//)[3];
    let actualUser = this.userService.currentUser();
    let operation =
      this.payment || this.send || this.exchangeBuy
        ? actualUser!.accounts.pesos - this.form.value.amount
        : actualUser!.accounts.pesos + this.form.value.amount;
    this.payment || this.send || this.exchangeBuy
      ? (this.form.value.concept = `(-)${this.form.value.concept}`)
      : (this.form.value.concept = `(+)${this.form.value.concept}`);
    console.log(this.form.value.concept);
    this.send
      ? (this.form.value.concept = `${this.form.value.concept} ,transferenrencia realizada a ${this.destinatary}`)
      : null;
    this.exchangeBuy ? (this.form.value.concept = 'Compra dolares') : null;
    this.exchangeSend ? (this.form.value.concept = 'Venta dolares') : null;

    console.log(this.form.value.concept);
    this.ActivityService.saveActivity(this.form.value);
    this.ActivityService.updateBalance(operation);
    ///////////////////////////////////////////////////////////////////////////////////////////////F
    // CONDICIONAL PARA TRANSFERENCIA
    this.send
      ? this.ActivityService.sendMoney(
          Number(this.destinatary),
          this.form.value.amount
        )
      : null;
    this.exchangeSend
      ? this.ActivityService.saleDollar(this.form.value.dolarValue)
      : null;
    this.exchangeBuy
      ? (() => {
          this.ActivityService.updateDolarAccount(this.form.value.dolarValue);
        })()
      : null;
  }

  // add(n: number) {
  //   this.store.dispatch(add({ num: n }));
  // }
  // substract(n: number) {
  //   this.store.dispatch(substract({ num: n }));
  // }
}

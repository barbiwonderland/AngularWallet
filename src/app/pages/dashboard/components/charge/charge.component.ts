import { ConversionService } from 'src/app/services/conversion.service';
import { userService } from './../../../../services/user.service';
import { ActivityService } from './../../../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  compra!: any;
  venta!: any;
  dolar: number = 0;
  dolarValue?: number;
  operation!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ActivityService: ActivityService,
    private userService: userService,
    private conver: ConversionService
  ) {
    // Datos del id actual
    this.userId = this.userId ? JSON.parse(this.userId) : [];
    // Datos del form
    this.form = this.fb.group({
      concept: [''],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: [new Date().toUTCString()],
      currency: ['', [Validators.required]],
      dolarValue: '',
      id: [this.userId],
    });
  }
  ngOnInit(): void {
    (() => {
      // Verifica que tipo de acción es mediante url
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
    this.add_ ? this.operation === 'suma' : this.operation === 'resta';
  }
  // Obtengo los datos de cambio
  conversionDolar(value: number) {
    if (this.exchangeBuy) {
      let conversionBuy = value / parseInt(this.compra);
      conversionBuy = Math.round(conversionBuy * 100) / 100;
      console.log(conversionBuy);
      this.dolarValue = conversionBuy;
    } else if (this.exchangeSend) {
      let amountDolar = this.venta;
      let getDolar = value / parseInt(amountDolar);
      getDolar = Math.round(getDolar * 100) / 100;
      this.dolarValue = getDolar;
    }
  }

  getCharge() {
    console.log(this.form.value.dolarValue);
    //***************** */ HAY MANERA DE QUE SE ASIGNE OBTENIENDO EL VALOR DEL VALUE ACA?******************************
    this.form.value.dolarValue = this.dolarValue;
    console.log(this.form.value);
    let destinataryUrl = this.router.url;
    let destinatary = destinataryUrl.split(/\//)[3];
    this.payment || this.send || this.exchangeBuy
      ? (this.form.value.concept = `(-)${this.form.value.concept}`)
      : this.add_
      ? (this.form.value.concept = `(+)${this.form.value.concept}`)
      : null;
    console.log(this.form.value.concept);
    this.send
      ? (this.form.value.concept = `${this.form.value.concept} ,transferenrencia realizada a ${destinatary}`)
      : null;
    this.exchangeBuy ? (this.form.value.concept = 'Compra dolares') : null;
    this.exchangeSend ? (this.form.value.concept = 'Venta dolares') : null;

    console.log(this.form.value.concept);
    this.ActivityService.saveActivity(this.form.value);
    // Verifico tipo de operación para pasar por parametro en el submit
    if (this.exchangeBuy || this.add_ || this.send || this.payment) {
      this.ActivityService.updateBalance(
        this.form.value.amount,
        // mejorar para venta dolares
        this.add_ ? 'suma' : 'resta'
      );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////F
    // CONDICIONAL PARA TRANSFERENCIA
    this.send
      ? this.ActivityService.sendMoney(
          Number(destinatary),
          this.form.value.amount
        )
      : null;
    // Condicional para venta de dolares
    if (this.exchangeSend) {
      let userInfo = this.userService.currentUser()!;
      const userDolarBalance = userInfo.accounts.dolar;
      console.log(userInfo);
      if (userDolarBalance - this.form.value.dolarValue >= 0) {
        this.ActivityService.saleDollar(
          this.form.value.dolarValue,
          this.form.value.amount
        );
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No posee suficiente Saldo',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 2000,
        });
      }
    }
    // Condicional para compra de dolares
    this.exchangeBuy
      ? (() => {
          this.ActivityService.updateDolarAccount(this.form.value.dolarValue);
        })()
      : null;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { add, substract } from 'src/app/redux/actions/counter.action';

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
  exchange: boolean = false;
  generalAccounts!: any;
  destinatary!: any;
  localAccount!:any;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ count: number }>,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.userId = this.userId ? JSON.parse(this.userId) : [];
    this.form = this.fb.group({
      concept: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: [new Date().toUTCString()],
      currency: ['', [Validators.required]],
      id: [`${this.userId}`],
    });
  }

  ngOnInit(): void {
    (() => {
      // Verifica que tipo de acción es
      if (this.router.url.includes('add')) {
        this.add_ = true;
      } else if (this.router.url.includes('send')) {
        this.send = true;
      } else if (this.router.url.includes('payment')) {
        this.payment = true;
      } else if (this.router.url.includes('exchange')) {
        this.exchange = true;
      }
    })();
    console.log(this.payment);
    console.log(this.add_);
    console.log(this.send);

    this.count$ = this.store.select('count');
    // Me trae todas las cuentas existentes
    this.generalAccounts = localStorage.getItem('accounts');
    this.generalAccounts = this.generalAccounts
      ? JSON.parse(this.generalAccounts)
      : [];
    console.log(this.generalAccounts);
  }

  getCharge() {
    console.log(this.form.value);
    // me traigo lo que hay en activity si no hay nada asigno []
    let activity: any ;
    activity = localStorage.getItem('activities');
    activity = activity ? JSON.parse(activity) : [];
    console.log(activity);
    //GUARDO NUEVO MOVIVIMIENTO
    let newActivity = this.form.value;
    // console.log("mov guardado",newActivity)
    activity.push(newActivity);
    console.log(activity, 'activity modificado');
    // Actualizo nuevo arreglo en LS
    localStorage.setItem('activities', JSON.stringify(activity));
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Actualizo el saldo
    // Traigo el saldo del LS
    this.localAccount = JSON.parse(localStorage.getItem('account')!);
    console.log(this.form.value.amount);
    // Guardo el nuevo saldo
    console.log(this.localAccount.balance - this.form.value.amount)
    let operation =
      this.payment || this.send
        ? this.localAccount.balance - this.form.value.amount
        : this.localAccount.balance + this.form.value.amount;
    let resumeAccount = {
      balance: operation,
      id: this.form.value.id,
    };
    console.log(resumeAccount);

    // Modifico el Array de todas las cuentas
    let updateArrayAccounts = this.generalAccounts.map((el: any) =>
      el.id === this.userId ? { ...el, balance: operation } : el
    );
    // CONDICIONAL PARA TRANSFERENCIA
    this.destinatary = this.router.url;
    this.destinatary = this.destinatary.split(/\//)[3];
    console.log(this.destinatary, 'destinatario');
    if (this.send) {
      updateArrayAccounts = updateArrayAccounts.map((el: any) =>
        el.id === this.destinatary
          ? { ...el, balance: el.balance + this.form.value.amount }
          : el
      );
    }
    console.log(this.send);
    console.log(updateArrayAccounts);
    // console.log(updateArrayAccounts);
    //modifico del localstorage
    localStorage.setItem('accounts', JSON.stringify(updateArrayAccounts));
    // modificar el arreglo original
    localStorage.setItem('account', JSON.stringify(resumeAccount));

    // localStorage.setItemH("accounts",JSON.stringify(newAccounts))
    this._snackBar.open('Agregado con éxito', '', {
      duration: 1500,
    });
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }
  // add(n: number) {
  //   this.store.dispatch(add({ num: n }));
  // }
  // substract(n: number) {
  //   this.store.dispatch(substract({ num: n }));
  // }
}

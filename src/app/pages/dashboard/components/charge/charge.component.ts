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
  exchange: boolean = false;
  generalAccounts!: any;
  destinatary!: any;
  localAccount!: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ count: number }>,
    private router: Router,
    private ActivityService: ActivityService,
    private userService: userService
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
  }
  getCharge() {
    this.destinatary = this.router.url;
    this.destinatary = this.destinatary.split(/\//)[3];
    let actualUser = this.userService.currentUser();
    let operation =
      this.payment || this.send
        ? actualUser.accounts.pesos - this.form.value.amount
        : actualUser.accounts.pesos + this.form.value.amount;
    this.send
      ? (this.form.value.concept = `${this.form.value.concept} ,transferenrencia realizada a ${this.destinatary}`)
      : null;
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

    // add(n: number) {
    //   this.store.dispatch(add({ num: n }));
    // }
    // substract(n: number) {
    //   this.store.dispatch(substract({ num: n }));
    // }
  }
}

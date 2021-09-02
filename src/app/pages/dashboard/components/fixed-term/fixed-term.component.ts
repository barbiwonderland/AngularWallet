import { userService } from './../../../../services/user.service';
import { ActivityService } from './../../../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-fixed-term',
  templateUrl: './fixed-term.component.html',
  styleUrls: ['./fixed-term.component.css'],
})
export class FixedTermComponent implements OnInit {
  monto!: number;
  constructor(
    private ActivityService: ActivityService,
    private userService: userService
  ) {}

  ngOnInit(): void {}
  submit() {
    console.log(this.monto);
    let userPesos = this.userService.currentUser();
    let id = userPesos.id;
    userPesos = userPesos.accounts.pesos;
    userPesos = userPesos - this.monto;
    console.log(userPesos);
    this.ActivityService.updateBalance(userPesos);
    let activity={
      amount: this.monto,
      concept: '(-)',
      currency: 'peso',
      date: Date.now(),
      id: id,
    }
    this.ActivityService.saveActivity(activity);
  }
}

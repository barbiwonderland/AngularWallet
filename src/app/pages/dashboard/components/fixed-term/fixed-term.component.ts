import { userService } from './../../../../services/user.service';
import { ActivityService } from './../../../../services/activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixed-term',
  templateUrl: './fixed-term.component.html',
  styleUrls: ['./fixed-term.component.css'],
})
export class FixedTermComponent implements OnInit {
  monto!: number;
  _input: boolean = false;
  constructor(
    private ActivityService: ActivityService,
    private userService: userService
  ) {}

  ngOnInit(): void {
    let activities = this.ActivityService.getActivities();
    let activitiesCopy = activities.find(
      (x: any) => x.concept === 'PLAZO FIJO'
    );
    activitiesCopy ? (this._input = true) : null;
  }
  submit() {
    let currentUser = this.userService.currentUser();
    let id = currentUser!.id;
    console.log(currentUser);
    this.ActivityService.updateBalance(this.monto,"resta");
    let activity = {
      amount: this.monto,
      concept: 'PLAZO FIJO',
      currency: 'peso',
      date: new Date(),
      id: id,
      dolarValue:0,
    };
    this.ActivityService.saveActivity(activity);
  }
  unlock() {
    let user = this.userService.currentUser();
    console.log(user);
    const pesos = user!.accounts.pesos;
    let activities = this.ActivityService.getActivities();

    let activitiesCopy = activities.find(
      (x: any) => x.concept === 'PLAZO FIJO'
    )!;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(activitiesCopy.date);
    const secondDate = new Date();
    console.log(firstDate, secondDate);
    const diffDays = Math.round(
      Math.abs((Number(firstDate) - Number(secondDate)) / oneDay)
    );
    const newTotal = (activitiesCopy.amount + (diffDays * 1) / 100);
    console.log(newTotal);
    this.ActivityService.updateBalance(newTotal,"suma");
    let filtered = activities.filter((x: any) => {
      return x.concept !== 'PLAZO FIJO';
    });
    this.ActivityService.updateActivities(filtered);
  }
}

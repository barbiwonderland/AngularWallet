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
    let activity = {
      amount: this.monto,
      concept: 'PLAZO FIJO',
      currency: 'peso',
      date: new Date(),
      id: id,
    };
    this.ActivityService.saveActivity(activity);
  }
  unlock() {
    let user = this.userService.currentUser();
    console.log(user);
    user = user.accounts.pesos;
    let activities = this.ActivityService.getActivities();

    let activitiesCopy = activities.find(
      (x: any) => x.concept === 'PLAZO FIJO'
    );
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(activitiesCopy.date);
    const secondDate = new Date();
    console.log(firstDate, secondDate);
    const diffDays = Math.round(
      Math.abs((Number(firstDate) - Number(secondDate)) / oneDay)
    );
    let newTotal = user + (activitiesCopy.amount + ((diffDays * 1) / 100));
    console.log(newTotal);
    this.ActivityService.updateBalance(newTotal);
    let filtered = activities.filter((x: any) => {
      return x.concept !== 'PLAZO FIJO';
    });
    this.ActivityService.updateActivities(filtered);
  }
}

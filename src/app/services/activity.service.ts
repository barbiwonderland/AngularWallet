import { IUser } from './../models/user.model';
import { IActivity } from './../models/activity,model';
import { Router } from '@angular/router';
import { userService } from './user.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  activity!: IActivity[];
  users!:IUser[];

  constructor(
    private userService: userService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
  updateActivities(x:any){
    localStorage.setItem('activities', JSON.stringify(x));

  }

  saveActivity(formValue: IActivity) {
    // me traigo lo que hay en activity si no hay nada asigno []
    //**************** */ Type 'string' is not assignable to type 'IActivity'.
    const getActivity = localStorage.getItem('activities')!;
    this.activity =<IActivity[]>JSON.parse(getActivity)  || [];
    //GUARDO NUEVO MOVIVIMIENTO
    let newActivity = formValue;
    // console.log("mov guardado",newActivity)
    //****************** */ Property 'push' does not exist on type 'IActivity'
    this.activity.push(newActivity);
    // Actualizo nuevo arreglo en LS
    console.log(this.activity);
    localStorage.setItem('activities', JSON.stringify(this.activity));
  }
  getActivities() {
    // Type 'string' is not assignable to type 'IActivity'.ts(2322)
    const activities= localStorage.getItem('activities')!;
    this.activity = this.activity ? JSON.parse(activities) : [];
    console.log(this.activity)
    return this.activity;
  }

  updateBalance(pesos: number) {
    // Type 'string' is not assignable to type 'IUser | undefined'.
    this.users = this.userService.getusers()!;
    const currentUserId = this.userService.idUser();
    // Modifico el Array de todas las cuentas
    let updateArrayUsers = this.users.map((el: any) => {
      if (el.id === currentUserId) {
        el.accounts.pesos = pesos;
      }
      return el;
    });
    localStorage.setItem('user', JSON.stringify(updateArrayUsers));
    this._snackBar.open('Agregado con éxito', '', {
      duration: 1500,
    });
    setTimeout(() => {
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });
    }, 500);
  }
  sendMoney(id: number, pesos: number) {
    console.log(pesos);
    let send = this.users.map((x: any) => {
      if (x.id === id) {
        x.accounts.pesos = x.accounts.pesos + pesos;
      }
      return x;
    });
    console.log(send);
    localStorage.setItem('user', JSON.stringify(send));
  }

  updateDolarAccount(dolar: number) {
    this.users = this.userService.getusers();
    let currentUser = this.userService.idUser();
    // Modifico el Array de todas las cuentas
    let updateArrayUsers = this.users.map((el: any) => {
      if (el.id === currentUser) {
        el.accounts.dolar = el.accounts.dolar + dolar;
      }
      return el;
    });
    localStorage.setItem('user', JSON.stringify(updateArrayUsers));
    this._snackBar.open('Agregado con éxito', '', {
      duration: 1500,
    });
  }

  saleDollar(dolar: number) {
    this.users = this.userService.getusers();
    let currentUser = this.userService.idUser();
    // Modifico el Array de todas las cuentas
    let updateArrayUsers = this.users.map((el: any) => {
      if (el.id === currentUser) {
        el.accounts.dolar = el.accounts.dolar - dolar;
      }
      return el;
    });
    localStorage.setItem('user', JSON.stringify(updateArrayUsers));
    this._snackBar.open('Agregado con éxito', '', {
      duration: 1500,
    });
  }
}

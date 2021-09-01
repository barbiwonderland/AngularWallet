import { Router } from '@angular/router';
import { userService } from './user.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  activity?: any;
  users?: any;
  constructor(
    private userService: userService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  saveActivity(formValue: any) {
    // me traigo lo que hay en activity si no hay nada asigno []
    this.activity = localStorage.getItem('activities');
    this.activity = this.activity ? JSON.parse(this.activity) : [];
    //GUARDO NUEVO MOVIVIMIENTO
    let newActivity = formValue;
    // console.log("mov guardado",newActivity)
    this.activity.push(newActivity);
    // Actualizo nuevo arreglo en LS
    localStorage.setItem('activities', JSON.stringify(this.activity));
  }
  updateBalance(pesos: any) {
    this.users = this.userService.getusers();
    let currentUser = this.userService.idUser();
    // Modifico el Array de todas las cuentas
    let updateArrayUsers = this.users.map((el: any) => {
      if (el.id === currentUser) {
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
  sendMoney(id: number, pesos: any) {
    console.log(pesos)
    let send = this.users.map((x: any) => {
      if (x.id === id) {
        x.accounts.pesos = x.accounts.pesos + pesos;
      }
      return x;
    });
    console.log(send)
    localStorage.setItem('user', JSON.stringify(send));
  }
}

import { IUser, Accounts } from './../models/user.model';
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
  users!: IUser[];

  constructor(
    private userService: userService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  /**
   * Actualiza todo el listado de actividades existente por uno nuevo
   * @param x
   */
  updateActivities(x: any) {
    localStorage.setItem('activities', JSON.stringify(x));
  }
  /**
   * Guarda una nueva actividad
   * @param formValue
   */
  saveActivity(formValue: IActivity) {
    // me traigo lo que hay en activity si no hay nada asigno []
    //**************** */ Type 'string' is not assignable to type 'IActivity'.
    const getActivity = localStorage.getItem('activities')!;
    this.activity = <IActivity[]>JSON.parse(getActivity) || [];
    //GUARDO NUEVO MOVIVIMIENTO
    let newActivity = formValue;
    // console.log("mov guardado",newActivity)
    //****************** */ Property 'push' does not exist on type 'IActivity'
    this.activity.push(newActivity);
    // Actualizo nuevo arreglo en LS
    console.log(this.activity);
    localStorage.setItem('activities', JSON.stringify(this.activity));
  }
  /**
   * Muestra todo el listado de movimientos
   * @returns
   */
  getActivities() {
    // Type 'string' is not assignable to type 'IActivity'.ts(2322)
    const activities = localStorage.getItem('activities')!;
    this.activity = JSON.parse(activities) || [];
    console.log(this.activity);
    return this.activity;
  }
  /**
   * Modificar el balance , se debe indicar monto y tipo de operación (suma o resta == string)
   * @param pesos
   * @param operation
   */

  updateBalance(pesos: number, operation: string) {
    // Type 'string' is not assignable to type 'IUser | undefined'.
    this.users = this.userService.getusers()!;
    const currentUserId = this.userService.idUser();
    // Modifico el Array de todas las cuentas
    let updateArrayUsers = this.users.map((el: any) => {
      if (el.id === currentUserId) {
        if (operation === 'suma') {
          el.accounts.pesos = pesos + el.accounts.pesos;
        } else {
          el.accounts.pesos > 0 && el.accounts.pesos - pesos >= 0
            ? (el.accounts.pesos = el.accounts.pesos - pesos)
            : alert('no posee saldo');
        }
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
  /**
   * Transferencia a otro usuario
   * @param id
   * @param pesos
   */
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
  /**
   * Operación cuando se compran dolares
   * @param dolar
   */
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
  /**
   * Guarda el balance cuando vendes dolares
   * @param dolar
   */
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

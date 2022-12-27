import { IUser } from './../models/user.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { userService } from './user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users!: IUser[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private userService: userService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  /**
   * Comprueba si los campos ingresados existen en los usuarios
   * @param user
   * @param password
   * @returns
   */
  // cambiar variables a nombres mas especificos
  userExists(user: string, password: any) {
    console.log("usuario y clave", user, password);
    this.users = this.userService.getusers();
    let result = this.users.filter((x: any) => x.info.email == user && (x.info.password).toString() == password.toString());
  

    if (result.length) {
      console.log(result);
      localStorage.setItem('id', JSON.stringify(result[0].id));
      // this.reduxService.update(result);
      console.log("existia")
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });
      return result;
    } else if (user == "admin@test.com" && password == "123") {
      let userForm: any = {
        id: Date.now(),
        info: {
          password: 123,
          user: "administrador",
          email: "admin@test.com",
          name: "Admin",
          surname:"Test"
        },
        accounts: {
          pesos: 0,
          dolar: 0,
        },
      };
      console.log("se crea")
      let newArray = [...this.users, userForm];
      console.log(newArray)
      localStorage.setItem('id',userForm.id)
      localStorage.setItem('user', JSON.stringify(newArray));
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
        
      });
      return userForm
    }else {
      console.log('verifique datos');
      this._snackBar.open('Verifique los datos ingresados', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return null;
    }
  }
}

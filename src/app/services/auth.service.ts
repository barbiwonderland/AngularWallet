import { IUser } from './../models/user.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { userService } from './user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReduxService } from './redux.service';

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
    private _snackBar: MatSnackBar,
    private reduxService: ReduxService
  ) {}

  userExists(user: string, password: any) {
    // Type 'string' is not assignable to type 'IUser'.ts(2322)
    this.users = this.userService.getusers();
    // Property 'filter' does not exist on type 'IUser'.
    let result = this.users.filter(
      (x: any) => x.info.user === user && x.info.password === password
    );
    console.log(result, 'resultado preF');

    if (result.length) {
      console.log(result);
      localStorage.setItem('id', JSON.stringify(result[0].id));
      // this.reduxService.update(result);
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });
      return result;
    } else {
      console.log('verifique datos');
      this._snackBar.open('Verifique los datos ingresados', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return null;
    }
  }
}

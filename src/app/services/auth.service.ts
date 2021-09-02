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
  id!: any;
  users?: any = this.userService.getusers();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private userService: userService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private reduxService: ReduxService
  ) {}

  userExists(user: string, password: string) {
    let result = this.users.filter(
      (x: any) => x.info.user === user && x.info.password === password
    );
    if (result.length) {
      console.log(result)
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
    }
  }

}

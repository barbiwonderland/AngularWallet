import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ReduxService } from 'src/app/services/redux.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  arrayUsers: any;
  localUser: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  actualAccount!: any;
  account!: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private reduxService: ReduxService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.arrayUsers = localStorage.getItem('user');
    this.arrayUsers = this.arrayUsers ? JSON.parse(this.arrayUsers) : [];
    this.localUser = localStorage.getItem('user');
    this.localUser = JSON.parse(this.localUser);
    console.log(this.localUser);
    this.account = localStorage.getItem('accounts');
    this.account = JSON.parse(this.account);
    console.log(this.account);
  }

  ingresar() {
    let result = this.localUser.filter(
      (x: any) =>
       x.user === this.form.value.usuario &&
        x.password === this.form.value.password
    );
    if (result.length) {
      console.log(result[0].user);
      localStorage.setItem('id', JSON.stringify(result[0].id));

      this.actualAccount = this.account.filter(
        (x: any) => x.user == result[0].user
      );

      console.log(this.actualAccount, 'cuenta actual');
      localStorage.setItem('account', JSON.stringify(this.actualAccount));

      this.reduxService.update(result);
      this.router.navigate(['/dashboard']);
    } else {
      console.log('verifique datos');
      this._snackBar.open('Verifique los datos ingresados', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}

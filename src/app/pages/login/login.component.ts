import { AuthService } from './../../services/auth.service';
import { userService } from './../../services/user.service';
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

  constructor(private fb: FormBuilder, private AuthService: AuthService) {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  ingresar() {
    console.log(
      this.AuthService.userExists(
        this.form.value.usuario,
        this.form.value.password
      )
    );
    this.AuthService.userExists(
      this.form.value.usuario,
      this.form.value.password
    );
  }
}

import { ReduxService } from './../../services/redux.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private ReduxService: ReduxService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ReduxService.current();
  }
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

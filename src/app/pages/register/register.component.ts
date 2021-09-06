import { userService } from './../../services/user.service';
import { ParseSourceSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  listUsers?: IUser[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: userService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      user: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.listUsers = this.userService.getusers();
  }
  getUser() {
    console.log(this.form.value);
    // Agrego datos de usuario que se registra
    let userForm: any = {
      id: Date.now(),
      info: {
        password: this.form.value.password,
        user: this.form.value.user,
        email: this.form.value.email,
        name: this.form.value.name,
        surname: this.form.value.surname,
      },
      accounts: {
        pesos: 0,
        dolar: 0,
      },
    };
    let newArray = this.listUsers?.push(userForm);
    localStorage.setItem('user', JSON.stringify(newArray));
    this.router.navigate(['/login']);
  }
}

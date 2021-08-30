import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  arrayUsers?: any;
  localAcounts!: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      user: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Llamo al Ls, si hay algo, lo guardo en arrayUsers, si no, le asigno []
    let localUser = localStorage.getItem('user');
    this.arrayUsers = localUser ? JSON.parse(localUser) : [];
    console.log(this.arrayUsers);
    // Traigo todas las cuentas del local si no []
    this.localAcounts = localStorage.getItem('accounts');
    this.localAcounts = this.localAcounts ? JSON.parse(this.localAcounts) : [];
    console.log(this.localAcounts);
  }
  getUser() {
    console.log(this.form.value);
    let userForm: any = {
      password: this.form.value.password,
      user: this.form.value.user,
      email: this.form.value.email,
      name: this.form.value.name,
      surname: this.form.value.surname,
      id: Date.now(),
    };
    let account: any = {
      id: userForm.id,
      balance: 0,
      user: this.form.value.user,
      name: this.form.value.name,
    };
    console.log(account);
    let newArray = [...this.arrayUsers, userForm];
    this.arrayUsers = newArray;
    localStorage.setItem('user', JSON.stringify(newArray));
    //Nuevos datos de cuenta
    let newAccount = [...this.localAcounts, account];
    // Guardo el nuevo arreglo en localstorage
    localStorage.setItem('accounts', JSON.stringify(newAccount));
    this.router.navigate(['/login']);
  }
}

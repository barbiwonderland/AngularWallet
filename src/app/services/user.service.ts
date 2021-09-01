import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class userService {
  users?: any = this.getusers();
  id!: number;

  constructor() {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }
  getusers() {
    let data = localStorage.getItem('user');
    data = data ? JSON.parse(data) : [];
    return data;
  }
  currentUser() {
    let currentUser = this.users.find((user: any) => user.id === this.id);
    console.log(currentUser);
    return currentUser;
  }
  idUser() {
    return this.id;
  }
}

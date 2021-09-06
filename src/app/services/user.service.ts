import { IUser } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class userService {
  users?: IUser[];
  id!: number;

  constructor() {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }
  //jdoc
  /**
   * recupera los usuarios en el local storage
   * @returns IUser[]
   */
  getusers(): IUser[] {
    let getData: string = localStorage.getItem('user')!;
    let data: IUser[] = JSON.parse(getData) || [];
    console.log(data);
    return data;
  }
  /**
   * Devuelve los datos del usuario loggeado
   * @returns
   */
  currentUser() {
    // find doesnt exist on property Iuser en find
    this.users = this.getusers();
    let currentUser = this.users.find((user: any) => user.id === this.id);
    console.log(currentUser);
    return currentUser;
  }
  /**
   * Devueleve el id del usuario logeado
   * @returns number
   */
  idUser() {
    return this.id;
  }
}

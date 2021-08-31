import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  argAccount?: any;
  actualUser: any;
  userId: any;
  constructor() {}

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    this.userId = id ? JSON.parse(id) : {};
    this.argAccount = (localStorage.getItem('account') );
    this.argAccount = JSON.parse(this.argAccount);
    //DATOS DEL USUARIO ACTUAL DESDE LS
    this.actualUser = localStorage.getItem('user');
    this.actualUser = this.actualUser ? JSON.parse(this.actualUser) : '';
    this.actualUser = this.actualUser.find((x: any) => x.id === this.userId);
  }
}

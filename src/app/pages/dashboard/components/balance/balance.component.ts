import { userService } from './../../../../services/user.service';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  actualUser: any;
  dolarAccount: boolean = false;
  constructor(private userService: userService) {}

  ngOnInit(): void {
    this.actualUser = this.userService.currentUser();
  }
  toggleAccount() {
    this.dolarAccount = !this.dolarAccount;
  }
}
//9767|JdDwDnb5EZj^Cw*0kGT9QC74VUGJc4iJ
//53b64264a2b610e0589f
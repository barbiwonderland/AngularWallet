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
  constructor(private userService: userService) {}

  ngOnInit(): void {
    this.actualUser =this.userService.currentUser();

  }
}

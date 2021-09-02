import { ConversionService } from './../../../../services/conversion.service';
import { ActivityService } from './../../../../services/activity.service';
import { userService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CompilerFacadeImpl } from '@angular/compiler/src/jit_compiler_facade';
import { compileDeclareClassMetadata } from '@angular/compiler';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  actualUser: any;
  dolarAccount: boolean = false;
  compra?:number;
  venta?:number;
  constructor(
    private userService: userService,
    private ActivityService: ActivityService,
    private conver: ConversionService
  ) {}

  ngOnInit(): void {
    this.actualUser = this.userService.currentUser();
    this.conver.getChange().subscribe((data) => {
      let result = data[0].casa;
      const { compra, venta } = result;
      this.compra=compra;
      this.venta=venta;
    });
  }
  toggleAccount() {
    this.dolarAccount = !this.dolarAccount;
  }
}
//9767|JdDwDnb5EZj^Cw*0kGT9QC74VUGJc4iJ
//53b64264a2b610e0589f

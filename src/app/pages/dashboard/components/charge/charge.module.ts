import { Router, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeComponent } from './charge.component';



@NgModule({
  declarations: [
    ChargeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],

})
export class ChargeModule { }

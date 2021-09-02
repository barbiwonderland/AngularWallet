import { FixedTermComponent } from './components/fixed-term/fixed-term.component';
import { ActivityComponent } from './components/activity/activity.component';
import { AngularMaterialModule } from './../../vendor/angular-material/angular-material.module';
import { AppRoutingModule } from './../../app-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChargeComponent } from "../dashboard/components/charge/charge.component"
import { BalanceComponent } from './components/balance/balance.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { TransferComponent } from './components/transfer/transfer.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BalanceComponent,
    ActivityComponent,
    TransferComponent,
    FixedTermComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    FormsModule
    
  
  
   
  ],

})
export class DashboardModule { }

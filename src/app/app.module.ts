import { FixedTermComponent } from './pages/dashboard/components/fixed-term/fixed-term.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './pages/dashboard/dashboard-routing.module';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from './vendor/angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChargeComponent } from './pages/dashboard/components/charge/charge.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ComeBackButtonComponent } from './components/come-back-button/come-back-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    ChargeComponent,
    NotFoundComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    DashboardModule,
    RouterModule,
    DashboardRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

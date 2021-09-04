import { FixedTermComponent } from './pages/dashboard/components/fixed-term/fixed-term.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './pages/dashboard/dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { reducerGroup } from './redux/reducers/reducersGroup';
import { AngularMaterialModule } from './vendor/angular-material/angular-material.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
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
    StoreModule.forRoot({ reducerGroup }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
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

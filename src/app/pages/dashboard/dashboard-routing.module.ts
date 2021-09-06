import { BalanceComponent } from '../dashboard/components/balance/balance.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargeComponent } from './components/charge/charge.component';
import { ActivityComponent } from './components/activity/activity.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { FixedTermComponent } from './components/fixed-term/fixed-term.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: BalanceComponent, pathMatch: 'full' },
      { path: 'payment/exchangeBuy', component: ChargeComponent },
      { path: 'payment/exchangeSend', component: ChargeComponent },
      { path: 'charge/payment', component: ChargeComponent },
      { path: 'send/:user', component: ChargeComponent },
      { path: 'charge/add', component: ChargeComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'fixed-term', component: FixedTermComponent },
      { path: 'transfer', component: TransferComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

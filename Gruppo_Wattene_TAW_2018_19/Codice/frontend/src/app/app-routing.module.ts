import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginComponent,
  DashboardComponent,
  BackofficeComponent,
  OrderComponent,
  StatsComponent
} from './Components';
import { Role } from './Models';
import {
  AuthGuardService as AuthGuard,
  RoleGuardService as RoleGuard,
  NoAuthGuardService as NoAuth
} from './Services';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuth]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'backoffice',
    component: BackofficeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: Role.cassa
    }
  },
  {
    path: 'backoffice/stats',
    component: StatsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: Role.cassa
    }
  },
  {
    path: 'orders/:id',
    component: OrderComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: Role.cameriere
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BackofficeComponent,
  DashboardComponent,
  LoginComponent,
  RegisterComponent,
  NavbarComponent,
  DialogTableComponent,
  PreparationQueueComponent,
  StatsComponent,
  WaiterStatsComponent,
  CookStatsComponent
  } from './Components';
import { ReqInterceptorService, SocketIOService } from './Services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatTableModule,
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatIconModule,
  MatBadgeModule,
  MatSelectModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule,
  MatDividerModule,
  MatListModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatChipsModule
} from '@angular/material';
import { UsersComponent } from './Components/users/users.component';
import { OrderComponent } from './Components/order/order.component';
import { FoodComponent } from './Components/food/food.component';
import { DrinkComponent } from './Components/drink/drink.component';
import { BarmanStatsComponent } from './Components/stats/barman-stats/barman-stats.component';
import { FoodStatsComponent } from './Components/stats/food-stats/food-stats.component';
import { DrinkStatsComponent } from './Components/stats/drink-stats/drink-stats.component';
import { MoneyStatsComponent } from './Components/stats/money-stats/money-stats.component';
import { DialogPaymentComponent } from './Components/dialog-payment/dialog-payment.component';
import { ServeQueueComponent } from './Components/serve-queue/serve-queue.component';


@NgModule({
  declarations: [
    AppComponent,
    BackofficeComponent,
    StatsComponent,
    WaiterStatsComponent,
    CookStatsComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DialogTableComponent,
    PreparationQueueComponent,
    OrderComponent,
    UsersComponent,
    FoodComponent,
    DrinkComponent,
    BarmanStatsComponent,
    FoodStatsComponent,
    DrinkStatsComponent,
    MoneyStatsComponent,
    DialogPaymentComponent,
    ServeQueueComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatBadgeModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['http://localhost:4000'],
        blacklistedRoutes: []
      }
    })
  ],
  entryComponents: [DialogTableComponent, DialogPaymentComponent],
  providers: [
    SocketIOService,
    {provide: HTTP_INTERCEPTORS, useClass: ReqInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

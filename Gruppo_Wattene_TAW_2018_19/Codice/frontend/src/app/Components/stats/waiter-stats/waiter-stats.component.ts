import { Component, OnInit } from '@angular/core';
import { FoodService, DrinkService, OrderService, SocketIOService, UserService } from 'src/app/Services';
import { Router } from '@angular/router';
import { UserModel, Role, DrinkModel, OrderModel, SuborderModel, SuborderState } from "src/app/Models";
import { MatSnackBar, MatTableDataSource } from '@angular/material';
export interface IWaiterStats {
  waiter_id: string;
  nrOrdini: number;
  waiter_name: string;
  waiter_surname: string;
}
@Component({
  selector: 'app-waiter-stats',
  templateUrl: './waiter-stats.component.html',
  styleUrls: ['./waiter-stats.component.css']
})
export class WaiterStatsComponent implements OnInit {
  waiters: UserModel[] = [];
  waiterStats: IWaiterStats[] = [];
  dataSource: MatTableDataSource<IWaiterStats>;

  constructor(
    private userHttp: UserService,
    private orderHttp: OrderService
  ) { }

  ngOnInit() {
    this.userHttp.getUsers().subscribe(
      users => {
        this.waiters = users.filter(x => x.role === Role.cameriere);

        this.orderHttp.getOrders().subscribe(
          orders => {
            for (const waiter of this.waiters) {

              var numeroOrdini = 0;
              for (const order of orders) {
                if (order.waiter_id === waiter._id) {
                  numeroOrdini++;
                }
              }
              this.waiterStats.push({ nrOrdini: numeroOrdini, waiter_id: waiter._id, waiter_name: waiter.firstname, waiter_surname: waiter.lastname });
            }
            this.dataSource = new MatTableDataSource<IWaiterStats>(this.waiterStats);
          }
        )
      }
    );
  }

}

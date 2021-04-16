import { Component, OnInit } from '@angular/core';
import { Role, SuborderModel, TableModel, OrderModel } from 'src/app/Models';
import { OrderService, UserService, SocketIOService, TableService } from 'src/app/Services';

@Component({
  selector: 'app-serve-queue',
  templateUrl: './serve-queue.component.html',
  styleUrls: ['./serve-queue.component.css']
})
export class ServeQueueComponent implements OnInit {

  suborders: SuborderModel[] = [];
  subordersDrinks: SuborderModel[] = [];

  tables: TableModel[] = [];

  orders: OrderModel[] = [];


  constructor(
    private orderHttp: OrderService,
    private tableHttp: TableService,
    private userHttp: UserService,
    private sio: SocketIOService
  ) { }

  ngOnInit() {

    this.getReadySuborderFoods();
    this.getReadySuborderDrinks();
    this.sio.modified_suborder().subscribe(suborder => {
      this.getReadySuborderFoods();
      this.getReadySuborderDrinks();
    });

    this.orderHttp.getOrders().subscribe(
      ordini => this.orders = ordini
    );

  }

  getReadySuborderFoods() {
    this.suborders = [];
    this.orderHttp.getReadySuborderFoods().subscribe(
      sottoordini => {
        this.userHttp.getCurrentUser().subscribe(
          utente_attuale => {
            for (const subordine of sottoordini) {
              this.orderHttp.getOrder(subordine.order_id).subscribe(
                ordine_attuale => {
                  if (subordine.state_foods === 'Pronto' && utente_attuale._id === ordine_attuale.waiter_id) {
                    this.suborders.push(subordine);
                    this.tableHttp.getTable(ordine_attuale.table_id).subscribe(
                      tavolo => this.tables.push(tavolo)
                    );
                  }
                }
              );
            }
          }
        );
      }
    );
  }

  getReadySuborderDrinks() {
    this.subordersDrinks = [];
    this.orderHttp.getReadySuborderDrinks().subscribe(
      sottoordini => {
        this.userHttp.getCurrentUser().subscribe(
          utente_attuale => {
            for (const subordine of sottoordini) {
              this.orderHttp.getOrder(subordine.order_id).subscribe(
                ordine_attuale => {
                  if (subordine.state_drinks === 'Pronto' && utente_attuale._id === ordine_attuale.waiter_id) {
                    this.subordersDrinks.push(subordine);
                    this.tableHttp.getTable(ordine_attuale.table_id).subscribe(
                      tavolo => this.tables.push(tavolo)
                    );
                  }
                }
              );
            }
          }
        );
      }
    );
  }

  setSuborderDelivered(order_id: string, suborder_id: string) {
    this.orderHttp.setFoodSuborderDelivered(order_id, suborder_id).subscribe(
      data => {
      }
    );
  }

  setDrinkSuborderDelivered(order_id: string, suborder_id: string) {
    this.orderHttp.setDrinkSuborderDelivered(order_id, suborder_id).subscribe(
      data => {
      }
    );
  }



  getTavoloDelSuborder(order_id) {
    return this.tables.find(tavolo => tavolo.order_id === order_id);
  }
}


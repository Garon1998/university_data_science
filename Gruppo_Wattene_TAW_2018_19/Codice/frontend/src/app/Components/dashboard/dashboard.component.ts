import { Component, OnInit } from '@angular/core';
import { TableModel, UserModel, Role, OrderModel, SuborderModel, SuborderState } from '../../Models';
import {
  TableService,
  FoodService,
  DrinkService,
  UserService,
  OrderService,
  SocketIOService
} from '../../Services';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogTableComponent } from '../dialog-table/dialog-table.component';
import { DialogPaymentComponent } from '../dialog-payment/dialog-payment.component';

export interface FoodAndDrinkState {
  table_id: string;
  foods_state: string;
  drinks_state: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nuoviOrdini: boolean;
  role: string;
  user_id: string;
  tables: TableModel[] = [];
  foodAndDrinkState: FoodAndDrinkState[] = [];
  user: UserModel;
  users: UserModel[] = [];
  breakpoint: number;
  orders: OrderModel[] = [];
  suborders: SuborderModel[] = [];
  readonly COL_SMALL = 3;
  readonly COL_MEDIUM = 5;
  readonly COL_LARGE = 7;
  readonly COL_XSMALL = 2;
  readonly Roles = null;

  constructor(
    private tableHttp: TableService,
    private foodHttp: FoodService,
    private drinkHttp: DrinkService,
    private userHttp: UserService,
    private orderHttp: OrderService,
    private router: Router,
    private tableDialog: MatDialog,
    private snackBar: MatSnackBar,
    private sio: SocketIOService
  ) {
    this.role = this.userHttp.getRole();
    this.user_id = this.userHttp.getUser_id();
    this.Roles = Role;
  }

  getCol(windowSize: number) {
    if (windowSize <= 420) {
      return this.COL_XSMALL;
    } else if (windowSize <= 768) {
      return this.COL_SMALL;
    } else if (windowSize <= 992) {
      return this.COL_MEDIUM;
    } else {
      return this.COL_LARGE;
    }
  }

  filtraTavoli() {
    this.tables = this.tables.sort((x, y) => x.table_number - y.table_number);
    if (this.role === this.Roles.cameriere) {
      // un cameriere vede solo i tavoli liberi e quelli da lui gestiti
      this.tables = this.tables.filter(x => x.available || x.waiter_id === this.user_id);
    }
  }
  getTables() {
    this.tableHttp.getTables().subscribe(
      data => {
        this.tables = data;
        this.tables.forEach(t => {
          this.foodAndDrinkState.push({ table_id: t._id, drinks_state: '', foods_state: '' });
        });
        this.filtraTavoli();
      }
    );
  }
  getOrders() {
    this.orderHttp.getOrders().subscribe(
      data => {
        this.orders = data;
        this.suborders = [];
        for (const order of data) {
          this.orderHttp.getSubOrders(order._id).subscribe(
            suborders => {
              for (const suborder of suborders) {
                this.suborders.push(suborder);
              }
            }
          );
        }
      }
    );
  }

  ngOnInit() {
    this.nuoviOrdini = false;
    this.breakpoint = this.getCol(window.innerWidth);
    this.getOrders();
    if (this.role === this.Roles.cassa) {
      this.userHttp.getUsers().subscribe(
        users => {
          this.users = users;
        });
    }
    if (this.role === this.Roles.cameriere || this.role === this.Roles.cassa) {
      this.userHttp.getCurrentUser().subscribe(
        user => {
          this.user = user;
        });
      this.getTables();
      this.sio.modified_table().subscribe(table => {
        if (table) {
          const index = this.tables.findIndex(x => x._id === table._id);
          if (index === -1) {
            this.tables.push(table);
          } else {
            this.tables[index] = table;
          }
          this.filtraTavoli();
        } else {
          this.getTables();
        }
      });
      this.sio.order_deleted().subscribe(orderId => {
        const index = this.tables.findIndex(x => x.order_id === orderId);
        this.tables[index].order_id = null;
        this.tables[index].waiter_id = null;
        this.tables[index].available = true;
        this.tables[index].clients = 0;
      });

      this.sio.modified_suborder().subscribe(
        suborders => {
          for (const suborder of suborders) {
            const index = this.suborders.findIndex(x => x._id === suborder._id);
            if (index !== -1) {
              this.suborders[index] = suborder;
            } else {
              this.suborders.push(suborder);
            }
            this.orderHttp.getOrder(suborder.order_id).subscribe(
              order => {
                const tIndex = this.tables.findIndex(x => x._id === order.table_id);
                this.tables[tIndex].order_id = suborder.order_id;
                this.getSuborderStateFoods(suborder.order_id, order.table_id);
                this.getSuborderStateDrinks(suborder.order_id, order.table_id);
              }
            );
          }
        });
      this.sio.modified_suborder_food().subscribe(
        data => {
          const index = this.suborders.findIndex(x => x._id === data._id);
          if (index !== -1) {
            this.suborders[index] = data;
          } else {
            this.suborders.push(data);
          }
          this.getSuborderStateFoods(data.order_id, this.getTableIdOrdine(data.order_id));
        }
      );
      this.sio.modified_suborder_drink().subscribe(
        data => {
          const index = this.suborders.findIndex(x => x._id === data._id);
          if (index !== -1) {
            this.suborders[index] = data;
          } else {
            this.suborders.push(data);
          }
          this.getSuborderStateDrinks(data.order_id, this.getTableIdOrdine(data.order_id));
        }
      );
    }
  }
  getTableIdOrdine(order_id) {
    return this.tables.find(x => x.order_id === order_id)._id;
  }
  getCameriereDelTavolo(waiter_id: string) {
    const waiter = this.users.find(user => user._id === waiter_id);
    if (waiter) {
      return waiter.firstname + ' ' + waiter.lastname;
    } else {
      return '';
    }
  }
  getSuborderStateFoods(order_id: string, table_id: string) {
    let subs = this.suborders.filter(x => x.ordered_foods.length > 0 && x.order_id === order_id && x.state_foods);
    subs = subs.sort((x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime());
    let table = this.foodAndDrinkState.find(x => x.table_id === table_id);
    if (subs && subs.length > 0) {
      if (subs[0].state_foods === SuborderState.pronto) {
        console.log("ciaooo");
        this.nuoviOrdini = true;
      }
      table.foods_state = 'Cibo ' + subs[0].state_foods;
      console.log(table.foods_state)
    }
    return table.foods_state;
  }

  getSuborderStateDrinks(order_id: string, table_id: string) {
    let subs = this.suborders.filter(x => x.ordered_drinks.length > 0 && x.order_id === order_id);
    subs = subs.sort((x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime());
    let table = this.foodAndDrinkState.find(x => x.table_id === table_id);
    if (subs && subs.length > 0) {
      if (subs[0].state_drinks === SuborderState.pronto) {
        this.nuoviOrdini = true;
      }
      table.drinks_state = 'Bibite ' + subs[0].state_drinks;
    }
    return table.drinks_state;
  }
  onResize(event) {
    this.breakpoint = this.getCol(event.target.innerWidth);
  }


  openTableDialog(id: string, maxseats: number, table: TableModel) {
    const dialogRef = this.tableDialog.open(DialogTableComponent, {
      data: {
        numeroClienti: 0,
        idCameriere: '',
        table_id: id,
        maxSeats: maxseats,
        minSeats: 0,
        addTable: false
      }
    });
  }

  freeTable(tableId: string, table: TableModel) {
    this.tableHttp.freeTable(tableId).subscribe(
      res => {

        table = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  deleteOrder(orderId: string) {
    this.orderHttp.deleteOrder(orderId).subscribe(
      data => {
        this.openSnackBar('Ordine eliminato', 200);
      });
  }

  addTable() {
    const dialogRef = this.tableDialog.open(DialogTableComponent, {
      data: {
        addTable: true
      }
    });
  }

  deleteTable(tableId: string) {
    this.tableHttp.deleteTable(tableId).subscribe();
  }

  goToOrders(tableId: string) {
    this.router.navigate(['orders/' + tableId]);
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'chiudi', {
      duration: time,
    });
  }

  payment(tableId: string, orderId: string, liberaTavolo: boolean) {
    this.tableDialog.open(DialogPaymentComponent, {
      data: {
        idTable: tableId,
        idOrder: orderId
      }
    }).afterClosed().subscribe(
      res => {
        // this.openSnackBar('Ordine pagato sul tavolo n. ' + res.table_number, 2000);
        if (liberaTavolo) {
          this.freeTable(res._id, res);
        }
      }, err => {
        this.openSnackBar('Errore pagamento', 2000);
      }
    );
  }
}

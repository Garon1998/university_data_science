import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TableModel, UserModel, OrderModel, SuborderModel, Role } from '../../Models';
import {
  TableService,
  FoodService,
  DrinkService,
  UserService,
  OrderService,
  SocketIOService
} from '../../Services';

@Component({
  selector: 'app-preparation-queue',
  templateUrl: './preparation-queue.component.html',
  styleUrls: ['./preparation-queue.component.css']
})
export class PreparationQueueComponent implements OnInit {
  role: Role;
  Roles = Role;
  suborders: SuborderModel[] = [];
  allReady: boolean[] = [];
  checkBoxSingleOrder: boolean[] = [];
  checkBoxSingleFood: boolean[][] = null;
  constructor(
    private orderHttp: OrderService,
    private userHttp: UserService,
    private snackBar: MatSnackBar,
    private sio: SocketIOService) {
    this.role = userHttp.getRole();
  }

  ngOnInit() {
    if (this.role === Role.cuoco) {
      this.getSuborderFoods();
      this.sio.modified_suborder_food().subscribe(
        suborder => {
          if (suborder.ordered_foods.length > 0) {
            const indexSub = this.suborders.findIndex(x => x._id === suborder._id);
            const indexFood = this.suborders[indexSub].ordered_foods.findIndex(x => x.food_id === suborder.ordered_foods[0].food_id);
            this.suborders[indexSub].ordered_foods = suborder.ordered_foods;
          }
        });
    } else if (this.role === Role.barista) {
      this.getSuborderDrinks();
      this.sio.modified_suborder_drink().subscribe(
        suborder => {
          if (suborder.ordered_drinks.length > 0) {
            const indexSub = this.suborders.findIndex(x => x._id === suborder._id);
            const indexDrink = this.suborders[indexSub].ordered_drinks.findIndex(x => x.drink_id === suborder.ordered_drinks[0].drink_id);
            this.suborders[indexSub].ordered_drinks = suborder.ordered_drinks;
          }
        });
    }
    this.sio.modified_suborder().subscribe(suborder => {
      if (suborder) {
        for (let s of suborder) {
          if (this.role === Role.cuoco && s.ordered_foods.length === 0) {
            s = null;
          }
          if (this.role === Role.barista && s.ordered_drinks.length === 0) {
            s = null;
          }
          if (s) {
            const index = this.suborders.findIndex(x => x._id === s._id);
            if (index === -1) {
              this.suborders.push(s);
            } else {
              this.suborders[index] = s;
            }
          }
        }
      } else {
        if (this.role === Role.cuoco) {
          this.getSuborderFoods();
        } else if (this.role === Role.barista) {
          this.getSuborderDrinks();
        }
      }
    });
  }
  getSuborderFoods() {
    this.orderHttp.getSuborderFoods().subscribe(
      data => {
        this.suborders = data.filter(x => x.ordered_foods.length > 0);
        console.log(this.suborders);
      }
    );
  }
  getSuborderDrinks() {
    this.orderHttp.getSuborderDrinks().subscribe(
      data => {
        this.suborders = data.filter(x => x.ordered_drinks.length > 0);
      }
    );
  }
  setFoodReady(order_id: string, suborder_id: string, food_id: string, ready: boolean) {
    this.orderHttp.setFoodReady(food_id, order_id, suborder_id, ready).subscribe(
      data => {
      }
    );
  }
  setDrinkReady(order_id: string, suborder_id: string, drink_id: string, ready: boolean) {
    this.orderHttp.setDrinkReady(drink_id, order_id, suborder_id, ready).subscribe(
      data => {
      }
    );
  }
  setAllFoodsReady(order_id: string, suborder_id: string, food_id: string, ready: boolean) {
    this.orderHttp.setAllFoodsReady(order_id, suborder_id).subscribe(
      data => {
        let index = this.suborders.findIndex(x => x._id === suborder_id);
        if (index > -1) {
          this.suborders.splice(index, 1);
        }
      }
    );
  }
  setAllDrinksReady(order_id: string, suborder_id: string, drink_id: string, ready: boolean) {
    this.orderHttp.setAllDrinksReady(order_id, suborder_id).subscribe(
      data => {
        let index = this.suborders.findIndex(x => x._id === suborder_id);
        if (index > -1) {
          this.suborders.splice(index, 1);
        }
      }
    );
  }
  isAllSetToReadyFood(suborder: SuborderModel) {
    return suborder.ordered_foods.findIndex(x => x.prepared_by === null) === -1;
  }
  isAllSetToReadyDrink(suborder: SuborderModel) {
    return suborder.ordered_drinks.findIndex(x => x.prepared_by === null) === -1;
  }
  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'chiudi', {
      duration: time,
    });
  }
}

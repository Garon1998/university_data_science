import { Component, OnInit } from '@angular/core';
import { TableService, FoodService, DrinkService, OrderService, SocketIOService } from 'src/app/Services';
import { Router } from '@angular/router';
import { TableModel, FoodModel, DrinkModel, OrderModel, SuborderModel, SuborderState } from "src/app/Models";
import { MatSnackBar } from '@angular/material';

export interface Carrello {
  _id: string;
  name: string;
  categoria: string;
  price: number;
  quantita: number;
}

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  tableId: string;
  table: TableModel;
  suborders: SuborderModel[] = [];
  categorieCibi: string[] = [];
  categoriaCibo = '';
  categorieBibite: string[] = [];
  categoriaBibite = '';
  orders: OrderModel[] = [];
  foods: Carrello[] = [];
  cibi: Carrello[] = []; // cibi contiene il valore di foods, ma foods viene mofifata quando si applicano i filtri
  bevande: Carrello[] = [];
  drinks: Carrello[] = [];
  constructor(
    private tableHttp: TableService,
    private orderHttp: OrderService,
    private foodHttp: FoodService,
    private drinkHttp: DrinkService,
    private router: Router,
    private snackBar: MatSnackBar,
    private sio: SocketIOService
  ) {
    this.tableId = this.router.url.split('/')[2];
  }
  initFoods(foods: FoodModel[]) {
    this.foods = [];
    for (const food of foods) {
      this.foods.push({
        _id: food._id,
        name: food.name,
        quantita: null,
        price: food.price,
        categoria: food.category
      });
    }
  }
  initDrinks(drinks: DrinkModel[]) {
    this.drinks = [];
    for (const drink of drinks) {
      this.drinks.push({
        _id: drink._id,
        name: drink.name,
        quantita: null,
        price: drink.price,
        categoria: drink.category
      });
    }
  }
  getFoodsAndDrinks() {
    this.foodHttp.getFoods().subscribe(data2 => {
      data2 = data2.filter(x => x.available);
      this.initFoods(data2);
      this.cibi = this.foods;
    });
    this.drinkHttp.getDrinks().subscribe(data3 => {
      data3 = data3.filter(x => x.available);
      this.initDrinks(data3);
      this.bevande = this.drinks;
    });
  }

  getSuborders() {
    this.orderHttp.getSubOrders(this.table.order_id).subscribe(data => {
      this.suborders = data;
      this.foodHttp.getFoods().subscribe(data2 => {
        data2 = data2.filter(x => x.available);
        this.initFoods(data2);
        this.cibi = this.foods;
        let prevFoods = null;
        let index = -1;
        if (this.suborders.length > 0) {
          index = this.suborders.findIndex(x => x.state_foods === SuborderState.incoda);
          if (index > -1) {
            prevFoods = this.suborders[index].ordered_foods;
            for (const p of prevFoods) {
              index = this.cibi.findIndex(x => x._id === p.food_id);
              this.cibi[index].quantita = p.quantity;
            }
          }
        }
      });
      this.drinkHttp.getDrinks().subscribe(data3 => {
        data3 = data3.filter(x => x.available);
        this.initDrinks(data3);
        this.bevande = this.drinks;
        let prevDrinks = null;
        let index = -1;
        if (this.suborders.length > 0) {
          index = this.suborders.findIndex(x => x.state_drinks === SuborderState.incoda);
          if (index > -1) {
            prevDrinks = this.suborders[index].ordered_drinks;
            // prevDrinks = prevDrinks.filter(x => x.available);

            for (const p of prevDrinks) {
              index = this.bevande.findIndex(x => x._id === p.drink_id);
              this.bevande[index].quantita = p.quantity;
            }
          }
        }

      });
    });
  }

  ngOnInit() {

    this.tableHttp.getTable(this.tableId).subscribe(
      table => {
        this.table = table;
        if (table.order_id && table.order_id !== null) {
          this.getSuborders();
        } else {
          this.getFoodsAndDrinks();
        }
      });

    this.foodHttp.getCategories().subscribe(data2 => {
      this.categorieCibi = data2;
    });
    this.drinkHttp.getCategories().subscribe(data2 => {
      this.categorieBibite = data2;
    });




    // this.sio.modified_food().subscribe(food => {
    //   if (food) {
    //     const index = this.foods.findIndex(x => x._id === food._id);
    //     if (index === -1) {
    //       food.quantita = 0;
    //       this.foods.push(food);
    //     } else {
    //       food.quantita = foods[index].quantita;
    //       this.foods[index] = food;
    //     }
    //   } else {
    //     this.getFoods();
    //   }
    // });
  }
  get cibiCarrello() {
    return this.foods.findIndex(x => x.quantita > 0) > -1;
  }
  get bibiteCarrello() {
    return this.drinks.findIndex(x => x.quantita > 0) > -1;
  }
  get cibiOrdinatiFiltrati() {
    return this.foods.filter(x => x.quantita > 0);
  }
  get bibiteOrdinateFiltrate() {
    return this.drinks.filter(x => x.quantita > 0);
  }
  categoriaCiboModificata() {
    this.foods = this.cibi;
    if (this.categoriaCibo !== '') {
      this.foods = this.foods.filter(x => x.categoria === this.categoriaCibo);
    }
  }
  categoriaBibiteModificata() {
    this.drinks = this.bevande;
    if (this.categoriaBibite !== "") {
      this.drinks = this.drinks.filter(
        x => x.categoria === this.categoriaBibite
      );
    }
  }
  creaSubOrder() {
    const orderedFoods = [];
    const orderedDrinks = [];
    let i = 0;
    if (this.table.order_id === null) {
      this.orderHttp.addOrder(this.table._id, this.table.clients, this.table.waiter_id).subscribe(
        order => {
          this.table.order_id = order._id;
          for (i = 0; i < this.cibiOrdinatiFiltrati.length; i++) {
            orderedFoods.push({
              food_id: this.cibiOrdinatiFiltrati[i]._id,
              quantity: this.cibiOrdinatiFiltrati[i].quantita
            });
          }
          for (i = 0; i < this.bibiteOrdinateFiltrate.length; i++) {
            orderedDrinks.push({
              drink_id: this.bibiteOrdinateFiltrate[i]._id,
              quantity: this.bibiteOrdinateFiltrate[i].quantita
            });
          }
          this.orderHttp.addSuborder(this.table.order_id, orderedFoods, orderedDrinks).subscribe(
            data => {
              this.openSnackBar('Ordine aggiunto', 2000);
              this.router.navigate(['']);
            },
            err => {
              console.log(err);
            }
          );
        });
    }
    else {

      for (i = 0; i < this.cibiOrdinatiFiltrati.length; i++) {
        orderedFoods.push({
          food_id: this.cibiOrdinatiFiltrati[i]._id,
          quantity: this.cibiOrdinatiFiltrati[i].quantita
        });
      }
      for (i = 0; i < this.bibiteOrdinateFiltrate.length; i++) {
        orderedDrinks.push({
          drink_id: this.bibiteOrdinateFiltrate[i]._id,
          quantity: this.bibiteOrdinateFiltrate[i].quantita
        });
      }
      this.orderHttp.addSuborder(this.table.order_id, orderedFoods, orderedDrinks).subscribe(
        data => {
          this.openSnackBar('Ordine aggiunto', 2000);
          this.router.navigate(['']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'chiudi', {
      duration: time
    });
  }

  // addFoodToOrder(food: FoodModel, quantita: number) {
  //   const index = this.foods.findIndex(x => x._id === food._id);
  //   this.foods[index] = {_id: food._id, price: food.price, name: food.name, quantita};
  // }
  // addDrinkToOrder(food: FoodModel, quantita: number) {
  //   const index = this.foods.findIndex(x => x._id === food._id);
  //   this.foods[index] = {_id: food._id, price: food.price, name: food.name, quantita};
  // }
  // addDrinkToOrder(_id: string, quantita: number) {
  //   const index = this.drinks.findIndex(x => x._id === _id);
  //   if (index > -1) {
  //     this.drinks[index] = { _id, quantita };
  //   } else {
  //     this.drinks.push({ _id, quantita });
  //   }
  // }
}

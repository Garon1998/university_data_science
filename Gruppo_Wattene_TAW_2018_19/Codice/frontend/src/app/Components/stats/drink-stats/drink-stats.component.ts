import { Component, OnInit } from '@angular/core';
import { DrinkModel, Role } from 'src/app/Models';
import { MatTableDataSource } from '@angular/material';
import { DrinkService, UserService, OrderService } from 'src/app/Services';

export interface IDrinkStats {
  drink_id: string;
  nrDrink: number;
  drink_name: string;
}

@Component({
  selector: 'app-drink-stats',
  templateUrl: './drink-stats.component.html',
  styleUrls: ['./drink-stats.component.css']
})
export class DrinkStatsComponent implements OnInit {
  drinks: DrinkModel[] = [];
  drinkStats: IDrinkStats[] = [];
  dataSource: MatTableDataSource<IDrinkStats>;

  constructor(
    private userHttp: UserService,
    private orderHttp: OrderService,
    private drinkHttp: DrinkService
  ) { }

  ngOnInit() {

    this.drinkHttp.getDrinks().subscribe(
      users => {
        this.drinks = users;
        this.orderHttp.getAllSuborders().subscribe(
          suborders => {
            for (const drink of this.drinks) {
              let numeroDrink = 0;

              for (const suborder of suborders) {
                for (const bevanda of suborder.ordered_drinks) {
                  if (bevanda.drink_id === drink._id) {
                    numeroDrink += bevanda.quantity;
                  }
                }
              }

              this.drinkStats.push({ nrDrink: numeroDrink, drink_id: drink._id, drink_name: drink.name });
            }
            this.dataSource = new MatTableDataSource<IDrinkStats>(this.drinkStats);
            this.drinkStats.sort((a, b) => b.nrDrink - a.nrDrink);
          });
      }
    );

  }

}

import { Component, OnInit } from '@angular/core';
import { FoodModel } from 'src/app/Models';
import { MatTableDataSource } from '@angular/material';
import { UserService, OrderService, FoodService } from 'src/app/Services';


export interface IfoodStats {
  food_id: string;
  nrfood: number;
  food_name: string;
}

@Component({
  selector: 'app-food-stats',
  templateUrl: './food-stats.component.html',
  styleUrls: ['./food-stats.component.css']
})
export class FoodStatsComponent implements OnInit {

  foods: FoodModel[] = [];
  foodStats: IfoodStats[] = [];
  dataSource: MatTableDataSource<IfoodStats>;

  constructor(
    private userHttp: UserService,
    private orderHttp: OrderService,
    private foodHttp: FoodService
  ) { }

  ngOnInit() {

    this.foodHttp.getFoods().subscribe(
      users => {
        this.foods = users;
        this.orderHttp.getAllSuborders().subscribe(
          suborders => {
            for (const food of this.foods) {
              var numeroFood = 0;

              for (const suborder of suborders) {
                for (const cibo of suborder.ordered_foods) {
                  if (cibo.food_id === food._id) {
                    numeroFood += cibo.quantity;
                  }
                }
              }

              this.foodStats.push({ nrfood: numeroFood, food_id: food._id, food_name: food.name });
            }
            this.foodStats.sort((a,b) => b.nrfood - a.nrfood);
            this.dataSource = new MatTableDataSource<IfoodStats>(this.foodStats);
          });
      }
    );

  }

}

import { Component, OnInit } from '@angular/core';
import { FoodService, DrinkService, OrderService, SocketIOService, UserService } from 'src/app/Services';
import { Router } from '@angular/router';
import { UserModel, Role, DrinkModel, OrderModel, SuborderModel, SuborderState } from 'src/app/Models';
import { MatSnackBar, MatTableDataSource } from '@angular/material';

export interface ICookStats {
  cook_id: string;
  nrPiatti: number;
  cook_name: string;
  cook_surname: string;
}
@Component({
  selector: 'app-cook-stats',
  templateUrl: './cook-stats.component.html',
  styleUrls: ['./cook-stats.component.css']
})
export class CookStatsComponent implements OnInit {
  chefs: UserModel[] = [];
  cookstats: ICookStats[] = [];
  dataSource: MatTableDataSource<ICookStats>;

  constructor(private userHttp: UserService, private orderHttp: OrderService) {

  }


  ngOnInit() {
    this.userHttp.getUsers().subscribe(
      users => {
        this.chefs = users.filter(x => x.role === Role.cuoco);
        this.orderHttp.getAllSuborders().subscribe(
          suborders => {
            const ordered_foods = [];
            for (const s of suborders) {
              for (const f of s.ordered_foods) {
                ordered_foods.push(f);
              }
            }
            for (const cook of this.chefs) {
              let nrPiatti = 0;
              for (const o of ordered_foods) {
                if (o.prepared_by === cook._id) {
                  nrPiatti += o.quantity;
                }
              }
              this.cookstats.push({ nrPiatti, cook_id: cook._id, cook_name: cook.firstname, cook_surname: cook.lastname });
            }
            this.dataSource = new MatTableDataSource<ICookStats>(this.cookstats);
          });
      }
    );
  }
}

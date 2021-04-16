import { Component, OnInit } from '@angular/core';
import { UserModel, Role } from 'src/app/Models';
import { MatTableDataSource } from '@angular/material';
import { UserService, OrderService } from 'src/app/Services';

export interface IBarmanStats {
  barman_id: string;
  nrDrink: number;
  barman_name: string;
  barman_surname: string;
}

@Component({
  selector: 'app-barman-stats',
  templateUrl: './barman-stats.component.html',
  styleUrls: ['./barman-stats.component.css']
})
export class BarmanStatsComponent implements OnInit {

  barmans: UserModel[] = [];
  barmanStats: IBarmanStats[] = [];
  dataSource: MatTableDataSource<IBarmanStats>;

  constructor(
    private userHttp: UserService,
    private orderHttp: OrderService
  ) { }

  ngOnInit() {

    this.userHttp.getUsers().subscribe(
      users => {
        this.barmans = users.filter(x => x.role === Role.barista);
        this.orderHttp.getAllSuborders().subscribe(
          suborders => {
            for (const barman of this.barmans) {
              
              var numeroDrink = 0;

              for (const suborder of suborders) {
                for (const drink of suborder.ordered_drinks) {
                  if (drink.prepared_by === barman._id) {
                    numeroDrink += drink.quantity;
                  }
                }
              }
              this.barmanStats.push({ nrDrink: numeroDrink, barman_id: barman._id, barman_name: barman.firstname, barman_surname: barman.lastname });
            }
            this.dataSource = new MatTableDataSource<IBarmanStats>(this.barmanStats);
          });
      }
    );


  }

}

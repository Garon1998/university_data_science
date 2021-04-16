import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services';
import { MatTableDataSource } from '@angular/material';

export interface ImoneyStats {
  soldi: number;
  nrClients: number;
}

@Component({
  selector: 'app-money-stats',
  templateUrl: './money-stats.component.html',
  styleUrls: ['./money-stats.component.css']
})
export class MoneyStatsComponent implements OnInit {

  moneyStats: ImoneyStats[] = [];
  dataSource: MatTableDataSource<ImoneyStats>;

  constructor(
    private orderHttp: OrderService
  ) { }

  ngOnInit() {

    this.orderHttp.getOrders().subscribe(
      orders => {
        var soldi = 0;
        var clienti = 0;
        orders.forEach(
          x => clienti += x.clients,
        );
        orders.forEach(
          x => soldi += x.amount
        );
        this.moneyStats.push({ soldi: soldi, nrClients: clienti });
        this.dataSource = new MatTableDataSource<ImoneyStats>(this.moneyStats);
      }
    );

  }

}

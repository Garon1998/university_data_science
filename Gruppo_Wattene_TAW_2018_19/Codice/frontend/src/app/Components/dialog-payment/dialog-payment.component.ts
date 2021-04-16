import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogTableComponent, DialogData } from '../dialog-table/dialog-table.component';
import { TableService, OrderService } from 'src/app/Services';
import { OrderModel, TableModel, SuborderModel } from 'src/app/Models';

export interface DialogDataPayment {
  idTable: string;
  idOrder: string;
}

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.css']
})
export class DialogPaymentComponent implements OnInit {

  table: TableModel;
  subOrders: SuborderModel[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataPayment,
    private tableHttp: TableService,
    private orderHttp: OrderService
  ) { }

  ngOnInit() {
    this.tableHttp.getTable(this.data.idTable).subscribe(
      data => {
        this.table = data;
      }, err => {
        console.log(err);
      }
    );

    this.orderHttp.getSubOrders(this.data.idOrder).subscribe(
      data => {
        this.subOrders = data;
      }
    );


  }

  pay() {
    this.orderHttp.pay(this.data.idOrder).subscribe(
      data => {}
    );
  }

  close() {
    this.dialogRef.close();
  }

  get total() {
    let tot = 0;
    for (const so of this.subOrders) {
      for (const f of so.ordered_foods) {
        tot += f.price * f.quantity;
      }
      for (const d of so.ordered_drinks) {
        tot += d.price * d.quantity;
      }
    }
    return tot;
  }

}

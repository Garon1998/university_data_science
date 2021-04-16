import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableService, UserService, OrderService } from '../../Services';
import { TableModel, UserModel, Role } from '../../Models';
import { MatSnackBar } from '@angular/material';

export interface DialogData {
  numeroClienti: number;
  idCameriere: string;
  table_id: string;
  maxSeats: number;
  minSeats: number;
  addTable: boolean;
}

@Component({
  selector: 'app-dialog-table',
  templateUrl: './dialog-table.component.html',
  styleUrls: ['./dialog-table.component.css']
})
export class DialogTableComponent implements OnInit {
  Roles = Role;
  role: string;
  tableNumber: number;
  table_id: string;
  numeroClienti: number;
  idCameriere: string;
  table: TableModel;
  waiters: UserModel[] = [];
  maxSeats: number;

  constructor(
    private dialogRef: MatDialogRef<DialogTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private tableHttp: TableService,
    private userHttp: UserService,
    private orderHttp: OrderService,
    private snackBar: MatSnackBar
  ) {
    this.role = this.userHttp.getRole();
  }
  ngOnInit() {
    if (this.role === this.Roles.cassa) {
      this.userHttp.getUsers().subscribe(
        res => {
          this.waiters = res.filter(x => x.role === 'cameriere');
        }
      );
    }
  }
  close() {
    this.dialogRef.close();
  }

  takeTable() {
    if (!this.idCameriere) {
      this.idCameriere = localStorage.getItem('id');
    }
    this.tableHttp.takeTable(this.data.table_id, this.numeroClienti, this.idCameriere).subscribe(
      data => {
        this.table = data;
      }
    );
  }
  
  addTable() {
    this.tableHttp.addTable(this.tableNumber, this.maxSeats).subscribe(
      data => {
        this.table = data;
      }
    );
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'chiudi', {
      duration: time,
    });
  }

}

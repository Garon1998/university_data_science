import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/Models";
import { UserService, SocketIOService } from "src/app/Services";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  dataSource;
  users: UserModel[] = [];

  constructor(
    private userHttp: UserService,
    private sio: SocketIOService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.sio.modified_user().subscribe(user => {
      if (user) {
        const index = this.users.findIndex(x => x._id === user._id);
        if (index === -1) {
          this.users.push(user);
        } else {
          this.users[index] = user;
        }
        this.dataSource = new MatTableDataSource<UserModel>(
          this.users.filter(x => x.delation_date === null)
        );
      } else {
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.userHttp.getUsers().subscribe(
      data => {
        this.users = data.filter(x => x.delation_date === null);
        this.dataSource = new MatTableDataSource<UserModel>(
          data.filter(x => x.delation_date === null)
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  removeUser(id: string) {
    this.userHttp.deleteUser(id).subscribe(data => {
      this.users = this.users.filter(x => x._id !== id);
      this.dataSource = new MatTableDataSource<UserModel>(this.users);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

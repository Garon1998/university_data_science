import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel, Role } from '../../Models';
import { UserService } from '../../Services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  Roles = null;
  role = '';
  user: UserModel;
  userLoggedIn: boolean;
  constructor(private router: Router, private userHttp: UserService) {
    this.userLoggedIn = false;
    this.Roles = Role;
  }

  ngOnInit() {
    this.userHttp.getCurrentUser().subscribe(
      res => {
        this.user = res;
      }
    );
    this.role = this.userHttp.getRole();
  }

  logout() {
    this.userHttp.logout();
  }

  isThatPage(name: string) {
    return this.router.url.indexOf(name) > -1;
  }

}

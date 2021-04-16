import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate {

  constructor(private userHttp: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.userHttp.isAuthenticated() || (!this.userHttp.isAuthenticated() && !this.userHttp.isRefreshTokenExpired())) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}

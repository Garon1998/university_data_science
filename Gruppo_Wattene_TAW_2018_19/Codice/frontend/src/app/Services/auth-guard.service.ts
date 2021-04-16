import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userHttp: UserService, private router: Router) { }

  canActivate(): boolean {
    if (!this.userHttp.isAuthenticated() && this.userHttp.isRefreshTokenExpired()) {
      this.router.navigate(['login']);
      // this.userHttp.setEmitter(false);
      return false;
    }
    // this.userHttp.setEmitter(true);
    return true;
  }
}

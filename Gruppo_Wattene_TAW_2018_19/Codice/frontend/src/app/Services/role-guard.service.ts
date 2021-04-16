import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { UserService } from './user.service';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate  {
  constructor(private userHttp: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = this.userHttp.getToken();
    const tokenPayload = decode(token);

    if ((!this.userHttp.isAuthenticated() && this.userHttp.isRefreshTokenExpired()) || tokenPayload.role !== expectedRole) {
      this.router.navigate(['login']);
      // this.userHttp.setEmitter(false);
      return false;
    }
    // this.userHttp.setEmitter(true);
    return true;
  }
}

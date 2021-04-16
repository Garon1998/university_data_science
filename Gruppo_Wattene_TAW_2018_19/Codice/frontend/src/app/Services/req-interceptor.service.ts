// https://github.com/IntertechInc/http-interceptor-refresh-token/blob/master/src/app/request-interceptor.service.ts

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import {
  throwError as observableThrowError,
  Observable,
  BehaviorSubject
} from "rxjs";
import { take, filter, catchError, switchMap, finalize } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class ReqInterceptorService implements HttpInterceptor {
  url: string;
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(private userHttp: UserService, private router: Router) {
    this.url = environment.backendUrl;
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('login')) {
      return next.handle(req);
    }

    return next.handle(this.cloneRequest(req)).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            // case 400:
            //     return this.handle400Error(err);
            case 401:
              return this.handle401Error(req, next);
            default:
              return observableThrowError(err);
          }
        } else {
          return observableThrowError(err);
        }
      })
    );
  }
  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.userHttp.renewToken().pipe(
        switchMap((data: any) => {
          if (data) {
            this.tokenSubject.next(data.token);
            this.userHttp.setToken(data.token);
            this.userHttp.setRefreshToken(data.refresh_token);
            return next.handle(this.cloneRequest(req));
          }

          return this.logoutUser();
        }),
        catchError(error => {
          // Se l'utente non esiste più nel database riceve errore 404
          if (error.status === 404) {
            return this.logoutUser();
          }
          return observableThrowError(error);
        }),
        finalize(() => {
          console.log('Refresh finito');
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          this.userHttp.setToken(token);
          return next.handle(this.cloneRequest(req));
        })
      );
    }
  }
  cloneRequest(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      headers: req.headers
        .set('authorization', 'Bearer ' + this.userHttp.getToken())
        .set('Content-Type', 'application/json')
        .set('cache-control', 'no-cache')
    });
  }
  logoutUser() {
    console.log('LOGOUT');
    this.userHttp.logout();
    // Route to the login page (implementation up to you)
    this.router.navigate(['login']);
    return observableThrowError('');
  }
}

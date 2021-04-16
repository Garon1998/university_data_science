import { Injectable, EventEmitter, Output  } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { UserModel } from '../Models';
import decode from 'jwt-decode';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private url: string;
  private token: string;
  private readonly TOKEN = "token";
  private readonly REFRESHTOKEN = "refresh_token";

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.url = environment.backendUrl + 'users/';
    this.token = this.getToken();
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN);
  }
  setToken(value) {
    return localStorage.setItem(this.TOKEN, value);
  }
  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESHTOKEN);
  }
  setRefreshToken(value) {
    return localStorage.setItem(this.REFRESHTOKEN, value);
  }
  getUserId() {
    return localStorage.getItem('id');
  }

  getUsers() {
    return this.http.get<UserModel[]>(this.url);
  }

  getUser(id: string) {
    return this.http.get<UserModel>(this.url.concat(id));
  }

  getCurrentUser() {
    return this.http.get<UserModel>(this.url.concat("current"));
  }

  deleteUser(id: string) {
    return this.http.delete(this.url.concat(id));
  }
  logout() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.REFRESHTOKEN);
  }
  login(username: string, password: string) {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', atob(password));
    return this.http.post<UserModel>(this.url.concat('login'), body);
  }
  register(
    username: string,
    firstname: string,
    lastname: string,
    role: string,
    password: string
  ) {
    const body = {
      username,
      password: atob(password),
      role,
      lastname,
      firstname
    };
    return this.http.post<UserModel>(this.url, JSON.stringify(body));
  }

  /* api per controllare il token */

  // isTokenValid(token: string) {

  //   // return this.http.get<boolean>(this.url.concat('user?token=' + token));
  //   return true;
  // }

  getRole() {
    const token = this.getToken();
    const tokenPayload = decode(token);
    return tokenPayload.role;
  }
  getUser_id() {
    const token = this.getToken();
    const tokenPayload = decode(token);
    return tokenPayload.sub;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
  isRefreshTokenExpired() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return true;
    }
    return this.jwtHelper.isTokenExpired(refreshToken);
  }

  renewToken() {
    const body = {
      refresh_token: this.getRefreshToken(),
      user_id: this.getUserId()
    };
    return this.http.post<UserModel>(
      this.url.concat("refresh"),
      JSON.stringify(body)
    );
  }
}

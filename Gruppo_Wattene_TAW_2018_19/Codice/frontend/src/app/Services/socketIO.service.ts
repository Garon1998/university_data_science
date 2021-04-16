import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FoodModel, DrinkModel, TableModel, UserModel, SuborderModel } from '../Models';

@Injectable()
export class SocketIOService {
  private url: string;
  private socket;

  constructor() {
    this.url = environment.backendUrl;
    this.socket = io(this.url);
  }

  modified_table(): Observable<TableModel> {
    return new Observable(observer => {
      this.socket.on("modified_table", table => {
        observer.next(table);
      });
    });
  }
  modified_food(): Observable<FoodModel> {
    return new Observable(observer => {
      this.socket.on("modified_food", food => {
        observer.next(food);
      });
    });
  }
  modified_drink(): Observable<DrinkModel> {
    return new Observable(observer => {
      this.socket.on("modified_drink", drink => {
        observer.next(drink);
      });
    });
  }
  modified_user(): Observable<UserModel> {
    return new Observable(observer => {
      this.socket.on("modified_user", user => {
        observer.next(user);
      });
    });
  }
  order_deleted(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('order_deleted', orderId => {
        observer.next(orderId);
      });
    });
  }
  modified_suborder(): Observable<SuborderModel[]> {
    return new Observable(observer => {
      this.socket.on('modified_suborder', suborder => {
        observer.next(suborder);
      });
    });
  }
  modified_suborder_food(): Observable<SuborderModel> {
    return new Observable(observer => {
      this.socket.on('modified_suborder_food', suborder => {
        observer.next(suborder);
      });
    });
  }
  modified_suborder_drink(): Observable<SuborderModel> {
    return new Observable(observer => {
      this.socket.on("modified_suborder_drink", suborder => {
        observer.next(suborder);
      });
    });
  }
}
  /** */




        // todo
        // return {unsubscribe(){
        //     this.socket.disconnect();
        // }};


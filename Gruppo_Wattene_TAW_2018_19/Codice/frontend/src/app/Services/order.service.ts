import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OrderModel,SuborderModel } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.backendUrl + 'orders/';
  }

  getOrders() {
    return this.http.get<OrderModel[]>(this.url);
  }
  getOrder(id: string) {
    return this.http.get<OrderModel>(this.url.concat(id));
  }
  getAllSuborders() {
    return this.http.get<SuborderModel[]>(this.url.concat('suborders'));
  }
  // TODO modifica in getSubOrdersById
  getSubOrders(orderId: string) {
    return this.http.get<SuborderModel[]>(this.url.concat(orderId + '/suborders'));
  }
  getSuborderFoods() {
    return this.http.get<SuborderModel[]>(this.url.concat('suborders?type=food'));
  }
  getSuborderDrinks() {
    return this.http.get<SuborderModel[]>(this.url.concat('suborders?type=drink'));
  }
  getReadySuborderFoods() {
    return this.http.get<SuborderModel[]>(this.url.concat('suborders?type=food&ready=true'));
  }
  getReadySuborderDrinks() {
    return this.http.get<SuborderModel[]>(this.url.concat('suborders?type=drink&ready=true'));
  }

  setFoodReady(idFood: string, idOrder: string, idSuborder: string, ready: boolean) {
    const body = { ready };
    // tslint:disable-next-line: max-line-length
    return this.http.put<SuborderModel>(this.url.concat(idOrder + '/suborders/' + idSuborder + '/foods/' + idFood), body);
  }
  setDrinkReady(idDrink: string, idOrder: string, idSuborder: string, ready: boolean) {
    const body = { ready };
    // tslint:disable-next-line: max-line-length
    return this.http.put<SuborderModel>(this.url.concat(idOrder + '/suborders/' + idSuborder + '/drinks/' + idDrink), body);
  }

  addOrder(tableid: string, clients: number, waiter_id: string) {
    const body = {
      table_id: tableid,
      clients,
      waiter_id
    };
    return this.http.post<OrderModel>(this.url, JSON.stringify(body));
  }

  addSuborder(orderId: string, orderedFoods?: string[], orderedDrinks?: string[]) {
    const body = {
      orderId,
      ordered_foods: orderedFoods,
      ordered_drinks: orderedDrinks
     };
    return this.http.post<SuborderModel[]>(this.url.concat(orderId + '/suborders'), JSON.stringify(body));
  }

  pay(id: string) {
    const body = {
      paid: true
    };
    return this.http.put(this.url.concat(id), body);
  }
  deleteOrder(orderId: string) {
    return this.http.delete(this.url.concat(orderId));
  }

  setAllFoodsReady(order_id: string, suborder_id: string) {
    const body = {
      foods_ready: true
    };
    return this.http.put<SuborderModel>(this.url.concat(order_id + '/suborders/' + suborder_id), body);
  }
  setAllDrinksReady(order_id: string, suborder_id: string) {
    const body = {
      drinks_ready: true
    };
    return this.http.put<SuborderModel>(this.url.concat(order_id + '/suborders/' + suborder_id), body);
  }
  setFoodSuborderDelivered(order_id: string, suborder_id: string) {
    const body = {
      foods_served: true
    };
    return this.http.put<SuborderModel>(this.url.concat(order_id + '/suborders/' + suborder_id), body);
  }

  setDrinkSuborderDelivered(order_id: string, suborder_id: string) {
    const body = {
      drinks_served: true
    };
    return this.http.put<SuborderModel>(this.url.concat(order_id + '/suborders/' + suborder_id), body);
  }


}

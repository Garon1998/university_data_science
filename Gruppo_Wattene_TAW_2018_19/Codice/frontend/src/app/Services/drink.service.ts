import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DrinkModel } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  url: string;
  token: string;

  constructor(private http: HttpClient) {
    this.url = environment.backendUrl + 'drinks/';
    this.token = localStorage.getItem('token');
  }

  getDrinks() {
    return this.http.get<DrinkModel[]>(this.url);
  }

  getDrink(id: string) {
    return this.http.get<DrinkModel[]>(this.url.concat('/' + id));
  }

  getCategories() {

    return this.http.get<string[]>(this.url.concat('categories'));
  }

  createDrink(drink: DrinkModel){
    const body = {
        name: drink.name,
        price: drink.price,
        time: drink.time,
        category: drink.category,
        available: drink.available
      };
    return this.http.post<DrinkModel>(this.url, JSON.stringify(body));
  }

  deleteDrink(id: string){
    return this.http.delete(this.url.concat(id));
  }

  updateDrink(drink: DrinkModel, availableDrink: boolean) {
    const body = {
      name: drink.name,
      price: drink.price,
      time: drink.time,
      category: drink.category,
      available: availableDrink
    };

    return this.http.put<DrinkModel>(this.url.concat(drink._id), JSON.stringify(body));
  }
}

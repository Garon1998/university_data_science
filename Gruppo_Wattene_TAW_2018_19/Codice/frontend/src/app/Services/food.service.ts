import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FoodModel } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  url: string;
  token: string;

  constructor(private http: HttpClient) {
    this.url = environment.backendUrl + 'foods/';
    this.token = localStorage.getItem('token');
  }

  getFoods() {
    return this.http.get<FoodModel[]>(this.url);
  }

  getFood(id: string) {
    return this.http.get<FoodModel>(this.url + id);
  }

  getCategories() {
    return this.http.get<string[]>(this.url.concat('categories'));
  }

  createFood(food: FoodModel) {
    const body = {
      name: food.name,
      price: food.price,
      time: food.time,
      category: food.category,
      available: food.available
    };

    return this.http.post<FoodModel>(this.url, JSON.stringify(body));
  }

  deleteFood(id: string) {
    return this.http.delete(this.url.concat(id));
  }

  updateFood(food: FoodModel, availableFood: boolean) {
    const body = {
      name: food.name,
      price: food.price,
      time: food.time,
      category: food.category,
      available: availableFood
    };
    return this.http.put<FoodModel>(this.url.concat(food._id), JSON.stringify(body));
  }

}

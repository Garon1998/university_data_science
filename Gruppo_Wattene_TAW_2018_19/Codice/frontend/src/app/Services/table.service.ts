import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TableModel } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private url: string;
  private token: string;

  constructor(private http: HttpClient) {
    this.url = environment.backendUrl +   'tables/';
    this.token = localStorage.getItem('token');
  }

  getTables() {
    return this.http.get<TableModel[]>(this.url);
  }

  getTable(id: string) {
    return this.http.get<TableModel>(this.url.concat(id));
  }

  takeTable(tableid: string, clients: number, idCameriere: string) {
    const body = {
      clients,
      waiter_id: idCameriere,
      available: false
    };
    return this.http.put<TableModel>(this.url.concat(tableid), JSON.stringify(body));
  }

  freeTable(tableId: string) {
    const body = {
      available: true
    };
    return this.http.put<TableModel>(this.url.concat(tableId), JSON.stringify(body));
  }

  deleteTable(tableId: string) {
    return this.http.delete<JSON>(this.url.concat(tableId));
  }

  addTable(tableNumber: number, totalSeats: number) {
    const body = {
        table_number: tableNumber,
        total_seats: totalSeats
      };

    return this.http.post<TableModel>(this.url, JSON.stringify(body));
  }
}

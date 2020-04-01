import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _url = environment.server;

  constructor(
    public http: HttpClient,
  ) { }

  getOrders()
  {
    return this.http.get(`${this._url}/order/getAllOrders`);
  }
}

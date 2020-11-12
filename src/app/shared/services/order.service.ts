import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  basket:Subject<any> = new Subject<any>();
  bag:Subject<boolean> = new Subject<boolean>();
  
  private url:string;
  
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000/orders';
   }

   getMyOrders():Observable<Array<IOrder>>{
     return this.http.get<Array<IOrder>>(this.url);
   }

   addMyOrder(obj:IOrder):Observable<Array<IOrder>>{
     return this.http.post<Array<IOrder>>(this.url,obj);
   }
  
   deleteOrders():Observable<Array<IOrder>>{
     return this.http.delete<Array<IOrder>>(`${this.url}/1`);
   }
}

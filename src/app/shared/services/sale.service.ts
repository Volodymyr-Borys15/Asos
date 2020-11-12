import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISales } from '../interfaces/sales';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/sale';
  }

  trynewfilter(color?,brand?,style?,price?):Observable<Array<ISales>>{
    return this.http.get<Array<ISales>>(`${this.url}?color_like=${color}&brand_like=${brand}&style_like=${style}&price_gte=${price}`);
  }

  getMySales(): Observable<Array<ISales>> {
    return this.http.get<Array<ISales>>(this.url);
  }

  getMySalesPag(count?): Observable<Array<ISales>> {
    return this.http.get<Array<ISales>>(`${this.url}?&_limit=${count}`);
  }
  getMySalesPaginCat(count?, category?): Observable<Array<ISales>> {
    return this.http.get<Array<ISales>>(`${this.url}/?category=${category}&_limit=${count}`);
  }
  getWomenSalesPagin(count?): Observable<Array<ISales>> {
    return this.http.get<Array<ISales>>(`${this.url}?gender=female&_limit=${count}`)
  }
  getWomenSalesPaginCat(count?, category?): Observable<Array<ISales>> {
    return this.http.get<Array<ISales>>(`${this.url}/?gender=female&category=${category}&_limit=${count}`)
  }
  addMySales(obj: ISales): Observable<Array<ISales>> {
    return this.http.post<Array<ISales>>(this.url, obj);
  }

  deleteMySales(obj: ISales): Observable<Array<ISales>> {
    return this.http.delete<Array<ISales>>(`${this.url}/${obj.id}`);
  }

  updateMySales(obj: ISales): Observable<Array<ISales>> {
    return this.http.put<Array<ISales>>(`${this.url}/${obj.id}`, obj);
  }

  getCurrentSale(id: number): Observable<ISales> {
    return this.http.get<ISales>(`${this.url}/${id}`);
  }



}

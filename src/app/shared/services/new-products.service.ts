import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INew } from '../interfaces/new-product';

@Injectable({
  providedIn: 'root'
})
export class NewProductsService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/new';
  }

  trynewfilter(color?,brand?,style?,price?):Observable<Array<INew>>{
    return this.http.get<Array<INew>>(`${this.url}?color_like=${color}&brand_like=${brand}&style_like=${style}&price_gte=${price}`);
  }
 
  getMyNew(): Observable<Array<INew>> {
    return this.http.get<Array<INew>>(this.url);
  }

  getMyNewPag(count?): Observable<Array<INew>> {
    return this.http.get<Array<INew>>(`${this.url}?&_limit=${count}`);
  }
  getMyNewPaginCat(count?, category?): Observable<Array<INew>> {
    return this.http.get<Array<INew>>(`${this.url}/?category=${category}&_limit=${count}`);
  }
  
  getWomenNewPagin(count?): Observable<Array<INew>> {
    return this.http.get<Array<INew>>(`${this.url}?gender=female&_limit=${count}`)
  }
  getWomenNewPaginCat(count?, category?): Observable<Array<INew>> {
    return this.http.get<Array<INew>>(`${this.url}/?gender=female&category=${category}&_limit=${count}`)
  }


  addMyNew(obj: INew): Observable<Array<INew>> {
    return this.http.post<Array<INew>>(this.url, obj);
  }

  deleteMyNew(obj: INew): Observable<Array<INew>> {
    return this.http.delete<Array<INew>>(`${this.url}/${obj.id}`);
  }

  updateMyNew(obj: INew): Observable<Array<INew>> {
    return this.http.put<Array<INew>>(`${this.url}/${obj.id}`, obj);
  }

  getCurrentNew(id: number): Observable<INew> {
    return this.http.get<INew>(`${this.url}/${id}`);
  }

}

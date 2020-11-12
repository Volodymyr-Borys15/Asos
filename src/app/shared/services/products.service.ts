import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  showMe:Subject<boolean> = new Subject<boolean>();

  private url: string;

  menBrands = ['hilfiger', 'northface', 'carhart', 'nike', 'ellesse', 'dr.martens', 'asos']
  womenBrands = ['monki', 'collusion', 'never fully dressed', 'topshop', 'reclaimed vintage', 'weekday', 'nike']

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  trynewfilter(color?,brand?,style?,price?):Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(`${this.url}?color_like=${color}&brand_like=${brand}&style_like=${style}&price_gte=${price}`);
  }

  getMenBrands() {
    return this.menBrands;
  }
  getWomenBrands(){
    return this.womenBrands;
  }

  getMyProduct(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }
  ///men
  getMyClothingPag(count?): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}/?category=clothing&_limit=${count}`);
  }
  getMyShoesPag(count?): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}/?category=shoes&_limit=${count}`);
  }
  getMyAccessoriesPag(count?): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}/?category=accessories&_limit=${count}`);
  }
  getMyProductStylePag(count?, style?): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}/?style=${style}&_limit=${count}`);
  }
  getMyBrandsPag(count?):Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(`${this.url}?&_limit=${count}`);
  }
  getMyBrandsCurStylePag(count?, brand?): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}/?brand=${brand}&_limit=${count}`);
  }
  ///women
  getWomenClothingPagin(count?):Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(`${this.url}/?gender=female&category=clothing&type=regular&_limit=${count}`)
  }
  getWomenShoesPagin(count?):Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(`${this.url}/?gender=female&category=shoes&type=regular&_limit=${count}`)
  }
  getWomenAccessoriesPagin(count?):Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(`${this.url}/?gender=female&category=accessories&_limit=${count}`);
  }
  getWomenBrandsPagin(count?):Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(`${this.url}?gender=female&_limit=${count}`)
  }
  getWomenBrandsStylePag(count?, brand?): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}/?gender=female&brand=${brand}&_limit=${count}`);
  }

  getWomenProductStylePag(count?, style?): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}/?gender=female&style=${style}&_limit=${count}`);
  }
  
 ///main
  addMyProduct(obj: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, obj);
  }

  deleteMyProduct(obj: IProduct): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${obj.id}`);
  }

  updateMyProduct(obj: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${obj.id}`, obj);
  }

  getCurrentProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

}

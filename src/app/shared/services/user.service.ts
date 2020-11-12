import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string;
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000/users';
   }

   getMyUsers():Observable<Array<IUser>>{
    return this.http.get<Array<IUser>>(this.url);
  }

   addMyUser(obj:IUser):Observable<Array<IUser>>{
    return this.http.post<Array<IUser>>(this.url,obj);
  }

  updateUser(obj:IUser):Observable<IUser>{
    const userUrl = `${this.url}/${obj.id}`;
    return this.http.put<IUser>(userUrl,obj);
  }

}

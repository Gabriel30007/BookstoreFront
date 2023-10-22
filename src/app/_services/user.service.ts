import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

const Auth_URL = 'https://localhost:44346/api/Authentication/';
const USER_URL = 'https://localhost:44346/api/User/';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(Auth_URL + 'test', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(Auth_URL + 'user', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(Auth_URL + 'admin', { responseType: 'text' });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(USER_URL + 'GetAllUsers', { responseType: 'text' })
  }
  getUserByID(id: any): Observable<any> {
    return this.http.get(USER_URL + 'GetUserById?id=' + id, { responseType: 'text' })
  }
  saveUser(id: string, name:string,email:string,password:string,roles:string):Observable<any>{
    return this.http.post(USER_URL+'SaveUser',{
      id,
      name,
      email,
      password,
      roles
    },
    { responseType: 'text' })
  }

  deleteUser(id:string){
    return this.http.post(USER_URL+'DeleteUser?id='+id,
    { responseType: 'text' })
  }
}
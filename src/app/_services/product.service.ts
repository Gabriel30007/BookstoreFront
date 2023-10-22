import { Injectable } from '@angular/core';
import {Product} from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = 'https://localhost:44346/api/Product/';
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  product?: Product
  constructor(private http: HttpClient) {}
  
  GetProducts() :Observable<any>{
    return this.http.get(
      AUTH_API + 'GetAllProducts',
      httpOptions
    )
  }
}

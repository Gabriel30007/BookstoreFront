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

  GetproductExtendData(filters: any, page: number, itemsOnPage: number):Observable<any>{
    return this.http.post(AUTH_API+'GetProductExtendData',{
      filters,
      page,
      itemsOnPage
    },
    { responseType: 'text' })
  }

  GetCountProducts(filters:any) :Observable<any>{
    return this.http.post(
      AUTH_API + 'GetCountOfProducts',{
        filters,
        Page:0,
        ItemsOnPage:0
      },
      { responseType: 'text' })
    }
}

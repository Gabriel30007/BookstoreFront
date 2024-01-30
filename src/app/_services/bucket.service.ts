import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bucket } from '../models/bucket.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = 'https://localhost:44346/api/Bucket/';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor(private http: HttpClient) { }

  GetProducts(id:string) :Observable<any>{
    return this.http.get(
      AUTH_API + 'GetBucketInformation?id='+id,
      httpOptions
    )
  }
}

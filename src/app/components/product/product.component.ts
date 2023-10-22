import { Component,OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from 'src/app/_services/product.service';

const AUTH_API = 'https://localhost:44346/api/Product/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  content?: Product[];
  constructor(private router: Router,private storageService: StorageService,private http: HttpClient, private productService: ProductService) {}
 
  ngOnInit(): void {
    if(this.storageService.isLoggedIn()){
      this.productService.GetProducts().subscribe({
        next: data => {
          this.content = data;
        },
        error: err => {
          this.content = err;
        }
      });
    } else{
      this.router.navigate(['home'])
          .then(() => {
            window.location.reload();
          });
    }
    
}
  buyProduct() :void{

  }
}
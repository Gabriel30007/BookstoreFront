import { Component,OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import {NgForm} from '@angular/forms';

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
  contentFiltered?: Product[];
  searchFild : string;
  sortBy: string;
  constructor(private router: Router,private storageService: StorageService,private http: HttpClient, private productService: ProductService) {
    this.searchFild = "";
    this.sortBy = "none";
    
  }
 
  ngOnInit(): void {
    if(this.storageService.isLoggedIn()){
      this.productService.GetProducts().subscribe({
        next: data => {
          this.content = data;
          this.contentFiltered = data;
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

  onSearchChange(): void {  
    console.log(this.searchFild);
    if(this.searchFild?.length == 0){
      this.contentFiltered = this.content;
    } else{
      this.contentFiltered = this.content?.filter(x=>x.name?.toLocaleLowerCase().includes(this.searchFild.toLocaleLowerCase()));
    }
  }
}
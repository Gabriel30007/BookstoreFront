import { Component,OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import {NgForm} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';

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
  ProductSize: number;
  pageEvent?: PageEvent;
  pageIndex: number;
  pageSize: number;
  filters: Record<string,string>;
  selectedSort: boolean = false;
  inputFantasy: boolean = false;
  inputClassic: boolean = false;
  inputComics: boolean = false;
  inputThrillers: boolean = false;
  inputPoetry: boolean = false;

  constructor(private router: Router,private storageService: StorageService,private http: HttpClient, private productService: ProductService) {
    this.searchFild = "";
    this.sortBy = "none";
    this.ProductSize = 0;
    this.pageIndex = 0;
    this.pageSize = 3;
    this.filters ={};
  }
 
  ngOnInit(): void { 
    if(this.storageService.isLoggedIn()){
      this.LoadProductData();
    } else{
      this.router.navigate(['home'])
          .then(() => {
            window.location.reload();
          });
    }
    
  }  

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.LoadProductData();
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

  LoadProductData(){
    this.loadCountOfProducts();
    this.productService.GetproductExtendData(this.filters, this.pageIndex, this.pageSize).subscribe({
      next: data => {
        this.content = JSON.parse(data);
      this.contentFiltered = JSON.parse(data);
      },
      error: err => {
        this.content = err;
      }
    });
  }

  onSortChange(event:any){
    this.filters['Order'] = this.selectedSort.toString();
    this.LoadProductData();
  }
  OnGenreChange(){
    let value = "";
    if(this.inputFantasy){
      value += "fantasy;";
    } 
    if(this.inputClassic){
      value += "classic;";
    } 
    if(this.inputComics){
      value += "comics;";
    } 
    if(this.inputThrillers){
      value += "thrillers;";
    } 
    if(this.inputPoetry){
      value += "poetry;";
    } 
    this.filters['Genre'] = value;
    this.LoadProductData();
  }

  loadCountOfProducts(){
    this.productService.GetCountProducts(this.filters).subscribe({
      next: data => {
       this.ProductSize = data;
      },
      error: err => {
        this.content = err;
      }
    });
  }
}
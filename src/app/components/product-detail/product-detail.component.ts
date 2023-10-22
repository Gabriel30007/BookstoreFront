import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product: Product;
  constructor(private route: ActivatedRoute,private http: HttpClient,private storageService: StorageService) {
    this.product = new Product;
  }
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('id');
    this.http.get<any>('https://localhost:44346/api/Product/GetSingleProduct?id='+productIdFromRoute).subscribe(data =>{
        this.product.id= data.id;
        this.product.name= data.name;
        this.product.price= data.price;
        this.product.photoID= data.photoID;
        this.product.description= data.description;
    })
  }
  BuyProduct():void {
   this.product.id;
   this.http.post<any>('https://localhost:44346/api/Bucket/SaveOrder',{
    ProductID : this.product.id,
    UserID: this.storageService.getUserID(),
   }).subscribe({
    next: data => {
      
  },
  error: error => {
      console.error('There was an error!', error);
  }
  });
  }
}

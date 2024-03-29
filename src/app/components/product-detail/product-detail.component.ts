import { Component, ViewChild,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { StorageService } from '../../_services/storage.service';
import { BreadCrumbsComponent } from '../bread-crumbs/bread-crumbs.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProductService } from 'src/app/_services/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product: Product;
  @ViewChild('breadCrumbsComponent') childComponent?: BreadCrumbsComponent;

  constructor(private route: ActivatedRoute,private http: HttpClient,private storageService: StorageService, private _snackBar: MatSnackBar, public productService:ProductService) {
    this.product = new Product;
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, "Закрити!", {
      duration: 5 * 1000,
    });
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('id');
    if(productIdFromRoute)
      this.productService.GetProductByID(productIdFromRoute).subscribe(data =>{
          this.product = data;
          this.childComponent?.ngOnChanges(this.product);
      });
  }
  BuyProduct():void {
   this.product.id;
   this.http.post<any>('https://localhost:44346/api/Bucket/SaveOrder',{
    ProductID : this.product.id,
    UserID: this.storageService.getUserID(),
   }).subscribe({
    next: data => {
      this.openSnackBar("Ви купили книгу!");
  },
  error: error => {
      console.error('There was an error!', error);
  }
  });
  }


}

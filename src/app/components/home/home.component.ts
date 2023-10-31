import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { SignalrService } from 'src/app/_services/signalr.service';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { ProductService } from 'src/app/_services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  returnData: any;
  productArr?: Product[];

  constructor(private authService: AuthService, private storageService: StorageService,private route: ActivatedRoute,private userService: UserService, private signalrService : SignalrService,private productService: ProductService) { }

  ngOnInit(): void {
    let code = this.route.snapshot.queryParams;
    if(code){
      this.authService.getDataByAuthCode(code).subscribe({
        next: data => {
          console.log("data gathered");
        },
        error: err => {console.log(err)
          if (err.error) {
            this.content = err.error;
          } else {
            this.content = "Error with status: " + err.status;
          }
        }
      });
      
    }else{
      
      this.userService.getPublicContent().subscribe({
        next: data => {
          this.content = data;
        },
        error: err => {console.log(err)
          if (err.error) {
            this.content = JSON.parse(err.error).message;
          } else {
            this.content = "Error with status: " + err.status;
          }
        }
      });
    }

    this.productService.GetProducts().subscribe({
      next: data => {
        this.productArr = data;
      },
      error: err => {
        this.content = err;
      }
    });
  }
  ngOnDestroy(): void {
    //(<Subscription>this.allFeedSubscription).unsubscribe();
  }
}
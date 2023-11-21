import { Component, OnDestroy, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { SignalrService } from 'src/app/_services/signalr.service';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { ProductService } from 'src/app/_services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  returnData: any;
  products: any

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 5
      }
    },
    nav: false
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private authService: AuthService, private storageService: StorageService, private route: ActivatedRoute, private userService: UserService, private signalrService: SignalrService, private productService: ProductService) {
    this.products = [];
  }

  ngOnInit(): void {
    let code = this.route.snapshot.queryParams;
    if (code) {
      this.authService.getDataByAuthCode(code).subscribe({
        next: data => {
          this.storageService.saveUser(data);
          window.location.reload();
        },
        error: err => {
          console.log(err)
          if (err.error) {
            this.content = err.error;
          } else {
            this.content = "Error with status: " + err.status;
          }
        }
      });

    } else {

      this.userService.getPublicContent().subscribe({
        next: data => {
          this.content = data;
        },
        error: err => {
          console.log(err)
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
        this.products = data;
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
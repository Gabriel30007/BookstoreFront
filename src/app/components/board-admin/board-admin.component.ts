import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { UserEditComponent } from '../edit-components/user-edit/user-edit.component';
import { User } from 'src/app/models/user.model';
import { ProductEditComponent } from '../edit-components/product-edit/product-edit.component';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})

export class BoardAdminComponent implements OnInit {
  content?: any[];
  errorMsg?: string;
  UserFlag?: boolean;
  ProductFlag?: boolean;
  BucketFlag?: boolean;
  closeResult?: any;
  EditObj: FormGroup;
  public selectedId?: any;
  IsInsert?: boolean;

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, private userService: UserService, private productService: ProductService, public viewContainerRef: ViewContainerRef) {
    this.EditObj = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      roles: new FormControl('')

    });
  }

  ngOnInit(): void {
    this.routerSettings();
  }
  GetUserContent(): void {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.content = JSON.parse(data);
      },
      error: err => {
        console.log(err)
        if (err.error) {
          this.errorMsg = JSON.parse(err.error).message;
        } else {
          this.errorMsg = "Error with status: " + err.status;
        }
      }
    });
  }

  GetProductContent(): void {
    this.productService.GetProducts().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.log(err)
        if (err.error) {
          this.errorMsg = JSON.parse(err.error).message;
        } else {
          this.errorMsg = "Error with status: " + err.status;
        }
      }
    });
  }
  AddElement(): void {

    switch (this.router.url.toString()) {
      case "/UserContent": {
        this.UserFlag = true;
        break;
      }
      case "/ProductContent": {
        this.ProductFlag = true;
        break;
      }
      case "/BucketContent": {
        this.BucketFlag = true;
        break;
      }

    }
  }
  DeleteElement(id: string) {
    if (confirm("Ви дійсно хочете видалити запис?")) {
      this.userService.deleteUser(id).subscribe({
        next: data => {
          this.routerSettings();
        },
        error: err => {
          console.log(err)
          if (err.error) {
            this.errorMsg = JSON.parse(err.error).message;
          } else {
            this.errorMsg = "Error with status: " + err.status;
          }
        }
      });
    }
  }

  routerSettings() {
    switch (this.router.url.toString()) {
      case "/UserContent": {
        this.UserFlag = true;
        this.GetUserContent();
        break;
      }
      case "/ProductContent": {
        this.ProductFlag = true;
        this.GetProductContent();
        break;
      }
      case "/BucketContent": {
        this.BucketFlag = true;
        break;
      }
      default: {
        this.router.navigateByUrl("/UserContent");
        this.UserFlag = true;
        this.GetUserContent();
      }
    }
  }

  openModal(): void {
    let editRef = this.viewContainerRef.createComponent(UserEditComponent);
    editRef.instance.user = new User();

    let onConfirmationObs = editRef.instance.OnConfirmation.subscribe(() => {
      this.routerSettings();
      onConfirmationObs.unsubscribe();
      editRef.destroy();
    });
  }

  openModalUpdate(id: string): void {
    let editRef = this.viewContainerRef.createComponent(UserEditComponent);
    editRef.instance.user = new User(id);

    let onConfirmationObs = editRef.instance.OnConfirmation.subscribe(() => {
      this.routerSettings();
      onConfirmationObs.unsubscribe();
      editRef.destroy();
    })
  }

  CreateProduct():void{
    let editRef = this.viewContainerRef.createComponent(ProductEditComponent);
  }
  UpdateProduct(id: string):void{
    let editRef = this.viewContainerRef.createComponent(ProductEditComponent);
    editRef.instance.product = new Product(id);
  }

  DeleteProduct(id:string):void{
    if (confirm("Ви дійсно хочете видалити запис?")) {
      this.productService.DeleteProduct(id).subscribe({
        next: data => {
          this.routerSettings();
        },
        error: err => {
          console.log(err)
          if (err.error) {
            this.errorMsg = JSON.parse(err.error).message;
          } else {
            this.errorMsg = "Error with status: " + err.status;
          }
        }
      });
    }
  }
}
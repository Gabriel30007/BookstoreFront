import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import {ModalWindowComponent} from 'src/app/components/modal-window/modal-window.component';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})

export class BoardAdminComponent implements OnInit {
  content?: any[];
  errorMsg?: string;
  UserFlag?:boolean;
  ProductFlag?:boolean;
  BucketFlag?:boolean;
  closeResult?:any;
  EditObj: FormGroup;
  child?:ModalWindowComponent;
  public selectedId?:any;
  IsInsert?: boolean;
  constructor(private modalService:NgbModal,private http: HttpClient,private router: Router,private userService: UserService,private productService: ProductService) {
    this.EditObj = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      roles: new FormControl('')
      
    });
   }
 
  ngOnInit(): void {
    this.routerSettings();
  }
  GetUserContent():void{
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.content = JSON.parse(data);
      },
      error: err => {console.log(err)
        if (err.error) {
          this.errorMsg = JSON.parse(err.error).message;
        } else {
          this.errorMsg = "Error with status: " + err.status;
        }
      }
    });
  }

  GetProductContent():void{
    this.productService.GetProducts().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.errorMsg = JSON.parse(err.error).message;
        } else {
          this.errorMsg = "Error with status: " + err.status;
        }
      }
    });
  }
  AddElement():void{
    
    switch (this.router.url.toString()) {
      case "/UserContent":{
        this.UserFlag = true;
        break;
      }
      case "/ProductContent":{
        this.ProductFlag = true;
        break;
      }
      case "/BucketContent":{
        this.BucketFlag = true;
        break;
      }
      
  }
}
  CreateElement():void{
    this.IsInsert =true;
    this.EditObj.controls['id'].setValue("");
    this.EditObj.controls['name'].setValue("");
    this.EditObj.controls['email'].setValue("");
    this.EditObj.controls['password'].setValue("");
    this.EditObj.controls['roles'].setValue("");
  }

  CreateUser():void{
    this.userService.saveUser('00000000-0000-0000-0000-000000000000',
    this.EditObj.controls['name'].value,
    this.EditObj.controls['email'].value,
    this.EditObj.controls['password'].value,
    'ROLE_USER').subscribe({
      next: data => {
        this.routerSettings();
      },
      error: err => {console.log(err)
        if (err.error) {
          this.errorMsg = JSON.parse(err.error).message;
        } else {
          this.errorMsg = "Error with status: " + err.status;
        }
      }
    });
  }

  EditElement(id:any):void{ 
    this.IsInsert =false;
    this.userService.getUserByID(id).subscribe({
      next: data => {
        let selectedObj = JSON.parse(data);
        this.EditObj.controls['id'].setValue(selectedObj.id);
        this.EditObj.controls['name'].setValue(selectedObj.name);
        this.EditObj.controls['email'].setValue(selectedObj.email);
        this.EditObj.controls['password'].setValue(selectedObj.password);
        this.EditObj.controls['roles'].setValue(selectedObj.roles);
      },
      error: err => {console.log(err)
        if (err.error) {
          this.errorMsg = JSON.parse(err.error).message;
        } else {
          this.errorMsg = "Error with status: " + err.status;
        }
      }
    });
  }
  EditInsertRoute():void{
    if(this.IsInsert == true){
      this.CreateUser();
    }else{
      this.EditUser();
    }
  }
  DeleteElement(id:string){
    if(confirm("Ви дійсно хочете видалити запис?")){
      this.userService.deleteUser(id).subscribe({
        next: data => {
          this.routerSettings();
        },
        error: err => {console.log(err)
          if (err.error) {
            this.errorMsg = JSON.parse(err.error).message;
          } else {
            this.errorMsg = "Error with status: " + err.status;
          }
        }
      });
    }
  }

  EditUser(){
   this.userService.saveUser(
      this.EditObj.controls['id'].value,
      this.EditObj.controls['name'].value,
      this.EditObj.controls['email'].value,
      this.EditObj.controls['password'].value,
      this.EditObj.controls['roles'].value,
    ).subscribe({
      next: data => {
        this.routerSettings();
      },
      error: err => {console.log(err)
        if (err.error) {
          this.errorMsg = JSON.parse(err.error).message;
        } else {
          this.errorMsg = "Error with status: " + err.status;
        }
      }
    });
  }

  routerSettings(){
    switch (this.router.url.toString()) {
      case "/UserContent":{
        this.UserFlag = true;
        this.GetUserContent();
        break;
      }
      case "/ProductContent":{
        this.ProductFlag = true;
        this.GetProductContent();
        break;
      }
      case "/BucketContent":{
        this.BucketFlag = true;
        break;
      }
      default:{
        this.router.navigateByUrl("/UserContent");
        this.UserFlag = true;
        this.GetUserContent();
      }
  }
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }  
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';
import { Guid } from 'guid-typescript';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  product?: Product;
  closeResult?:any;
  EditObj: FormGroup;
  authors?: Author[];
  genres?: Genre[];
  selectedAuthor: any;
  selectedGenre: any;
  selectedFile?: File;
  photoSrc?: string;
  title:string;
  @ViewChild('mymodal', {static: false}) mymodal!: TemplateRef<any>;


  constructor(private modalService:NgbModal, public productService:ProductService){
   
    this.EditObj = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(0),
      description: new FormControl(''),
      genre: new FormControl(''),
      author: new FormControl(''),
      photo: new FormControl(null),
      
    });
    this.title = "Створення продукту";
  }

  ngAfterViewInit(): void {
    this.modalService.open(this.mymodal);
    if(this.product?.id){
      this.GetProductByID(this.product.id);
      this.title = "Редагування продукту";
    }
    this.GetAuthors();
    this.GetGenres();
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

  GetAuthors():void{
    this.productService.GetAuthors().subscribe(data =>{
      this.authors = data;
  })
  }

  GetGenres():void{
    this.productService.GetGenres().subscribe(data =>{
      this.genres = data;
  })
  }

  SaveProduct():void {
    let formData = new FormData();
    formData.append('id', this.product?.id as string ?? Guid.EMPTY);
    formData.append('name', this.EditObj.controls['name'].value);
    formData.append('price', this.EditObj.controls['price'].value);
    formData.append('description', this.EditObj.controls['description'].value);
    formData.append('genre', this.EditObj.controls['genre'].value);
    formData.append('author', this.EditObj.controls['author'].value);
    formData.append('photoID', this.product?.photoID as string ?? Guid.create());
    formData.append('file', this.selectedFile as Blob);
    this.productService.SaveProduct(formData).subscribe(data =>{
      console.log('success')
    });
  }

  onFileSelected(event: any):void{
    this.selectedFile = event.target.files[0];
    let el = document.getElementById("productPhoto");
    this.photoSrc = URL.createObjectURL(this.selectedFile as Blob);
  }
  
  GetProductByID(id:string){
    this.productService.GetProductByID(id).subscribe(data =>{
      this.product = data;
      this.EditObj.controls['id'].setValue(this.product?.id);
      this.EditObj.controls['name'].setValue(this.product?.name);
      this.EditObj.controls['price'].setValue(this.product?.price);
      this.EditObj.controls['description'].setValue(this.product?.description);
      this.EditObj.controls['genre'].setValue(this.product?.genreID);
      this.EditObj.controls['author'].setValue(this.product?.authorID);
      this.photoSrc = "data:image/jpg;base64, " + this.product?.photoStr;
  });
  }
}

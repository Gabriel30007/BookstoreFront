import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../_services/user.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  user?: User;
  errorMsg?: string;
  closeResult?:any;
  EditObj: FormGroup;
  @ViewChild('mymodal', {static: false}) mymodal!: TemplateRef<any>;
  
  @Output()
  OnConfirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private modalService:NgbModal, private userService: UserService){
   
    this.EditObj = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      roles: new FormControl('')
      
    });
  }

  ngAfterViewInit(): void {
    this.modalService.open(this.mymodal);
    if(this.user?.id)
      this.GetUserEdit(this.user?.id);
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

  CreateUser():void{
    this.userService.saveUser('00000000-0000-0000-0000-000000000000',
    this.EditObj.controls['name'].value,
    this.EditObj.controls['email'].value,
    this.EditObj.controls['password'].value,
    'ROLE_USER').subscribe({
      next: data => {
        this.OnConfirmation.emit();
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

  GetUserEdit(id:any):void{ 
    this.userService.getUserByID(id).subscribe({
      next: data => {
        this.user = JSON.parse(data);
        this.EditObj.controls['id'].setValue(this.user?.id);
        this.EditObj.controls['name'].setValue(this.user?.name);
        this.EditObj.controls['email'].setValue(this.user?.email);
        this.EditObj.controls['password'].setValue(this.user?.password);
        this.EditObj.controls['roles'].setValue(this.user?.roles);
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

  EditUser(){
   this.userService.saveUser(
      this.EditObj.controls['id'].value,
      this.EditObj.controls['name'].value,
      this.EditObj.controls['email'].value,
      this.EditObj.controls['password'].value,
      this.EditObj.controls['roles'].value,
    ).subscribe({
      next: data => {
        this.OnConfirmation.emit();
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

  Save(){
    if(this.user?.id){
      this.EditUser()
    }else{
      this.CreateUser()
    }
  }
}

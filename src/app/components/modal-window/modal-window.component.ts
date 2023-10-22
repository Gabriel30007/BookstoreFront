import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, inject, Injectable,AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {  OnInit, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { BoardAdminComponent } from '../board-admin/board-admin.component';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {
  closeResult?:any;
 // @ViewChild('mymodal') mymodal?: Element;
  obj?:any;


  constructor(public activeModal: NgbActiveModal, private ngZone: NgZone) { }

  ngOnInit() {
   console.log("test");
  }

  //constructor(public modalService:NgbModal){
  //  console.log("test");
  //}

   

   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return  `with: ${reason}`;
     }
   }
   public CloseWindow(content:any){
      this.activeModal.close();
   }
}



import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })

export class Product {
    id? : string;
    creadon?: Date;
    name?: string;
    price?: number;
    description?: string;
    photoID? : string;
  
    constructor() {
      this.id ="1";
      this.creadon = new Date();
      this.price = 0;
      this.name = "";
      this.description = "";
      this.photoID = "";
    }
  }

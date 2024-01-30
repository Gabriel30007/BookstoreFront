import { Component,OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Sort, MatSortModule} from '@angular/material/sort';
import { BucketService } from 'src/app/_services/bucket.service';
import { Bucket } from 'src/app/models/bucket.model';
import { StorageService } from 'src/app/_services/storage.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent {
  displayedColumns: string[] = ['productPhoto', 'productName', 'createdOn', 'price'];

  content?: any[];
  constructor(private _liveAnnouncer: LiveAnnouncer, private bucketService: BucketService, private storageService: StorageService) {}

  ngOnInit() {
    this.GetBucketInformation();
  }
  sortData(sort: Sort) {
    const data = this.content;
    if (!sort.active || sort.direction === '') {
      this.content = this.content;
      return;
    }

    this.content = data?.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'productName':
          return compare(a.productName, b.productName, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'createdOn':
          return compare(a.createdOn, b.createdOn, isAsc);
        case 'authorName':
          return compare(a.authorName, b.authorName, isAsc);
        default:
          return 0;
      }
    });
  }




  GetBucketInformation(){
    this.bucketService.GetProducts(this.storageService.getUserID()).subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = err;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
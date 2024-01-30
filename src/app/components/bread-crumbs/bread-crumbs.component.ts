import { Component, OnInit , Input,OnChanges, SimpleChange} from '@angular/core';
import { Guid } from "guid-typescript";
@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.css']
})
export class BreadCrumbsComponent {
  @Input() item : any; 
  breabCrumbsItems : Set<string> = new Set<string>();

  ngOnInit() {
    console.log(typeof this.item);
  }

  ngOnChanges(changes: any) {
    this.breabCrumbsItems?.add("/home");
    if(typeof changes.item?.currentValue == 'string'){
      this.breabCrumbsItems?.add(changes.item.currentValue);
    }
    if(changes.id){
      this.breabCrumbsItems?.add("/product");
      this.breabCrumbsItems?.add("/product/"+changes.id);
    }
  }

  GetBreadCrumbNameByItem(val: any): string{
    if(val.includes("/product/") && Guid.isGuid(val.slice(9,val.length))){
      return this.item.name;
    }else if(val == "/home"){
      return "Головна";
    }
    else if(val == "/product"){
      return "Каталог";
    }
    return "";
  }
}

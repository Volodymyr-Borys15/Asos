import { Pipe, PipeTransform } from '@angular/core';
import { ISales } from '../interfaces/sales';

@Pipe({
  name: 'salePipe'
})
export class SalePipePipe implements PipeTransform {

  transform(sales:Array<ISales>, color?:string,price?:number,brand?:string,style?:string): Array<ISales> {
    if(color){
      sales = sales.filter(col=>col.color === color);
    }

    if(price){
      sales = sales.filter(pr=>pr.price >= price)
    }
    if(brand){
      sales = sales.filter(br=>br.brand === brand);
    }
    if(style){
      sales = sales.filter(br=>br.style === style);
    }

    return sales
  }

}

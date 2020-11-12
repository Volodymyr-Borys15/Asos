import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Pipe({
  name: 'regularPipe'
})
export class RegularPipePipe implements PipeTransform {

  transform(product:Array<IProduct>, color?:string,price?:number,brand?:string,style?:string): Array<IProduct> {
    if(color){
      product = product.filter(col=>col.color === color);
    }
    if(price){
      product = product.filter(pr=>pr.price >= price)
    }
    if(brand){
      product = product.filter(br=>br.brand === brand);
    }
    if(style){
      product = product.filter(br=>br.style === style);
    }

    return product
  }

}

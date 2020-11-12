import { Pipe, PipeTransform } from '@angular/core';
import { INew } from '../interfaces/new-product';

@Pipe({
  name: 'newPipe'
})
export class NewPipePipe implements PipeTransform {

  transform(newPrd:Array<INew>, color?:string,price?:number,brand?:string,style?:string): Array<INew> {
    if(color){
      newPrd = newPrd.filter(col=>col.color === color);
    }

    if(price){
      newPrd = newPrd.filter(pr=>pr.price >= price)
    }
    if(brand){
      newPrd = newPrd.filter(br=>br.brand === brand);
    }
    if(style){
      newPrd = newPrd.filter(br=>br.style === style);
    }

    return newPrd
  }

}

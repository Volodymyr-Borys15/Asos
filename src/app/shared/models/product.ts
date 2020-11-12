import { IProduct } from "../interfaces/product";

export class Product implements IProduct{
    constructor(
       public id:number,
       public type:string,
       public gender:string,
       public category:string,
       public style:string,
       public name:string,
       public brand:string,
       public price:number,
       public description:string,
       public count:number,
       public color:string,
       public firstSize:string,
       public secondSize?:string,
       public thirdSize?:string,
       public fourthSize?:string,
       public image?:string,
       public date?:object,
       public orderSize?:string
       
    ){}
}
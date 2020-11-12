import { IOrder } from "../interfaces/orders";

export class Order implements IOrder{
    constructor(
       public id:number,
       public name:string,
       public orderDetails:Array<any>,
       public totalPayment:number,
       public userName:string,
       public userEmail:string,
       public date:object
    ){}
}
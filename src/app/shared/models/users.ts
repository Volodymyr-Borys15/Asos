import { IUser } from "../interfaces/users";
import { IOrder } from '../interfaces/orders';

export class User implements IUser{
    constructor(
        public id:number,
        public name:string,
        public email:string,
        public password:string,
        public role:string,
        public date?:object,
        public orders?:Array<IOrder>,
        public country?:string,
        public city?:string,
        public street?:string,
        public house?:string,
        public phone?:string,
        public card?:string,
    ){}
}
import { IOrder } from './orders';

export interface IUser{
    id:number;
    name:string;
    email:string;
    password:string;
    role:string;
    date?:object;
    orders?:Array<IOrder>;
    country?:string;
    city?:string;
    street?:string;
    house?:string;
    phone?:string;
    card?:string;
}
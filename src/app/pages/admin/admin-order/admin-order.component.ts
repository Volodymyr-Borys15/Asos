import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

  myOrder:Array<any>=[];
  orderDetails:Array<any>=[];

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe(data=>{
      this.myOrder = data;
    })
  }

}

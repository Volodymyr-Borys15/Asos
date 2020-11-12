import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { IOrder } from 'src/app/shared/interfaces/orders';
import { Order } from 'src/app/shared/models/orders';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  order: Array<any> = [];
  totalPrice: number;

  orderID: number = 1;

  btnVis = true;

  reserveOrder: Array<any> = [];

  constructor(private orderService: OrderService,
    private productService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getLocaleBasket();
    this.getBtnVis()
    this.uuid();
    if (localStorage.length > 0 && localStorage.getItem('orderName')) {
      this.reserveOrder = JSON.parse(localStorage.getItem('orderName'));
    }
  }

  private getBtnVis(): void {
    if (localStorage.getItem('btn')) {
      this.btnVis = JSON.parse(localStorage.getItem('btn'))
    }
    else {
      this.btnVis = true;
    }
  }

  private getLocaleBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('product')) {
      this.order = JSON.parse(localStorage.getItem('product'));
    }
    this.getTotal();
  }

  productCount(product, status: boolean) {
    if (status) {
      product.count++;
    } else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.getTotal();
  }

  private getTotal(): void {
    this.totalPrice = this.order.reduce((total, current) => {
      return total + (current.price * current.count);
    }, 0);
  }

  deleteProduct(order): void {
    const index = this.order.findIndex(prod => prod.id === order.id);
    this.order.splice(index, 1);
    this.getTotal();
    this.updateLocalProduct();
    this.orderService.basket.next(this.order);
    localStorage.setItem('favor', JSON.stringify([]));
  }

  private updateLocalProduct(): void {
    localStorage.setItem('product', JSON.stringify(this.order));
  }

  addOrder(): void {
   this.updateLocalProduct();
  }

  addToOrder(): void {
    this.updateLocalProduct();
    this.router.navigate(['/login'])
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }





}
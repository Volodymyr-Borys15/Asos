import { Component, OnInit, ViewChild } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/orders';
import { IUser } from 'src/app/shared/interfaces/users';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { RouteGuardsService } from 'src/app/shared/services/route-guards.service';
import { Order } from 'src/app/shared/models/orders';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('userForm') public orderForm: NgForm;

  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cardMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]

  vision: number;

  currentUser: Array<IUser> = [];
  currentOrder: Array<any> = [];

  finalDeal: IUser;
  finalOrder: IUser;

  orderHistory: Array<any> = [];

  newUser: IUser = {
    id: 1,
    name: '',
    email: '',
    password: '',
    role: '',
  }
  
  closeThis: boolean = true;
  orderInfo: Array<any>;
  orderInfoName: string;

  totalPrice: number = 0;
  date:object = new Date();

  private subscriptionUser: Subscription;
  canDeactivate: any;
  
  showInfo:boolean;

  constructor(private orderService: OrderService,
    private userSerice: UserService,
    private router: Router,
    private serviceProduct: ProductsService,
  ) { }

  ngOnInit(): void {
    this.getLocaleVision();
    this.getCurrentUser();
    this.getUserHistory();
    this.getLocaleBasket();
  }

  private getLocaleBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('product')) {
      this.currentOrder = JSON.parse(localStorage.getItem('product'));
    }
    this.getTotal();
  }
  private getTotal(): void {
    this.totalPrice = this.currentOrder.reduce((total, current) => {
      return total + (current.price * current.count);
    }, 0);
  }
  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

 
  getCurrentUser(): void {
    this.subscriptionUser = this.userSerice.getMyUsers().subscribe(data => {
      this.currentUser = data.slice(-1);
    })
    setTimeout(() => {
      if (localStorage.getItem('userHistory')) {
        this.orderInfoName = JSON.parse(localStorage.getItem('userHistory'))[0].name;
      }
    }, 2000)

  }

  getLocaleVision(): void {
    setTimeout(() => {
      this.vision = JSON.parse(localStorage.getItem('vision'));
      this.closeThis = false;
    }, 2000)

  }

  getUserHistory(): void {

    setTimeout(() => {
      const orderInfo = [];
      if (localStorage.getItem('userHistory')) {
        this.orderHistory = JSON.parse(localStorage.getItem('userHistory'));
        this.orderHistory.filter(data => {
          if (!data.orders) { console.log('ok') }
          else {
            data.orders.forEach(value => {
              orderInfo.push(value);
            })
          }

        })
        this.orderInfo = orderInfo;
        console.log(this.orderHistory)
      }
    }, 2000)

  }

  dealIsDone(): void {

    this.newUser.id = this.currentUser[0].id;
    this.newUser.name = this.currentUser[0].name;
    this.newUser.email = this.currentUser[0].email;
    this.newUser.password = this.currentUser[0].password;
    this.newUser.role = this.currentUser[0].role;

    this.currentUser[0].orders = this.currentOrder;
    this.currentUser[0].country = this.newUser.country;
    this.currentUser[0].city = this.newUser.city;
    this.currentUser[0].street = this.newUser.street;
    this.currentUser[0].house = this.newUser.house;
    this.currentUser[0].phone = this.newUser.phone;
    this.currentUser[0].card = this.newUser.card;

    this.finalDeal = this.currentUser[0];
  
    this.userSerice.updateUser(this.finalDeal).subscribe(data => {
      // console.log(data);
    });
   
    const newOrder: IOrder = new Order(1,
      this.uuid(),
      this.currentOrder,
      this.totalPrice,
      this.newUser.name,
      this.newUser.email,
      this.date
    );

    if (this.orderService.getMyOrders().subscribe(data => {
      data.length > 0
    })) {
      newOrder.id = +this.orderService.getMyOrders().subscribe(data => {
        data.slice(-1)[0].id + 1;
      })
    }

    this.currentOrder = [];
    localStorage.setItem('product', JSON.stringify(this.currentOrder));
    localStorage.setItem('favor', JSON.stringify(this.currentOrder));
    this.orderService.basket.next(this.currentOrder);

    this.orderService.addMyOrder(newOrder).subscribe(() => {
      this.getLocaleBasket();
    });
   
    this.currentOrder = [];
    this.currentUser = [];
    this.vision = 3;
    localStorage.clear();
    this.serviceProduct.showMe.next(false);
    
    this.newUser.country ="";
    this.newUser.city ="";
    this.newUser.street ="";
    this.newUser.house ="";
    this.newUser.phone ="";
    this.newUser.card ="";
  }


  addNewDeal(): void {

    this.userSerice.getMyUsers().subscribe(data => {
      data.forEach((value, index) => {
        if (this.orderHistory[0].name == value.name) {
          this.currentOrder.forEach(value => {
            this.orderHistory[0].orders.push(value);
          });
        
          this.finalOrder = this.orderHistory[0];
          this.userSerice.updateUser(this.finalOrder).subscribe(data => {
            /*   console.log('ok'); */
          });
          
          const newOrder: IOrder = new Order(1,
            this.uuid(),
            this.currentOrder,
            this.totalPrice,
            this.finalOrder.name,
            this.finalOrder.email,
            this.date
          );

          if (this.orderService.getMyOrders().subscribe(data => {
            data.length > 0
          })) {
            newOrder.id = +this.orderService.getMyOrders().subscribe(data => {
              data.slice(-1)[0].id + 1;
            })
          }

          this.currentOrder = [];
          localStorage.setItem('product', JSON.stringify(this.currentOrder));
          localStorage.setItem('favor', JSON.stringify(this.currentOrder));
          this.orderService.basket.next(this.currentOrder);

          this.orderService.addMyOrder(newOrder).subscribe(() => {
            this.getLocaleBasket();
          });
         
          this.currentOrder = [];
          this.currentUser = [];
          this.vision = 3;
          localStorage.clear()
          this.serviceProduct.showMe.next(false);
          this.newUser.country ="";
          this.newUser.city ="";
          this.newUser.street ="";
          this.newUser.house ="";
          this.newUser.phone ="";
          this.newUser.card ="";
        }
      });
    });
  }

  logout(): void {
    this.currentOrder = [];
    this.currentUser = [];
    localStorage.clear();
    this.router.navigate(['/men']);
    this.serviceProduct.showMe.next(false)
  }
  adminLogout(): void {
    this.currentOrder = [];
    this.currentUser = [];
    localStorage.clear();
    this.router.navigate(['/men']);
    this.serviceProduct.showMe.next(false)
  }

  changeInfo():void{
    this.showInfo = !this.showInfo;
    this.newUser.country = this.orderHistory[0].country;
    this.newUser.city = this.orderHistory[0].city;
    this.newUser.street = this.orderHistory[0].street;
    this.newUser.house = this.orderHistory[0].house;
    this.newUser.phone = this.orderHistory[0].phone;
    this.newUser.card = this.orderHistory[0].card;
  }
  saveInfo():void{
    this.orderHistory[0].country = this.newUser.country;
    this.orderHistory[0].city = this.newUser.city;
    this.orderHistory[0].street = this.newUser.street;
    this.orderHistory[0].house = this.newUser.house;
    this.orderHistory[0].phone = this.newUser.phone;
    this.orderHistory[0].card = this.newUser.card;
    
    this.finalDeal = this.orderHistory[0];
  
    this.userSerice.updateUser(this.finalDeal).subscribe(data => {
      // console.log(data);
    });
    this.newUser.country ="";
    this.newUser.city ="";
    this.newUser.street ="";
    this.newUser.house ="";
    this.newUser.phone ="";
    this.newUser.card ="";
  
    this.showInfo = false;
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
  }


}

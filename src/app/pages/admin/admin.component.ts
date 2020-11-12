import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { IUser } from 'src/app/shared/interfaces/users';
import { User } from 'src/app/shared/models/users';
import { OrderService } from 'src/app/shared/services/order.service';
import { IOrder } from 'src/app/shared/interfaces/orders';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  activeBtn: boolean;
  disabledBtn: boolean = true;
  activeForm: boolean;

  users: Array<IUser> = [];

  profile: Array<any> = []

  newUser: IUser = {
    id: 1,
    name: '',
    email: '',
    password: '',
    role: 'user',
    date:new Date(),
    orders: []
  }
  registeredUser: IUser = {
    id: 1,
    name: '',
    email: '',
    password: '',
    role: ''
  }

  registeredEmail: boolean;
  notCorrectForm:boolean;

  constructor(private userSerice: UserService,
    private router: Router,
    private productService: ProductsService
  ) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userSerice.getMyUsers().subscribe(data => {
      this.users = data;
    })
  }


  showJoin(): void {
    this.activeBtn = true;
    this.activeForm = true;
    this.registeredUser.email = '';
    this.registeredUser.password = '';
  }
  showSign(): void {
    this.activeBtn = false;
    this.activeForm = false;
    this.newUser.name = '';
    this.newUser.email = '';
    this.newUser.password = '';
  }

  addUser(): void {

    this.userSerice.getMyUsers().subscribe(data => {
      const a = data.some(data => {
        return data.email == this.newUser.email
      })
      if (a == true) {
        this.registeredEmail = true;
      }
      else {
        if (this.userSerice.getMyUsers().subscribe(data => {
          data.length > 0
        })) {
          this.newUser.id = +this.userSerice.getMyUsers().subscribe(data => {
            data.slice(-1)[0].id + 1;
          })
        }
        this.userSerice.addMyUser(this.newUser).subscribe(() => {
          this.getUsers();
        });
        localStorage.setItem('vision', JSON.stringify('1'));
        this.router.navigate(['/login']);
        this.productService.showMe.next(true);
        localStorage.setItem('btn', JSON.stringify(false));
        localStorage.setItem('showMe', JSON.stringify(true));
      }
    })

  }

  signIn(): void {

    this.userSerice.getMyUsers().subscribe(data => {
      data.forEach((value, index) => {
        if (this.registeredUser.email == 'admin@gmail.com' && this.registeredUser.password == '1111111') {
          localStorage.setItem('vision', JSON.stringify('4'));
          this.router.navigate(['/login']);
          this.productService.showMe.next(true);
          localStorage.setItem('btn', JSON.stringify(false));
          localStorage.setItem('showMe', JSON.stringify(true));
        }
        else if (value.email == this.registeredUser.email && value.password == this.registeredUser.password) {
          this.profile = data.splice(index, 1);
          localStorage.setItem('userHistory', JSON.stringify(this.profile))
          localStorage.setItem('vision', JSON.stringify('2'));
          this.router.navigate(['/login'])
          this.productService.showMe.next(true);
          localStorage.setItem('btn', JSON.stringify(false));
          localStorage.setItem('showMe', JSON.stringify(true));
        }
        else if (value.email != this.registeredUser.email || value.password != this.registeredUser.password) {
          setTimeout(()=>{
            this.notCorrectForm = true
            setTimeout(()=>{
              this.notCorrectForm = false;
            },2000)
          })
        }
      })
    });
  }

}
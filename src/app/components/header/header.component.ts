import { Component, OnInit,HostListener, ElementRef, Renderer2 } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { SaleService } from 'src/app/shared/services/sale.service';
import { NewProductsService } from 'src/app/shared/services/new-products.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router,NavigationEnd,Event, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMe:boolean;

  activeStatus:boolean;

  salesCategory:Array<any> = []; 
  newCategory:Array<any> = [];
  styleClothing:Array<any> = [];
  styleShoes:Array<any> = [];
  styleAccessories:Array<any> = [];
  brandsMen:Array<any> = [];

  womenSalesCategory:Array<any> = [];
  womenClothingStyle:Array<any> = [];
  womenShoesStyle:Array<any> = [];
  womenAccessoriesStyle:Array<any> = [];
  womenBrands:Array<any> = [];

  toggleActive:boolean;
  
  preBag:boolean;
  subOrder:Array<any> = [];

  constructor(private orderService:OrderService,
              private saleService:SaleService,
              private serviceNew:NewProductsService,
              private serviceProduct:ProductsService,
              private router:Router,
              private el: ElementRef,
              private renderer: Renderer2
              
              ) {
                this.router.events.subscribe((event:Event)=>{
                  if(event instanceof NavigationStart){
                    this.toggleActive = false;
                    this.preBag = false;
                  }
                })
               }
           

  ngOnInit(): void {
    this.getSalesCategory();
    this.getNewCategory();
    this.getStyleClothing();
    this.getStyleShoes();
    this.getStyleAccessories();
    this.getMenBrands();
    this.getWomenSalesCategory();
    this.getWomenClothingStyle();
    this.getWomenShoesStyle();
    this.getWomenAccessoriesStyle();
    this.getWomenBrands();
    this.serviceProduct.showMe.subscribe(data=>{
      this.showMe = data;
    });
    this.showMe = JSON.parse(localStorage.getItem('showMe'));
    this.activeStatus = JSON.parse(localStorage.getItem('activeStatus'));
    
    this.orderService.basket.subscribe(data=>{
      this.subOrder = data;
    })
    if (localStorage.length > 0 && localStorage.getItem('product')) {
      this.subOrder = JSON.parse(localStorage.getItem('product'));
    }
    this.orderService.bag.subscribe(data=>{
      this.preBag = data;
      setTimeout(()=>{
        this.preBag = false;
      },3000)
    })
  }

  activeWomen():void{
    this.activeStatus = true;
    localStorage.setItem('activeStatus',JSON.stringify(true))
  }
  activeMen():void{
    this.activeStatus = false;
    localStorage.setItem('activeStatus',JSON.stringify(false))
  }

  getSalesCategory():void{
    this.saleService.getMySales().subscribe(data=>{
      let saleCategoriesArr = data.filter(category=>{
       return category.gender == 'male'
      });
      const categories = [];
      saleCategoriesArr.forEach(value=>{
        if(categories.find(t=>t == value.category)){}
        else{categories.push(value.category)}
        this.salesCategory = categories;
      });
    });

  }
  getNewCategory():void{
    this.serviceNew.getMyNew().subscribe(data=>{
      let newCategoriesArr = data.filter(category=>{
       return category.gender == 'male'
      });
      const categories = [];
      newCategoriesArr.forEach(value=>{
        if(categories.find(t=>t == value.category)){}
        else{categories.push(value.category)}
        this.newCategory = categories;
      });
    });
  }
  getStyleClothing():void{
    this.serviceProduct.getMyProduct().subscribe(data=>{
      let styleClothingArr = data.filter(info=>{
       return info.gender == 'male' && info.category == 'clothing' && info.type == 'regular'
      });
      const styles = [];
      styleClothingArr.forEach(value=>{
        if(styles.find(t=>t == value.style)){}
        else{styles.push(value.style)}
        this.styleClothing = styles;
      });
    });
  }
  getStyleShoes():void{
    this.serviceProduct.getMyProduct().subscribe(data=>{
      let styleShoesArr = data.filter(info=>{
       return info.gender == 'male' && info.category == 'shoes' && info.type == 'regular'
      });
      const styles = [];
      styleShoesArr.forEach(value=>{
        if(styles.find(t=>t == value.style)){}
        else{styles.push(value.style)}
        this.styleShoes = styles;
      });
    });
  }
  getStyleAccessories():void{
    this.serviceProduct.getMyProduct().subscribe(data=>{
      let styleAccArr = data.filter(info=>{
       return info.gender == 'male' && info.category == 'accessories' && info.type == 'regular'
      });
      const styles = [];
      styleAccArr.forEach(value=>{
        if(styles.find(t=>t == value.style)){}
        else{styles.push(value.style)}
        this.styleAccessories = styles;
      });
    });
  }
  getMenBrands():void{
    this.brandsMen = this.serviceProduct.getMenBrands();
  }

getWomenSalesCategory():void{
  this.saleService.getMySales().subscribe(data=>{
    let saleCategoriesArr = data.filter(category=>{
     return category.gender == 'female'
    });
    const categories = [];
    saleCategoriesArr.forEach(value=>{
      if(categories.find(t=>t == value.category)){}
      else{categories.push(value.category)}
      this.womenSalesCategory = categories;
    });
  });
}
getWomenClothingStyle():void{
  this.serviceProduct.getMyProduct().subscribe(data=>{
    let styleClothingArr = data.filter(info=>{
     return info.gender == 'female' && info.category == 'clothing' && info.type == 'regular'
    });
    const styles = [];
    styleClothingArr.forEach(value=>{
      if(styles.find(t=>t == value.style)){}
      else{styles.push(value.style)}
      this.womenClothingStyle = styles;
    });
  });
}
getWomenShoesStyle():void{
  this.serviceProduct.getMyProduct().subscribe(data=>{
    let styleShoesArr = data.filter(info=>{
     return info.gender == 'female' && info.category == 'shoes' && info.type == 'regular'
    });
    const styles = [];
    styleShoesArr.forEach(value=>{
      if(styles.find(t=>t == value.style)){}
      else{styles.push(value.style)}
      this.womenShoesStyle = styles;
    });
  });
}
getWomenAccessoriesStyle():void{
  this.serviceProduct.getMyProduct().subscribe(data=>{
    let styleAccArr = data.filter(info=>{
     return info.gender == 'female' && info.category == 'accessories' && info.type == 'regular'
    });
    const styles = [];
    styleAccArr.forEach(value=>{
      if(styles.find(t=>t == value.style)){}
      else{styles.push(value.style)}
      this.womenAccessoriesStyle = styles;
    });
  });
}
getWomenBrands():void{
  this.womenBrands = this.serviceProduct.getWomenBrands();
}

navToggle():void{
  this.toggleActive = !this.toggleActive
}

//@HostListener('mouseover') 
over() {
  this.preBag = true;
   /*  let part = this.el.nativeElement.querySelector('.pre-bag');
    this.renderer.setStyle(part, 'display', 'block'); */
}
//@HostListener('mouseout') 
out() {
  this.preBag = false;
    /* let part = this.el.nativeElement.querySelector('.pre-bag');
    this.renderer.setStyle(part, 'display', 'none'); */
}
deleteProduct(order):void{
  const index = this.subOrder.findIndex(prod => prod.id === order.id);
    this.subOrder.splice(index, 1);
    this.updateLocalProduct();
    this.orderService.basket.next(this.subOrder);
}
private updateLocalProduct(): void {
  localStorage.setItem('product', JSON.stringify(this.subOrder));
}

viewBag():void{
  this.router.navigate(['/basket']);
}

}

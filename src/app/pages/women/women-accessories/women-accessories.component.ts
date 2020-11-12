import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-women-accessories',
  templateUrl: './women-accessories.component.html',
  styleUrls: ['./women-accessories.component.scss']
})
export class WomenAccessoriesComponent implements OnInit {

  accessories:Array<IProduct> = [];
  currentPage = 8;

  color:string;
  colors:Array<any>=[];

  price:number;
 
  brand:string;
  brands:Array<any>=[];

  style:string
  styles:Array<any>=[];

  favorLocale:Array<any> = [];
  activeGreen:string;

  private subscription:Subscription;

  pagcol: string = '';
  pagbrnd: string = '';
  pagstyle: string = '';
  pagprc: string = '';

  constructor(private serviceProduct:ProductsService,
              private Element:ElementRef,
              private renderer:Renderer2) { }

  ngOnInit(): void {
    this.getAccessories();
    this.activeGreen = '';
    this.getAllColors();
    this.getAllBrands();
    this.getAllStyles();
  }

  private getAccessories(): void {
    this.subscription = this.serviceProduct.getWomenAccessoriesPagin(this.currentPage).subscribe((data) => {
      this.accessories = data.filter(product => product.type == 'regular' && product.gender == 'female' && product.category == 'accessories');
    },
      err => {
        console.log(err);
      })
  }

  getAllColors(): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let prodColorsArr = data.filter(style => {
        return style.gender == 'female'&&style.category == 'accessories';
      });
      const colors = [];
      prodColorsArr.forEach(value => {
        if (colors.find(t => t == value.color)) { }
        else { colors.push(value.color) }
        this.colors = colors;
      });
    });
  }

  getAllBrands(): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let prodBrandsArr = data.filter(style => {
        return style.gender == 'female'&&style.category == 'accessories';
      });
      const brands = [];
      prodBrandsArr.forEach(value => {
        if (brands.find(t => t == value.brand)) { }
        else { brands.push(value.brand) }
        this.brands = brands;
      });
    });
  }

  getAllStyles(): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let shoesStylesArr = data.filter(style => {
        return style.gender == 'female'&&style.category == 'accessories';
      });
      const styles = [];
      shoesStylesArr.forEach(value => {
        if (styles.find(t => t == value.style)) { }
        else { styles.push(value.style) }
        this.styles = styles;
      });
    });
  }

  showmore():void{
    this.currentPage+=8;
    this.getAccessories();
  }

   addFavor(favor,event):void{
    if(localStorage.length>0 && localStorage.getItem('favor')){
     this.favorLocale = JSON.parse(localStorage.getItem('favor'))
     this.favorLocale.push(favor);
     localStorage.setItem('favor',JSON.stringify(this.favorLocale))
    }
    else{
       this.favorLocale.push(favor);
       localStorage.setItem('favor',JSON.stringify(this.favorLocale))
    }
    this.renderer.setStyle(event.target,'backgroundColor','green')
    this.renderer.setStyle(event.target,'borderColor','green');
   }

   filterColors(event): void {
    this.pagcol = event.target.value;
    if (this.pagcol) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessories = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='accessories';
        })
      })
    }
    else {
      this.getAccessories();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessories = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='accessories';
        })
      })
    }
  }

  filterBrands(event): void {
    this.pagbrnd = event.target.value;
    if (this.pagbrnd) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessories = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='accessories';
        })
      })
    }
    else {
      this.getAccessories();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessories = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='accessories';
        })
      })
    }
  }

  filterStyle(event): void {
    this.pagstyle = event.target.value;
    if (this.pagstyle) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessories = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='accessories';
        })
      })
    }
    else {
      this.getAccessories();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessories = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='accessories';
        })
      })
    }
  }

  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessories = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='accessories';
        })
      })
    }
    else {
      this.getAccessories();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessories = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='accessories';
        })
      })
    }
  }


   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

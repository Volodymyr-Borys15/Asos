import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute, Router,Event,NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-women-a-z-brands',
  templateUrl: './women-a-z-brands.component.html',
  styleUrls: ['./women-a-z-brands.component.scss']
})
export class WomenAZBrandsComponent implements OnInit {

  brands: Array<IProduct> = [];
  pageCurrent = 8;

  color:string;
  colors:Array<any>=[];

  price:number;
 
  brand:string;
  ofBrands:Array<any>=[];

  style:string
  styles:Array<any>=[];

  favorLocale:Array<any> = [];
  activeGreen:string;

  private subscription:Subscription;

  pagcol: string = '';
  pagbrnd: string = '';
  pagstyle: string = '';
  pagprc: string = '';

  constructor(private serviceProduct: ProductsService,
              private Element:ElementRef,
              private renderer:Renderer2) { }

  ngOnInit(): void {
      this.getBrands();
      this.activeGreen = '';
      this.getAllColors();
      this.getAllBrands();
      this.getAllStyles();
  }

  private getBrands(): void {
      this.subscription = this.serviceProduct.getWomenBrandsPagin(this.pageCurrent).subscribe(data=>{
      this.brands = data;
   }
    ,
      err => {
        console.log(err);
      })
  }

  getAllColors(): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let prodColorsArr = data.filter(style => {
        return style.gender == 'female';
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
        return style.gender == 'female' && style.type == 'regular';
      });
      const brands = [];
      prodBrandsArr.forEach(value => {
        if (brands.find(t => t == value.brand)) { }
        else { brands.push(value.brand) }
        this.ofBrands = brands;
      });
    });
  }

  getAllStyles(): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let shoesStylesArr = data.filter(style => {
        return style.gender == 'female' && style.type == 'regular';
      });
      const styles = [];
      shoesStylesArr.forEach(value => {
        if (styles.find(t => t == value.style)) { }
        else { styles.push(value.style) }
        this.styles = styles;
      });
    });
  }

  showmore(): void {
    this.pageCurrent += 8;
    this.getBrands();
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
        this.brands = data.filter(prod => {
          return prod.gender === 'female' && prod.type == 'regular';
        })
      })
    }
    else {
      this.getBrands();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.brands = data.filter(prod => {
          return prod.gender === 'female' && prod.type == 'regular';
        })
      })
    }
  }

  filterBrands(event): void {
    this.pagbrnd = event.target.value;
    if (this.pagbrnd) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.brands = data.filter(prod => {
          return prod.gender === 'female' && prod.type == 'regular';
        })
      })
    }
    else {
      this.getBrands();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.brands = data.filter(prod => {
          return prod.gender === 'female' && prod.type == 'regular';
        })
      })
    }
  }

  filterStyle(event): void {
    this.pagstyle = event.target.value;
    if (this.pagstyle) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.brands = data.filter(prod => {
          return prod.gender === 'female' && prod.type == 'regular';
        })
      })
    }
    else {
        this.getBrands();
        this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
          this.brands = data.filter(prod => {
            return prod.gender === 'female' && prod.type == 'regular';
          })
        })   
    }
  }

  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.brands = data.filter(prod => {
          return prod.gender === 'female'&& prod.type == 'regular';
        })
      })
    }
    else {
      this.getBrands();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.brands = data.filter(prod => {
          return prod.gender === 'female' && prod.type == 'regular';
        })
      })
    }
  }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-women-shoes',
  templateUrl: './women-shoes.component.html',
  styleUrls: ['./women-shoes.component.scss']
})
export class WomenShoesComponent implements OnInit {

  shoes:Array<IProduct> = [];
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
    this.getShoes();
    this.activeGreen = '';
    this.getAllColors();
    this.getAllStyles();
    this.getAllBrands();
  }

  private getShoes(): void {
    this.subscription = this.serviceProduct.getWomenShoesPagin(this.currentPage).subscribe((data) => {
      this.shoes = data;
    },
      err => {
        console.log(err);
      })
  }

  getAllColors(): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let prodColorsArr = data.filter(style => {
        return style.gender == 'female'&&style.category == 'shoes';
      });
      const colors = [];
      prodColorsArr.forEach(value => {
        if (colors.find(t => t == value.color)) { }
        else { colors.push(value.color) }
        this.colors = colors;
      });
    });
  }

  getAllStyles(): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let shoesStylesArr = data.filter(style => {
        return style.gender == 'female'&&style.category == 'shoes';
      });
      const styles = [];
      shoesStylesArr.forEach(value => {
        if (styles.find(t => t == value.style)) { }
        else { styles.push(value.style) }
        this.styles = styles;
      });
    });
  }

  getAllBrands(): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let prodBrandsArr = data.filter(style => {
        return style.gender == 'female'&&style.category == 'shoes';
      });
      const brands = [];
      prodBrandsArr.forEach(value => {
        if (brands.find(t => t == value.brand)) { }
        else { brands.push(value.brand) }
        this.brands = brands;
      });
    });
  }

  showmore():void{
    this.currentPage+=8;
    this.getShoes();
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
        this.shoes = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='shoes';
        })
      })
    }
    else {
      this.getShoes();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.shoes = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='shoes';
        })
      })
    }
  }

  filterStyle(event): void {
    this.pagstyle = event.target.value;
    if (this.pagstyle) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.shoes = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='shoes';
        })
      })
    }
    else {
      this.getShoes();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.shoes = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='shoes';
        })
      })
    }
  }

  filterBrands(event): void {
    this.pagbrnd = event.target.value;
    if (this.pagbrnd) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.shoes = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='shoes';
        })
      })
    }
    else {
      this.getShoes();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.shoes = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='shoes';
        })
      })
    }
  }

  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.shoes = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='shoes';
        })
      })
    }
    else {
      this.getShoes();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.shoes = data.filter(prod => {
          return prod.gender === 'female'&&prod.category ==='shoes';
        })
      })
    }
  }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

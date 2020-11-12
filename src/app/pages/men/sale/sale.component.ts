import { Component, OnInit,ElementRef,Renderer2 } from '@angular/core';
import { ISales } from 'src/app/shared/interfaces/sales';
import { SaleService } from 'src/app/shared/services/sale.service';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  sales: Array<ISales> = [];
  
  totalRecord:number;
  pageCurrent = 8;

  color:string;
  colors:Array<any>=[];

  price:number;
 
  brand:string;
  brands:Array<any>=[];

  style:string
  styles:Array<any>=[]

  favorLocale:Array<any> = [];
  activeGreen:string;

  private subscription:Subscription;

  pagcol: string = '';
  pagbrnd: string = '';
  pagstyle: string = '';
  pagprc: string = '';

  constructor(private salesService: SaleService,
              private router:ActivatedRoute,
              private location:Location,
              private Element:ElementRef,
              private renderer:Renderer2
              ) { }

  ngOnInit(): void {
    this.getData();  
    this.activeGreen = '';
    this.getAllColors();
    this.getAllStyles();
    this.getAllBrands();
  }

  private getData(): void {
    this.subscription = this.salesService.getMySalesPag(this.pageCurrent).subscribe((data) => {
      this.sales = data.filter(product => product.type == 'sale' && product.gender == 'male');
    },
      err => {
        console.log(err);
      })
  }
 

  getAllColors(): void {
    this.salesService.getMySales().subscribe(data => {
      let salesColorsArr = data.filter(style => {
        return style.gender == 'male'
      });
      const colors = [];
      salesColorsArr.forEach(value => {
        if (colors.find(t => t == value.color)) { }
        else { colors.push(value.color) }
        this.colors = colors;
      });
    });
  }


  getAllStyles(): void {
    this.salesService.getMySales().subscribe(data => {
      let salesStylesArr = data.filter(style => {
        return style.gender == 'male'
      });
      const styles = [];
      salesStylesArr.forEach(value => {
        if (styles.find(t => t == value.style)) { }
        else { styles.push(value.style) }
        this.styles = styles;
      });
    });
  }
  
  getAllBrands(): void {
    this.salesService.getMySales().subscribe(data => {
      let newBrandsArr = data.filter(style => {
        return style.gender == 'male'
      });
      const brands = [];
      newBrandsArr.forEach(value => {
        if (brands.find(t => t == value.brand)) { }
        else { brands.push(value.brand) }
        this.brands = brands;
      });
    });
  }

  showmore():void{
    this.pageCurrent+=8;
    this.getData();
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
  /*  */
  filterColors(event): void {
    this.pagcol = event.target.value;
    if (this.pagcol) {
      this.pagprc = '0';
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
    else {
      this.getData();
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
  }

  filterStyle(event): void {
    this.pagstyle = event.target.value;
    if (this.pagstyle) {
      this.pagprc = '0';
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
    else {
      this.getData();
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
  }

  filterBrands(event): void {
    this.pagbrnd = event.target.value;
    if (this.pagbrnd) {
      this.pagprc = '0';
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
    else {
      this.getData();
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
  }

  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
    else {
      this.getData();
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
  }

  /*  */

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

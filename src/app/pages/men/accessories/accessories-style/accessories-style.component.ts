import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router,Event,NavigationEnd} from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accessories-style',
  templateUrl: './accessories-style.component.html',
  styleUrls: ['./accessories-style.component.scss']
})
export class AccessoriesStyleComponent implements OnInit {

  accessoriesStyle = [];
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

  routepage = this.activateRoute.snapshot.paramMap.get('style');

  private subscription:Subscription;

  pagcol: string = '';
  pagbrnd: string = '';
  pagstyle: string = '';
  pagprc: string = '';

  constructor(
              private activateRoute: ActivatedRoute,
              private router: Router,
              private serviceProduct:ProductsService,
              private Element:ElementRef,
              private renderer:Renderer2
  ) { 
    this.router.events.subscribe((event:Event)=>{
      if(event instanceof NavigationEnd){
        const currentStyle = this.activateRoute.snapshot.paramMap.get('style');
        this.routepage = this.activateRoute.snapshot.paramMap.get('style');
        this.currentPage = 8;
        this.getData(currentStyle);
        this.getAllColors(currentStyle);
        this.getAllBrands(currentStyle);
      }
    })


  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.getData();
    },2000)
    this.routepage;
    this.activeGreen = '';
    this.getAllColors();
    this.getAllBrands();
  }

  private getData(currentStyle?): void {
    currentStyle = this.activateRoute.snapshot.paramMap.get('style')
    this.subscription = this.serviceProduct.getMyProductStylePag(this.currentPage,currentStyle).subscribe((data) => {
      this.accessoriesStyle = data.filter(product => product.type == 'regular' && product.gender == 'male' && product.category == 'accessories' && product.style == `${currentStyle}`);
    },
      err => {
        console.log(err);
      })
      
  }

  getAllColors(currentCategory?): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let newColorsArr = data.filter(style => {
        return style.gender == 'male' && style.style == `${currentCategory}`;
      });
      const colors = [];
      newColorsArr.forEach(value => {
        if (colors.find(t => t == value.color)) { }
        else { colors.push(value.color) }
        this.colors = colors;
      });
    });
  }

  getAllBrands(currentCategory?): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let newBrandsArr = data.filter(style => {
        return style.gender == 'male' && style.style == `${currentCategory}`
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
    this.currentPage+=8;
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

   filterColors(event): void {
    this.pagcol = event.target.value;
    if (this.pagcol) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessoriesStyle = data.filter(prod => {
          return prod.gender === 'male' && prod.style == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessoriesStyle = data.filter(prod => {
          return prod.gender === 'male' && prod.style == this.routepage;
        })
      })
    }
  }

  filterBrands(event): void {
    this.pagbrnd = event.target.value;
    if (this.pagbrnd) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessoriesStyle = data.filter(prod => {
          return prod.gender === 'male' && prod.style == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessoriesStyle = data.filter(prod => {
          return prod.gender === 'male' && prod.style == this.routepage;
        })
      })
    }
  }

  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessoriesStyle = data.filter(prod => {
          return prod.gender === 'male' && prod.style == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.accessoriesStyle = data.filter(prod => {
          return prod.gender === 'male' && prod.style == this.routepage;
        })
      })
    }
  }
  
   ngOnDestroy(): void {
     this.subscription.unsubscribe();
   }

}

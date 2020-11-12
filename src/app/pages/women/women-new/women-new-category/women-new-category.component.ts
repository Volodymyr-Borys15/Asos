import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router,Event,NavigationEnd } from '@angular/router';
import { NewProductsService } from 'src/app/shared/services/new-products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-women-new-category',
  templateUrl: './women-new-category.component.html',
  styleUrls: ['./women-new-category.component.scss']
})
export class WomenNewCategoryComponent implements OnInit {

  productsNew = [];
  page = 8;

  routepage = this.activateRoute.snapshot.paramMap.get('category');

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

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private newProductService:NewProductsService,
    private Element:ElementRef,
    private renderer:Renderer2
  ) {
    this.router.events.subscribe((event:Event)=>{
      if(event instanceof NavigationEnd){
        const currentCategory = this.activateRoute.snapshot.paramMap.get('category');
        this.routepage = this.activateRoute.snapshot.paramMap.get('category');
        this.page = 8;
        this.getData(currentCategory);
        this.getAllBrands(currentCategory);
        this.getAllColors(currentCategory);
      }
    })

   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.getData();
    },2000)
    this.routepage;
    this.activeGreen = '';
    this.getAllBrands();
    this.getAllColors();
  }

  private getData(currentCategory?): void {
    currentCategory = this.activateRoute.snapshot.paramMap.get('category')
    this.subscription = this.newProductService.getWomenNewPaginCat(this.page,currentCategory).subscribe((data) => {
      this.productsNew = data;
    },
      err => {
        console.log(err);
      })
  }

  getAllBrands(currentCategory?): void {
    this.newProductService.getMyNew().subscribe(data => {
      let newBrandsArr = data.filter(style => {
        return style.gender == 'female' && style.category == `${currentCategory}`
      });
      const brands = [];
      newBrandsArr.forEach(value => {
        if (brands.find(t => t == value.brand)) { }
        else { brands.push(value.brand) }
        this.brands = brands;
      });
    });
  }

  getAllColors(currentCategory?): void {
    this.newProductService.getMyNew().subscribe(data => {
      let newColorsArr = data.filter(style => {
        return style.gender == 'female' && style.category == `${currentCategory}`;
      });
      const colors = [];
      newColorsArr.forEach(value => {
        if (colors.find(t => t == value.color)) { }
        else { colors.push(value.color) }
        this.colors = colors;
      });
    });
  }

  showmore():void{
    this.page+=8;
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

   filterBrands(event): void {
    this.pagbrnd = event.target.value;
    if (this.pagbrnd) {
      this.pagprc = '0';
      this.newProductService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.productsNew = data.filter(prod => {
          return prod.gender === 'female'&&prod.category == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.newProductService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.productsNew = data.filter(prod => {
          return prod.gender === 'female'&&prod.category == this.routepage;
        })
      })
    }
  }


  filterColors(event): void {
    this.pagcol = event.target.value;
    if (this.pagcol) {
      this.pagprc = '0';
      this.newProductService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.productsNew = data.filter(prod => {
          return prod.gender === 'female'&&prod.category == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.newProductService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.productsNew = data.filter(prod => {
          return prod.gender === 'female'&&prod.category == this.routepage;
        })
      })
    }
  }

  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.newProductService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.productsNew = data.filter(prod => {
          return prod.gender === 'female'&&prod.category == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.newProductService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.productsNew = data.filter(prod => {
          return prod.gender === 'female'&&prod.category == this.routepage;
        })
      })
    }
  }


   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

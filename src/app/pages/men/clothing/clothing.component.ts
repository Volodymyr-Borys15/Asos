import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.scss']
})
export class ClothingComponent implements OnInit {

  clothing: Array<IProduct> = [];
  page = 8;

  color: string;
  colors: Array<any> = [];

  price: number;

  brand: string;
  brands: Array<any> = [];

  style: string
  styles: Array<any> = [];

  favorLocale: Array<any> = [];
  activeGreen: string;

  private subscription: Subscription;

  pagcol: string = '';
  pagbrnd: string = '';
  pagstyle: string = '';
  pagprc: string = '';

  constructor(
              private productService: ProductsService,
              private Element:ElementRef,
              private renderer:Renderer2) { }

  ngOnInit(): void {
    this.getClothing();
    this.activeGreen = '';
    this.getAllStyles();
    this.getAllColors();
    this.getAllBrands();
  }

  private getClothing(): void {
   this.subscription = this.productService.getMyClothingPag(this.page).subscribe((data) => {
      this.clothing = data.filter(product => product.type == 'regular' && product.gender == 'male' && product.category == 'clothing');
    },
      err => {
        console.log(err);
      })
  }
  
  getAllStyles(): void {
    this.productService.getMyProduct().subscribe(data => {
      let clothingStylesArr = data.filter(style => {
        return style.gender == 'male'&&style.category == 'clothing';
      });
      const styles = [];
      clothingStylesArr.forEach(value => {
        if (styles.find(t => t == value.style)) { }
        else { styles.push(value.style) }
        this.styles = styles;
      });
    });
  }

  getAllColors(): void {
    this.productService.getMyProduct().subscribe(data => {
      let prodColorsArr = data.filter(style => {
        return style.gender == 'male'&&style.category == 'clothing';
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
    this.productService.getMyProduct().subscribe(data => {
      let prodBrandsArr = data.filter(style => {
        return style.gender == 'male'&&style.category == 'clothing';
      });
      const brands = [];
      prodBrandsArr.forEach(value => {
        if (brands.find(t => t == value.brand)) { }
        else { brands.push(value.brand) }
        this.brands = brands;
      });
    });
  }

  showmore(): void {
    this.page += 8;
    this.getClothing();
  }

  addFavor(favor,event): void {
    if (localStorage.length > 0 && localStorage.getItem('favor')) {
      this.favorLocale = JSON.parse(localStorage.getItem('favor'))
      this.favorLocale.push(favor);
      localStorage.setItem('favor', JSON.stringify(this.favorLocale))
    }
    else {
      this.favorLocale.push(favor);
      localStorage.setItem('favor', JSON.stringify(this.favorLocale))
    }
    this.renderer.setStyle(event.target,'backgroundColor','green')
    this.renderer.setStyle(event.target,'borderColor','green');
  }
  

  filterStyle(event): void {
    this.pagstyle = event.target.value;
    if (this.pagstyle) {
      this.pagprc = '0';
      this.productService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.clothing = data.filter(prod => {
          return prod.gender === 'male'&&prod.category ==='clothing';
        })
      })
    }
    else {
      this.getClothing();
      this.productService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.clothing = data.filter(prod => {
          return prod.gender === 'male'&&prod.category ==='clothing';
        })
      })
    }
  }

  filterColors(event): void {
    this.pagcol = event.target.value;
    if (this.pagcol) {
      this.pagprc = '0';
      this.productService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.clothing = data.filter(prod => {
          return prod.gender === 'male'&&prod.category ==='clothing';
        })
      })
    }
    else {
      this.getClothing();
      this.productService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.clothing = data.filter(prod => {
          return prod.gender === 'male'&&prod.category ==='clothing';
        })
      })
    }
  }

  filterBrands(event): void {
    this.pagbrnd = event.target.value;
    if (this.pagbrnd) {
      this.pagprc = '0';
      this.productService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.clothing = data.filter(prod => {
          return prod.gender === 'male'&&prod.category ==='clothing';
        })
      })
    }
    else {
      this.getClothing();
      this.productService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.clothing = data.filter(prod => {
          return prod.gender === 'male'&&prod.category ==='clothing';
        })
      })
    }
  }

  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.productService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.clothing = data.filter(prod => {
          return prod.gender === 'male'&&prod.category ==='clothing';
        })
      })
    }
    else {
      this.getClothing();
      this.productService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.clothing = data.filter(prod => {
          return prod.gender === 'male'&&prod.category ==='clothing';
        })
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

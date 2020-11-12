import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { NewProductsService } from 'src/app/shared/services/new-products.service';
import { INew } from 'src/app/shared/interfaces/new-product';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  newProduct: Array<INew> = [];
  pageCurrent = 8;

  color: string;
  colors: Array<any> = [];

  price: number;

  brand: string;
  brands: Array<any> = [];

  style: string
  styles: Array<any> = []

  favorLocale: Array<any> = [];
  activeGreen: string;

  private subscription: Subscription;
  
  pagcol: string = '';
  pagbrnd: string = '';
  pagstyle: string = '';
  pagprc: string = '';

  constructor(
    private serviceNew: NewProductsService,
    private Element: ElementRef,
    private renderer: Renderer2
  ) {

  }

  ngOnInit(): void {
    this.getNew();
    this.activeGreen = '';
    this.getAllStyles();
    this.getAllBrands();
    this.getAllColors();
  }

  private getNew(): void {
    this.subscription = this.serviceNew.getMyNewPag(this.pageCurrent).subscribe((data) => {
      this.newProduct = data.filter(product => product.type == 'new' && product.gender == 'male');
    },
      err => {
        console.log(err);
      })
  }

  getAllStyles(): void {
    this.serviceNew.getMyNew().subscribe(data => {
      let newStylesArr = data.filter(style => {
        return style.gender == 'male'
      });
      const styles = [];
      newStylesArr.forEach(value => {
        if (styles.find(t => t == value.style)) { }
        else { styles.push(value.style) }
        this.styles = styles;
      });
    });
  }
  getAllBrands(): void {
    this.serviceNew.getMyNew().subscribe(data => {
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

  getAllColors(): void {
    this.serviceNew.getMyNew().subscribe(data => {
      let newColorsArr = data.filter(style => {
        return style.gender == 'male'
      });
      const colors = [];
      newColorsArr.forEach(value => {
        if (colors.find(t => t == value.color)) { }
        else { colors.push(value.color) }
        this.colors = colors;
      });
    });
  }

  showmore(): void {
    this.pageCurrent += 8;
    this.getNew();
  }

  addFavor(favor, event): void {
    if (localStorage.length > 0 && localStorage.getItem('favor')) {
      this.favorLocale = JSON.parse(localStorage.getItem('favor'))
      this.favorLocale.push(favor);
      localStorage.setItem('favor', JSON.stringify(this.favorLocale))
    }
    else {
      this.favorLocale.push(favor);
      localStorage.setItem('favor', JSON.stringify(this.favorLocale))
    }
    this.renderer.setStyle(event.target, 'backgroundColor', 'green')
    this.renderer.setStyle(event.target, 'borderColor', 'green');
  }

  filterStyle(event): void {
    this.pagstyle = event.target.value;
    if (this.pagstyle) {
      this.pagprc = '0';
      this.serviceNew.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.newProduct = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
    else {
      this.getNew();
      this.serviceNew.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.newProduct = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
  }

  filterBrands(event): void {
    this.pagbrnd = event.target.value;
    if (this.pagbrnd) {
      this.pagprc = '0';
      this.serviceNew.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.newProduct = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
    else {
      this.getNew();
      this.serviceNew.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.newProduct = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
  }

  filterColors(event): void {
    this.pagcol = event.target.value;
    if (this.pagcol) {
      this.pagprc = '0';
      this.serviceNew.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.newProduct = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
    else {
      this.getNew();
      this.serviceNew.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.newProduct = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
  }


  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.serviceNew.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.newProduct = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
    else {
      this.getNew();
      this.serviceNew.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.newProduct = data.filter(prod => {
          return prod.gender === 'male';
        })
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
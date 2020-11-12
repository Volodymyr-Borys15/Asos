import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { SaleService } from 'src/app/shared/services/sale.service';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sale-category',
  templateUrl: './sale-category.component.html',
  styleUrls: ['./sale-category.component.scss']
})
export class SaleCategoryComponent implements OnInit {
  sales = [];
  page = 8;
  routepage = this.activateRoute.snapshot.paramMap.get('category');

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
    private salesService: SaleService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private Element: ElementRef,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const currentCategory = this.activateRoute.snapshot.paramMap.get('category');
        this.routepage = this.activateRoute.snapshot.paramMap.get('category');
        this.page = 8;
        this.getData(currentCategory);
        this.getAllColors(currentCategory);
        this.getAllBrands(currentCategory);
        this.getAllStyles(currentCategory);
      }
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 2000)
    this.routepage;
    this.activeGreen = '';
    this.getAllColors();
    this.getAllBrands();
    this.getAllStyles();
  }

  private getData(currentCategory?): void {
    currentCategory = this.activateRoute.snapshot.paramMap.get('category')
    this.subscription = this.salesService.getMySalesPaginCat(this.page, currentCategory).subscribe((data) => {
      this.sales = data.filter(product => product.type == 'sale' && product.gender == 'male' && product.category == `${currentCategory}`);
    },
      err => {
        console.log(err);
      })
  }
  
  getAllColors(currentCategory?): void {
    this.salesService.getMySales().subscribe(data => {
      let newColorsArr = data.filter(style => {
        return style.gender == 'male' && style.category == `${currentCategory}`;
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
    this.salesService.getMySales().subscribe(data => {
      let newBrandsArr = data.filter(style => {
        return style.gender == 'male' && style.category == `${currentCategory}`
      });
      const brands = [];
      newBrandsArr.forEach(value => {
        if (brands.find(t => t == value.brand)) { }
        else { brands.push(value.brand) }
        this.brands = brands;
      });
    });
  }

  getAllStyles(currentCategory?): void {
    this.salesService.getMySales().subscribe(data => {
      let newStylesArr = data.filter(style => {
        return style.gender == 'male' && style.category == `${currentCategory}`;
      });
      const styles = [];
      newStylesArr.forEach(value => {
        if (styles.find(t => t == value.style)) { }
        else { styles.push(value.style) }
        this.styles = styles;
      });
    });
  }

  showmore(): void {
    this.page += 8;
    this.getData();
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


  filterColors(event): void {
    this.pagcol = event.target.value;
    if (this.pagcol) {
      this.pagprc = '0';
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male' && prod.category == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male' && prod.category == this.routepage;
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
          return prod.gender === 'male' && prod.category == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male' && prod.category == this.routepage;
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
          return prod.gender === 'male' && prod.category == this.routepage;
        });
      });
    }
    else {
      this.getData();
    }
  }

  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male' && prod.category == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.salesService.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.sales = data.filter(prod => {
          return prod.gender === 'male' && prod.category == this.routepage;
        })
      })
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

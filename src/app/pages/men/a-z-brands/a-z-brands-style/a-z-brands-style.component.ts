import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-a-z-brands-style',
  templateUrl: './a-z-brands-style.component.html',
  styleUrls: ['./a-z-brands-style.component.scss']
})
export class AZBrandsStyleComponent implements OnInit {

  menBrands = [];
  currentPage = 8;

  routepage = this.activateRoute.snapshot.paramMap.get('brand');

  color: string;
  colors: Array<any> = [];

  price: number;

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
    private activateRoute: ActivatedRoute,
    private router: Router,
    private serviceProduct: ProductsService,
    private Element:ElementRef,
    private renderer:Renderer2
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const currentStyle = this.activateRoute.snapshot.paramMap.get('brand');
        this.routepage = this.activateRoute.snapshot.paramMap.get('brand');
        this.currentPage = 8;
        this.getData(currentStyle);
        this.getAllColors(currentStyle);
        this.getAllStyles(currentStyle);
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
    this.getAllStyles();
  }

  private getData(currentStyle?): void {
    currentStyle = this.activateRoute.snapshot.paramMap.get('brand')
    this.subscription = this.serviceProduct.getMyBrandsCurStylePag(this.currentPage, currentStyle).subscribe((data) => {
      this.menBrands = data.filter(product => product.type == 'regular' && product.gender == 'male' && product.brand == `${currentStyle}`);
    },
      err => {
        console.log(err);
      })
  }

  getAllStyles(currentStyle?): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let newStylesArr = data.filter(style => {
        return style.gender == 'male'&&style.type =='regular'&&style.brand == `${currentStyle}`;
      });
      const styles = [];
      newStylesArr.forEach(value => {
        if (styles.find(t => t == value.style)) { }
        else { styles.push(value.style) }
        this.styles = styles;
      });
    });
  }

  getAllColors(currentStyle?): void {
    this.serviceProduct.getMyProduct().subscribe(data => {
      let newColorsArr = data.filter(style => {
        return style.gender == 'male'&&style.type =='regular'&&style.brand == `${currentStyle}`;
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
    this.currentPage += 8;
    this.getData();
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

  filterColors(event): void {
    this.pagcol = event.target.value;
    if (this.pagcol) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.menBrands = data.filter(prod => {
          return prod.gender === 'male'&&prod.type == 'regular'&&prod.brand == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.menBrands = data.filter(prod => {
          return prod.gender === 'male'&&prod.type == 'regular'&&prod.brand == this.routepage;
        })
      })
    }
  }

  filterStyle(event): void {
    this.pagstyle = event.target.value;
    if (this.pagstyle) {
      this.pagprc = '0';
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.menBrands = data.filter(prod => {
          return prod.gender === 'male'&&prod.type == 'regular'&&prod.brand == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.menBrands = data.filter(prod => {
          return prod.gender === 'male'&&prod.type == 'regular'&&prod.brand == this.routepage;
        })
      })
    }
  }
  

  filterPrices(event): void {
    this.pagprc = event.target.value;
    if (this.pagprc) {
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.menBrands = data.filter(prod => {
          return prod.gender === 'male'&&prod.type == 'regular'&&prod.brand == this.routepage;
        })
      })
    }
    else {
      this.getData();
      this.serviceProduct.trynewfilter(this.pagcol, this.pagbrnd, this.pagstyle, this.pagprc).subscribe(data => {
        this.menBrands = data.filter(prod => {
          return prod.gender === 'male'&&prod.type == 'regular'&&prod.brand == this.routepage;
        })
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

}

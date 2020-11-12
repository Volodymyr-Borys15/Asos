import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { INew } from 'src/app/shared/interfaces/new-product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { NewProductsService } from 'src/app/shared/services/new-products.service';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-new-products-category-id',
  templateUrl: './new-products-category-id.component.html',
  styleUrls: ['./new-products-category-id.component.scss']
})
export class NewProductsCategoryIdComponent implements OnInit {

  newProducts: INew;
  localeNewProducts: Array<any> = [];
  currentSize: string;

  add: string = 'ADD TO BAG';
  blockBtn: boolean = false;

  @ViewChild('sizeSelect') public sizeSelect: ElementRef;

  private subscription: Subscription;

  constructor(private router: ActivatedRoute,
    private newProductService: NewProductsService,
    private orderService: OrderService,
    private Element: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getThisProduct();
  }

  private getThisProduct(): void {
    const ID = +this.router.snapshot.paramMap.get('id');
    this.subscription = this.newProductService.getCurrentNew(ID).subscribe(data => {
      this.newProducts = data;
    })
  }

  addProduct(): void {
    if (!this.currentSize) {
      setTimeout(() => {
        this.renderer.setStyle(this.sizeSelect.nativeElement, 'backgroundColor', '#b70127');
        setTimeout(() => {
          this.renderer.setStyle(this.sizeSelect.nativeElement, 'backgroundColor', 'white');
        }, 1000)
      })
    }
    else {
      setTimeout(() => {
        this.add = 'ADDED';
        setTimeout(() => {
          this.add = 'ADD TO BAG';
        }, 3000)
      });

      this.orderService.basket.next(this.newProducts);
      this.newProducts.orderSize = this.currentSize;

      if (localStorage.length > 0 && localStorage.getItem('product')) {
        this.localeNewProducts = JSON.parse(localStorage.getItem('product'));
        if (this.localeNewProducts.some(prod => prod.id === this.newProducts.id && prod.orderSize === this.newProducts.orderSize)) {
          const index = this.localeNewProducts.findIndex(prod => prod.id === this.newProducts.id);
          this.localeNewProducts[index].count += this.newProducts.count;
        }
        else {
          this.localeNewProducts.push(this.newProducts)
        }
        localStorage.setItem('product', JSON.stringify(this.localeNewProducts));
      }
      else {
        this.localeNewProducts.push(this.newProducts);
        localStorage.setItem('product', JSON.stringify(this.localeNewProducts))
      }
      this.newProducts.count = 1;

      this.orderService.basket.next(this.localeNewProducts);
      this.orderService.bag.next(true);
    }

  }

  chooseSize(event: any): void {
    const sizeValue = event.target.value;
    this.currentSize = sizeValue;
    this.blockBtn = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

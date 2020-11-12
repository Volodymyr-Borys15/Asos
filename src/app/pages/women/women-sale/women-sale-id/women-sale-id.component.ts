import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ISales } from 'src/app/shared/interfaces/sales';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/shared/services/sale.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-women-sale-id',
  templateUrl: './women-sale-id.component.html',
  styleUrls: ['./women-sale-id.component.scss']
})
export class WomenSaleIdComponent implements OnInit {

  sale: ISales;
  sProducts: Array<any> = [];
  currentSize: string;
  add: string = 'ADD TO BAG';
  blockBtn: boolean = false;

  @ViewChild('sizeSelect') public sizeSelect: ElementRef;

  private subscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    private saleService: SaleService,
    private orderService: OrderService,
    private Element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getThisSale();
  }

  private getThisSale(): void {
    const ID = +this.router.snapshot.paramMap.get('id');
    this.subscription = this.saleService.getCurrentSale(ID).subscribe(data => {
      this.sale = data;
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

      this.orderService.basket.next(this.sale);
      this.sale.orderSize = this.currentSize;

      if (localStorage.length > 0 && localStorage.getItem('product')) {
        this.sProducts = JSON.parse(localStorage.getItem('product'));
        if (this.sProducts.some(prod => prod.id === this.sale.id && prod.orderSize === this.sale.orderSize)) {
          const index = this.sProducts.findIndex(prod => prod.id === this.sale.id);
          this.sProducts[index].count += this.sale.count;
        }
        else {
          this.sProducts.push(this.sale)
        }
        localStorage.setItem('product', JSON.stringify(this.sProducts));
      }
      else {
        this.sProducts.push(this.sale);
        localStorage.setItem('product', JSON.stringify(this.sProducts))
      }
      this.sale.count = 1;

      this.orderService.basket.next(this.sProducts);
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

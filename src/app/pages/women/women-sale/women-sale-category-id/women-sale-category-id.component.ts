import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ISales } from 'src/app/shared/interfaces/sales';
import { SaleService } from 'src/app/shared/services/sale.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-women-sale-category-id',
  templateUrl: './women-sale-category-id.component.html',
  styleUrls: ['./women-sale-category-id.component.scss']
})
export class WomenSaleCategoryIdComponent implements OnInit {

  thisSale:ISales;
  add:string = 'ADD TO BAG'
  currentSize:string;
  localeSale:Array<any> = [];
  blockBtn:boolean = false;

  @ViewChild('sizeSelect') public sizeSelect:ElementRef;

  private subscription:Subscription;

  constructor(
    private saleService:SaleService,
    private route: ActivatedRoute,
    private orderService:OrderService,
    private Element:ElementRef,
    private renderer:Renderer2
  ) { }

  ngOnInit(): void {
    this.getCurrentProduct();
  }

  getCurrentProduct():void{
    const ID = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.saleService.getCurrentSale(ID).subscribe(data=>{
      this.thisSale = data;
    })
  }

  addProduct():void{
    if(!this.currentSize){
      setTimeout(()=>{
        this.renderer.setStyle(this.sizeSelect.nativeElement,'backgroundColor','#b70127');
        setTimeout(()=>{
          this.renderer.setStyle(this.sizeSelect.nativeElement,'backgroundColor','white');
        },1000)
      })
    }
    else{
      setTimeout(()=>{
        this.add = 'ADDED';
        setTimeout(()=>{
          this.add = 'ADD TO BAG';
        },3000)      
      });  
  
      this.orderService.basket.next(this.thisSale);
      this.thisSale.orderSize = this.currentSize;
  
      if(localStorage.length>0 && localStorage.getItem('product')){
        this.localeSale = JSON.parse(localStorage.getItem('product'));
        if(this.localeSale.some(prod=>prod.id === this.thisSale.id && prod.orderSize === this.thisSale.orderSize)){
          const index = this.localeSale.findIndex(prod=>prod.id === this.thisSale.id);
          this.localeSale[index].count += this.thisSale.count;
        }
        else{
          this.localeSale.push(this.thisSale)
        }
        localStorage.setItem('product',JSON.stringify(this.localeSale));
        }
        else{
          this.localeSale.push(this.thisSale);
          localStorage.setItem('product',JSON.stringify(this.localeSale))
        }
        this.thisSale.count = 1;
  
        this.orderService.basket.next(this.localeSale);
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

import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { INew } from 'src/app/shared/interfaces/new-product';
import { NewProductsService } from 'src/app/shared/services/new-products.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-women-new-id',
  templateUrl: './women-new-id.component.html',
  styleUrls: ['./women-new-id.component.scss']
})
export class WomenNewIdComponent implements OnInit {

  newProducts:INew;
  add:string = 'ADD TO BAG'
  currentSize:string;
  localeNew:Array<any> = [];
  blockBtn:boolean = false;

  @ViewChild('sizeSelect') public sizeSelect:ElementRef;

  private subscription:Subscription;

  constructor(
    private serviceNew:NewProductsService,
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
    this.subscription = this.serviceNew.getCurrentNew(ID).subscribe(data=>{
      this.newProducts = data;
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
  
      this.orderService.basket.next(this.newProducts);
      this.newProducts.orderSize = this.currentSize;
  
      if(localStorage.length>0 && localStorage.getItem('product')){
        this.localeNew = JSON.parse(localStorage.getItem('product'));
        if(this.localeNew.some(prod=>prod.id === this.newProducts.id && prod.orderSize === this.newProducts.orderSize)){
          const index = this.localeNew.findIndex(prod=>prod.id === this.newProducts.id);
          this.localeNew[index].count += this.newProducts.count;
        }
        else{
          this.localeNew.push(this.newProducts)
        }
        localStorage.setItem('product',JSON.stringify(this.localeNew));
        }
        else{
          this.localeNew.push(this.newProducts);
          localStorage.setItem('product',JSON.stringify(this.localeNew))
        }
        this.newProducts.count = 1;
  
        this.orderService.basket.next(this.localeNew);
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

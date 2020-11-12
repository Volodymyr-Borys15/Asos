import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-a-z-brands-style-id',
  templateUrl: './a-z-brands-style-id.component.html',
  styleUrls: ['./a-z-brands-style-id.component.scss']
})
export class AZBrandsStyleIdComponent implements OnInit {

  product:IProduct;
  localeProduct:Array<any>=[];
  currentSize:string;
  add:string = 'ADD TO BAG';
  blockBtn:boolean = false;

  @ViewChild('sizeSelect') public sizeSelect:ElementRef;

  private subscription:Subscription;

  constructor(
    private router:ActivatedRoute,
    private productService:ProductsService,
    private orderService:OrderService,
    private Element:ElementRef,
    private renderer:Renderer2
  ) { }

  ngOnInit(): void {
    this.getThisProduct();
  }

  private getThisProduct():void{
    const ID = +this.router.snapshot.paramMap.get('id');
    this.subscription = this.productService.getCurrentProduct(ID).subscribe(data=>{
      this.product = data;
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
  
      this.orderService.basket.next(this.product);
      this.product.orderSize = this.currentSize;
    
      if(localStorage.length>0 && localStorage.getItem('product')){
        this.localeProduct = JSON.parse(localStorage.getItem('product'));
        if(this.localeProduct.some(prod=>prod.id === this.product.id && prod.orderSize === this.product.orderSize)){
          const index = this.localeProduct.findIndex(prod=>prod.id === this.product.id);
          this.localeProduct[index].count += this.product.count;
        }
        else{
          this.localeProduct.push(this.product)
        }
        localStorage.setItem('product',JSON.stringify(this.localeProduct));
        }
        else{
          this.localeProduct.push(this.product);
          localStorage.setItem('product',JSON.stringify(this.localeProduct))
        }
        this.product.count = 1;
  
        this.orderService.basket.next(this.localeProduct);
        this.orderService.bag.next(true);
    }
    /* setTimeout(()=>{
      this.add = 'ADDED';
      setTimeout(()=>{
        this.add = 'ADD TO BAG';
      },3000)      
    },1000);

    this.orderService.basket.next(this.product);
    this.product.orderSize = this.currentSize;
  
    if(localStorage.length>0 && localStorage.getItem('product')){
      this.localeProduct = JSON.parse(localStorage.getItem('product'));
      if(this.localeProduct.some(prod=>prod.id === this.product.id && prod.orderSize === this.product.orderSize)){
        const index = this.localeProduct.findIndex(prod=>prod.id === this.product.id);
        this.localeProduct[index].count += this.product.count;
      }
      else{
        this.localeProduct.push(this.product)
      }
      localStorage.setItem('product',JSON.stringify(this.localeProduct));
      }
      else{
        this.localeProduct.push(this.product);
        localStorage.setItem('product',JSON.stringify(this.localeProduct))
      }
      this.product.count = 1;

      this.orderService.basket.next(this.localeProduct);
      this.orderService.bag.next(true); */
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

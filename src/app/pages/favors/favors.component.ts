import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-favors',
  templateUrl: './favors.component.html',
  styleUrls: ['./favors.component.scss']
})
export class FavorsComponent implements OnInit {

  favors:Array<any>=[];
  currentSize:string;
  blockBtn:boolean = false;
  add:string = 'ADD TO BAG';
  
  localeFavor:Array<any> = [];

  @ViewChild('sizeSelect') public justSel:ElementRef;

  constructor(
              private Element:ElementRef,
              private renderer:Renderer2
  ) { }

  ngOnInit(): void {
      if(localStorage.length>0 && localStorage.getItem('favor')){
        this.favors = JSON.parse(localStorage.getItem('favor'));
      }
  }

  chooseSize(event: any): void {
    const sizeValue = event.target.value;
    this.currentSize = sizeValue;
    this.blockBtn = true;
  }

  addProduct(favor,event):void{
  
  if(!this.currentSize){
    setTimeout(()=>{
      this.renderer.setStyle(this.justSel.nativeElement,'backgroundColor','#b70127');
      setTimeout(()=>{
        this.renderer.setStyle(this.justSel.nativeElement,'backgroundColor','white');
      },1000)
    })
  }
  else{
    favor.orderSize = this.currentSize;

    if(localStorage.length>0 && localStorage.getItem('product')){
      this.localeFavor = JSON.parse(localStorage.getItem('product'));
      if(this.localeFavor.some(prod=>prod.id === favor.id && prod.orderSize === favor.orderSize)){
        const index = this.localeFavor.findIndex(prod=>prod.id === favor.id);
        this.localeFavor[index].count += favor.count;
      }
      else{
        this.localeFavor.push(favor)
      }
      localStorage.setItem('product',JSON.stringify(this.localeFavor));
      }
      else{
        this.localeFavor.push(favor);
        localStorage.setItem('product',JSON.stringify(this.localeFavor))
      }
      favor.count = 1;
      
      setTimeout(()=>{
        this.renderer.setProperty(event.target,'textContent','Added')
        setTimeout(()=>{
          this.renderer.setProperty(event.target,'textContent','ADD TO BAG')
        },2000)
      })
    }
  }

}


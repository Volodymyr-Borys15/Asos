import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appDcolor]'
})
export class DcolorDirective {

  constructor(el:ElementRef) { 
    el.nativeElement.style.backgroundColor = '#383737'
  }

}

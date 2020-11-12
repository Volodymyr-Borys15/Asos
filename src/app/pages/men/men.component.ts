import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/shared/services/sale.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {

  constructor(private saleService:SaleService) { }

  ngOnInit(): void {
   
  }

}
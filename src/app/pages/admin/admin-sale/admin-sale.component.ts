import { Component, OnInit } from '@angular/core';
import { ISales } from 'src/app/shared/interfaces/sales';
import { SaleService } from 'src/app/shared/services/sale.service';
import { Sales } from 'src/app/shared/models/sales';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-sale',
  templateUrl: './admin-sale.component.html',
  styleUrls: ['./admin-sale.component.scss']
})
export class AdminSaleComponent implements OnInit {

  mySales: Array<ISales> = [];

  typeProduct:string;
  genderSale: string;
  categorySale: string;
  stylishSale: string;
  nameSale: string;
  brandSale: string;
  priceSale: number;
  descriptionSale: string;
  colorSale:string;
  firstSizeSale:string;
  secondSizeSale:string;
  thirdSizeSale:string;
  fourthSizeSale:string;
  imageSale:string;
  date:object = new Date();

  rememberID: number;
  addORsave:string = 'Add';
  changeStatus:boolean;

  private subscription: Subscription;

  constructor(private serviceForSale: SaleService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getSale();
  }

  private getSale(): void {
   this.subscription = this.serviceForSale.getMySales().subscribe(data => {
      this.mySales = data;
    },
      err => {
        console.log(err);
      })
  }

  addSale(): void {
    const newSale: ISales = new Sales(
      1,
      this.typeProduct,
      this.genderSale,
      this.categorySale,
      this.stylishSale,
      this.nameSale,
      this.brandSale,
      this.priceSale,
      this.descriptionSale,
      1,
      this.colorSale,
      this.firstSizeSale,
      this.secondSizeSale,
      this.thirdSizeSale,
      this.fourthSizeSale,
      this.imageSale,
      this.date);
      if(!this.changeStatus){
        if (this.mySales.length > 0) {
          newSale.id = this.mySales.slice(-1)[0].id + 1;
        }
        this.serviceForSale.addMySales(newSale).subscribe(() => {
          this.getSale();
        });
      }
      else{
        newSale.id = this.rememberID;
        this.serviceForSale.updateMySales(newSale).subscribe(()=>{
          this.getSale();
          this.addORsave = 'Add';
          this.changeStatus = false;
        });
        
      }
   
    this.resetForm();
  }

  deleteSale(sale: ISales): void {
    this.serviceForSale.deleteMySales(sale).subscribe(() => {
      this.getSale();
    })
  }

  editSale(sale: ISales): void {
    this.rememberID = sale.id;
    this.typeProduct = sale.type;
    this.genderSale = sale.gender;
    this.categorySale = sale.category;
    this.stylishSale = sale.style;
    this.nameSale = sale.name;
    this.brandSale = sale.brand;
    this.priceSale = sale.price;
    this.colorSale = sale.color;
    this.descriptionSale = sale.description;
    this.firstSizeSale = sale.firstSize;
    this.secondSizeSale = sale.secondSize;
    this.thirdSizeSale = sale.thirdSize;
    this.fourthSizeSale = sale.fourthSize;
    this.imageSale = sale.image;
    this.addORsave = 'Save';
    this.changeStatus = true;
  }

  private resetForm(): void {
    this.typeProduct = ''
    this.genderSale = '';
    this.categorySale = '';
    this.stylishSale = '';
    this.nameSale = '';
    this.brandSale = '';
    this.priceSale = null;
    this.colorSale = '';
    this.descriptionSale = '';
    this.firstSizeSale = '';
    this.secondSizeSale = '';
    this.thirdSizeSale = '';
    this.fourthSizeSale = '';
    this.imageSale = '';
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.storage.upload(filePath, file);
    task.then( e => {
      this.storage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe( url => {
        this.imageSale = url;
        console.log(url)
      });
    });
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  } 

 
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}

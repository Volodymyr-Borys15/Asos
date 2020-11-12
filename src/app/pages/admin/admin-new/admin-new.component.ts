import { Component, OnInit } from '@angular/core';
import { INew } from 'src/app/shared/interfaces/new-product';
import { Subscription } from 'rxjs';
import { NewProductsService } from 'src/app/shared/services/new-products.service';
import { New } from 'src/app/shared/models/new-products';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.scss']
})
export class AdminNewComponent implements OnInit {

  myNew: Array<INew> = [];

  typeProduct:string;
  genderNew: string;
  categoryNew: string;
  stylishNew: string;
  nameNew: string;
  brandNew: string;
  priceNew: number;
  descriptionNew: string;
  colorNew:string;
  firstSizeNew:string;
  secondSizeNew:string;
  thirdSizeNew:string;
  fourthSizeNew:string;
  imageNew:string;
  date:object = new Date();

  rememberID: number;
  addORsave:string = 'Add';
  changeStatus:boolean;
  
  private subscription: Subscription;
  constructor(private serviceNew:NewProductsService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getNew()
  }

  private getNew(): void {
    this.subscription = this.serviceNew.getMyNew().subscribe(data => {
       this.myNew = data;
     },
       err => {
         console.log(err);
       })
   }

   addNew(): void {
    const newProd: INew = new New(
      1,
      this.typeProduct,
      this.genderNew,
      this.categoryNew,
      this.stylishNew,
      this.nameNew,
      this.brandNew,
      this.priceNew,
      this.descriptionNew,
      1,
      this.colorNew,
      this.firstSizeNew,
      this.secondSizeNew,
      this.thirdSizeNew,
      this.fourthSizeNew,
      this.imageNew,
      this.date)
      if(!this.changeStatus){
        if (this.myNew.length > 0) {
          newProd.id = this.myNew.slice(-1)[0].id + 1;
        }
        this.serviceNew.addMyNew(newProd).subscribe(() => {
          this.getNew();
        });
      }
      else{
        newProd.id = this.rememberID;
        this.serviceNew.updateMyNew(newProd).subscribe(()=>{
          this.getNew();
          this.addORsave = 'Add';
          this.changeStatus = false;
        });
        
      }
   
    this.resetForm();
  }

  deleteNew(newProduct: INew): void {
    this.serviceNew.deleteMyNew(newProduct).subscribe(() => {
      this.getNew();
    })
  }

  editNew(newProduct: INew): void {
    this.rememberID = newProduct.id;
    this.typeProduct = newProduct.type;
    this.genderNew = newProduct.gender;
    this.categoryNew = newProduct.category;
    this.stylishNew = newProduct.style;
    this.nameNew = newProduct.name;
    this.brandNew = newProduct.brand;
    this.priceNew = newProduct.price;
    this.colorNew = newProduct.color;
    this.descriptionNew = newProduct.description;
    this.firstSizeNew = newProduct.firstSize;
    this.secondSizeNew = newProduct.secondSize;
    this.thirdSizeNew = newProduct.thirdSize;
    this.fourthSizeNew = newProduct.fourthSize;
    this.imageNew = newProduct.image;
    this.addORsave = 'Save';
    this.changeStatus = true;
  }

  private resetForm(): void {
    this.typeProduct = ''
    this.genderNew = '';
    this.categoryNew = '';
    this.stylishNew = '';
    this.nameNew = '';
    this.brandNew = '';
    this.priceNew = null;
    this.colorNew = '';
    this.descriptionNew = '';
    this.firstSizeNew = '';
    this.secondSizeNew = '';
    this.thirdSizeNew = '';
    this.fourthSizeNew = '';
    this.imageNew = '';
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.storage.upload(filePath, file);
    task.then( e => {
      this.storage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe( url => {
        this.imageNew = url;
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

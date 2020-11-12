import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/models/product';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  myProduct: Array<IProduct> = [];

  typeProduct:string;
  genderProduct: string;
  categoryProduct: string;
  stylishProduct: string;
  nameProduct: string;
  brandProduct: string;
  priceProduct: number;
  descriptionProduct: string;
  colorProduct:string;
  firstSizeProduct:string;
  secondSizeProduct:string;
  thirdSizeProduct:string;
  fourthSizeProduct:string;
  imageProduct:string;
  date:object = new Date();

  rememberID: number;
  addORsave:string = 'Add';
  changeStatus:boolean;


  private subscription: Subscription;

  constructor(private productService:ProductsService,
               private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    this.subscription = this.productService.getMyProduct().subscribe(data => {
       this.myProduct = data;
     },
       err => {
         console.log(err);
       })
   }


   addProduct(): void {
    const newProduct: IProduct = new Product(
      1,
      this.typeProduct,
      this.genderProduct,
      this.categoryProduct,
      this.stylishProduct,
      this.nameProduct,
      this.brandProduct,
      this.priceProduct,
      this.descriptionProduct,
      1,
      this.colorProduct,
      this.firstSizeProduct,
      this.secondSizeProduct,
      this.thirdSizeProduct,
      this.fourthSizeProduct,
      this.imageProduct,
      this.date);
      if(!this.changeStatus){
        if (this.myProduct.length > 0) {
          newProduct.id = this.myProduct.slice(-1)[0].id + 1;
        }
        this.productService.addMyProduct(newProduct).subscribe(() => {
          this.getProduct();
        });
      }
      else{
        newProduct.id = this.rememberID;
        this.productService.updateMyProduct(newProduct).subscribe(()=>{
          this.getProduct();
          this.addORsave = 'Add';
          this.changeStatus = false;
        });
        
      }
   
    this.resetForm();
  }

  deleteProduct(product: IProduct): void {
    this.productService.deleteMyProduct(product).subscribe(() => {
      this.getProduct();
    })
  }

  editProduct(product: IProduct): void {
    this.rememberID = product.id;
    this.typeProduct = product.type;
    this.genderProduct = product.gender;
    this.categoryProduct = product.category;
    this.stylishProduct = product.style;
    this.nameProduct = product.name;
    this.brandProduct = product.brand;
    this.priceProduct = product.price;
    this.colorProduct = product.color;
    this.descriptionProduct = product.description;
    this.firstSizeProduct = product.firstSize;
    this.secondSizeProduct = product.secondSize;
    this.thirdSizeProduct = product.thirdSize;
    this.fourthSizeProduct = product.fourthSize;
    this.imageProduct = product.image;
    this.addORsave = 'Save';
    this.changeStatus = true;
  }
  private resetForm(): void {
    this.typeProduct = ''
    this.genderProduct = '';
    this.categoryProduct = '';
    this.stylishProduct = '';
    this.nameProduct = '';
    this.brandProduct = '';
    this.priceProduct = null;
    this.colorProduct = '';
    this.descriptionProduct = '';
    this.firstSizeProduct = '';
    this.secondSizeProduct = '';
    this.thirdSizeProduct = '';
    this.fourthSizeProduct = '';
    this.imageProduct = '';
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.storage.upload(filePath, file);
    task.then( e => {
      this.storage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe( url => {
        this.imageProduct = url;
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

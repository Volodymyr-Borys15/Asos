import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FavorsComponent } from './pages/favors/favors.component';

import { MenComponent } from './pages/men/men.component';

import { SaleComponent } from './pages/men/sale/sale.component';
import { SaleCategoryIdComponent } from './pages/men/sale/sale-category-id/sale-category-id.component';
import { SaleCategoryComponent } from './pages/men/sale/sale-category/sale-category.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';


import { NewComponent } from './pages/men/new/new.component';
import {  NewProductsCategoryComponent } from './pages/men/new/new-products-category/new-products-category.component';
import { NewProductsCategoryIdComponent } from './pages/men/new/new-products-category-id/new-products-category-id.component';
import { NewProductsIdComponent } from './pages/men/new/new-products-id/new-products-id.component';

import { ClothingComponent } from './pages/men/clothing/clothing.component';
import { ClothingStyleComponent } from './pages/men/clothing/clothing-style/clothing-style.component';
import { ClothingIdComponent } from './pages/men/clothing/clothing-id/clothing-id.component';
import { ClothingStyleIdComponent } from './pages/men/clothing/clothing-style-id/clothing-style-id.component';


import { ShoesComponent } from './pages/men/shoes/shoes.component';
import { ShoesStyleComponent } from './pages/men/shoes/shoes-style/shoes-style.component';
import { ShoesIdComponent } from './pages/men/shoes/shoes-id/shoes-id.component';
import { ShoesStyleIdComponent } from './pages/men/shoes/shoes-style-id/shoes-style-id.component';


import { AccessoriesComponent } from './pages/men/accessories/accessories.component';
import { AccessoriesStyleComponent } from './pages/men/accessories/accessories-style/accessories-style.component';
import { AccessoriesStyleIdComponent } from './pages/men/accessories/accessories-style-id/accessories-style-id.component';
import {AccessoriesIdComponent } from './pages/men/accessories/accessories-id/accessories-id.component';


import { AZBrandsComponent } from './pages/men/a-z-brands/a-z-brands.component';
import { AZBrandsStyleComponent } from './pages/men/a-z-brands/a-z-brands-style/a-z-brands-style.component';
import {  AZBrandsIdComponent } from './pages/men/a-z-brands/a-z-brands-id/a-z-brands-id.component';
import { AZBrandsStyleIdComponent } from './pages/men/a-z-brands/a-z-brands-style-id/a-z-brands-style-id.component';


import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AdminSaleComponent } from './pages/admin/admin-sale/admin-sale.component';
import { AdminNewComponent } from './pages/admin/admin-new/admin-new.component';
import { AdminOrderComponent } from './pages/admin/admin-order/admin-order.component';

import { NgxUiLoaderModule,NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloader.config';
import { LoginComponent } from './pages/login/login.component';

import { WomenComponent } from './pages/women/women.component';
import { WomenSaleComponent } from './pages/women/women-sale/women-sale.component';
import { WomenNewComponent } from './pages/women/women-new/women-new.component';
import { WomenClothingComponent } from './pages/women/women-clothing/women-clothing.component';
import { WomenShoesComponent } from './pages/women/women-shoes/women-shoes.component';
import { WomenAccessoriesComponent } from './pages/women/women-accessories/women-accessories.component';
import { WomenAZBrandsComponent } from './pages/women/women-a-z-brands/women-a-z-brands.component';
import { WomenSaleCategoryComponent } from './pages/women/women-sale/women-sale-category/women-sale-category.component';
import { WomenSaleCategoryIdComponent } from './pages/women/women-sale/women-sale-category-id/women-sale-category-id.component';
import { WomenSaleIdComponent } from './pages/women/women-sale/women-sale-id/women-sale-id.component';
import { WomenNewIdComponent } from './pages/women/women-new/women-new-id/women-new-id.component';
import { WomenNewCategoryIdComponent } from './pages/women/women-new/women-new-category-id/women-new-category-id.component';
import { WomenNewCategoryComponent } from './pages/women/women-new/women-new-category/women-new-category.component';
import { WomenClothingIdComponent } from './pages/women/women-clothing/women-clothing-id/women-clothing-id.component';
import { WomenClothingStyleComponent } from './pages/women/women-clothing/women-clothing-style/women-clothing-style.component';
import { WomenClothingStyleIdComponent } from './pages/women/women-clothing/women-clothing-style-id/women-clothing-style-id.component';
import { WomenShoesIdComponent } from './pages/women/women-shoes/women-shoes-id/women-shoes-id.component';
import { WomenShoesStyleComponent } from './pages/women/women-shoes/women-shoes-style/women-shoes-style.component';
import { WomenShoesStyleIdComponent } from './pages/women/women-shoes/women-shoes-style-id/women-shoes-style-id.component';
import { WomenAccessoriesIdComponent } from './pages/women/women-accessories/women-accessories-id/women-accessories-id.component';
import { WomenAccessoriesStyleComponent } from './pages/women/women-accessories/women-accessories-style/women-accessories-style.component';
import { WomenAccessoriesStyleIdComponent } from './pages/women/women-accessories/women-accessories-style-id/women-accessories-style-id.component';
import { WomenAZBrandsIdComponent } from './pages/women/women-a-z-brands/women-a-z-brands-id/women-a-z-brands-id.component';
import { WomenAZBrandsStyleComponent } from './pages/women/women-a-z-brands/women-a-z-brands-style/women-a-z-brands-style.component';
import { WomenAZBrandsStyleIdComponent } from './pages/women/women-a-z-brands/women-a-z-brands-style-id/women-a-z-brands-style-id.component';

import { SalePipePipe } from './shared/pipes/sale-pipe.pipe';
import { NewPipePipe } from './shared/pipes/new-pipe.pipe';
import { RegularPipePipe } from './shared/pipes/regular-pipe.pipe';
import { DcolorDirective } from './shared/derectives/dcolor.directive';
import { RouteGuardsService } from './shared/services/route-guards.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenComponent,
    SaleComponent,
    SaleCategoryIdComponent,
    SaleCategoryComponent,
    NewComponent,
    ClothingComponent,
    ClothingStyleComponent,
    ClothingIdComponent, 
    ClothingStyleIdComponent,
    ShoesComponent,
    ShoesStyleComponent,
    ShoesIdComponent,
    ShoesStyleIdComponent,
    AccessoriesComponent,
    AccessoriesStyleComponent,
    AccessoriesStyleIdComponent,
    AccessoriesIdComponent,
    AZBrandsComponent,
    AZBrandsStyleComponent,
    AZBrandsIdComponent,
    AZBrandsStyleIdComponent,
  
  
    WomenComponent,
    BasketComponent,
    AdminComponent,
    NewProductsCategoryComponent,
    NewProductsCategoryIdComponent,
    NewProductsIdComponent,
    
    
    AdminProductComponent,
    AdminSaleComponent,
    AdminNewComponent,
    AdminOrderComponent,
    ProductDetailsComponent,
    LoginComponent,
    WomenSaleComponent,
    WomenNewComponent,
    WomenClothingComponent,
    WomenShoesComponent,
    WomenAccessoriesComponent,
    WomenAZBrandsComponent,
    WomenSaleCategoryComponent,
    WomenSaleCategoryIdComponent,
    WomenSaleIdComponent,
    WomenNewIdComponent,
    WomenNewCategoryIdComponent,
    WomenNewCategoryComponent,
    WomenClothingIdComponent,
    WomenClothingStyleComponent,
    WomenClothingStyleIdComponent,
    WomenShoesIdComponent,
    WomenShoesStyleComponent,
    WomenShoesStyleIdComponent,
    WomenAccessoriesIdComponent,
    WomenAccessoriesStyleComponent,
    WomenAccessoriesStyleIdComponent,
    WomenAZBrandsIdComponent,
    WomenAZBrandsStyleComponent,
    WomenAZBrandsStyleIdComponent,
    SalePipePipe,
    NewPipePipe,
    RegularPipePipe,
    FavorsComponent,
    DcolorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    TextMaskModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [RouteGuardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

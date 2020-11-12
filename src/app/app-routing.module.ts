import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules,NoPreloading } from '@angular/router';

import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AdminSaleComponent } from './pages/admin/admin-sale/admin-sale.component';
import { AdminNewComponent } from './pages/admin/admin-new/admin-new.component';
import { AdminOrderComponent } from './pages/admin/admin-order/admin-order.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { FavorsComponent } from './pages/favors/favors.component';

import { MenComponent } from './pages/men/men.component';
import { SaleComponent } from './pages/men/sale/sale.component';
import { NewComponent } from './pages/men/new/new.component';
import { ClothingComponent } from './pages/men/clothing/clothing.component';
import { ShoesComponent } from './pages/men/shoes/shoes.component';
import { AccessoriesComponent } from './pages/men/accessories/accessories.component';
import { AZBrandsComponent } from './pages/men/a-z-brands/a-z-brands.component';

import { SaleCategoryComponent } from './pages/men/sale/sale-category/sale-category.component';
import { SaleCategoryIdComponent } from './pages/men/sale/sale-category-id/sale-category-id.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';


import {  NewProductsCategoryComponent } from './pages/men/new/new-products-category/new-products-category.component';
import { NewProductsCategoryIdComponent } from './pages/men/new/new-products-category-id/new-products-category-id.component';
import { NewProductsIdComponent } from './pages/men/new/new-products-id/new-products-id.component';


import { ClothingStyleIdComponent } from './pages/men/clothing/clothing-style-id/clothing-style-id.component';
import { ClothingStyleComponent } from './pages/men/clothing/clothing-style/clothing-style.component';
import { ClothingIdComponent } from './pages/men/clothing/clothing-id/clothing-id.component';


import { ShoesStyleComponent } from './pages/men/shoes/shoes-style/shoes-style.component';
import { ShoesIdComponent } from './pages/men/shoes/shoes-id/shoes-id.component';
import { ShoesStyleIdComponent } from './pages/men/shoes/shoes-style-id/shoes-style-id.component';


import { AccessoriesIdComponent} from './pages/men/accessories/accessories-id/accessories-id.component';
import { AccessoriesStyleComponent } from './pages/men/accessories/accessories-style/accessories-style.component';
import { AccessoriesStyleIdComponent } from './pages/men/accessories/accessories-style-id/accessories-style-id.component';


import { AZBrandsStyleComponent } from './pages/men/a-z-brands/a-z-brands-style/a-z-brands-style.component';
import { AZBrandsIdComponent } from './pages/men/a-z-brands/a-z-brands-id/a-z-brands-id.component';
import { AZBrandsStyleIdComponent } from './pages/men/a-z-brands/a-z-brands-style-id/a-z-brands-style-id.component';

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
import { RouteGuardsService } from './shared/services/route-guards.service';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'men'},
  {path:'women',component:WomenComponent},
  {path:'men', component:MenComponent},
  {path:'basket',component:BasketComponent},
  {path:'admin',component:AdminComponent},
  {path:'favors',component:FavorsComponent},

  {path:'men-sale',component:SaleComponent},
  {path:'men-sale/:category', component:SaleCategoryComponent},
  {path:'men-sale/:category/:id',component:SaleCategoryIdComponent},
  {path:'product/:id',component: ProductDetailsComponent},

  {path:'men-new',component:NewComponent},
  {path:'new-products/:category',component:NewProductsCategoryComponent},
  {path:'new-products/:category/:id',component:NewProductsCategoryIdComponent},
  {path:'men-new/:id',component:NewProductsIdComponent},

  {path:'men-all-clothing',component:ClothingComponent},
  {path:'men-clothing/:style',component:ClothingStyleComponent},
  {path:'men-clothing/:style/:id',component:ClothingStyleIdComponent},
  {path:'men-all-clothing/:id',component:ClothingIdComponent},
  
  {path:'men-all-shoes',component:ShoesComponent},
  {path:'men-shoes/:style',component:ShoesStyleComponent},
  {path:'men-shoes/:style/:id',component:ShoesStyleIdComponent},
  {path:'men-all-shoes/:id',component:ShoesIdComponent},
 
  {path:'men-all-accessories',component:AccessoriesComponent},
  {path:'men-accessories/:style',component:AccessoriesStyleComponent},
  {path:'men-accessories/:style/:id',component:AccessoriesStyleIdComponent},
  {path:'men-all-accessories/:id',component:AccessoriesIdComponent},

  {path:'men-all-azbrands',component:AZBrandsComponent},
  {path:'men-all-azbrands/:id',component: AZBrandsIdComponent},
  {path:'men-azbrands/:brand',component: AZBrandsStyleComponent},
  {path:'men-azbrands/:brand/:id',component: AZBrandsStyleIdComponent},
  
  {path:'login',component: LoginComponent,
    canDeactivate:[RouteGuardsService],
    children:[
    {path:'admin-products',component:AdminProductComponent},
    {path:'admin-sales',component:AdminSaleComponent},
    {path:'admin-new',component:AdminNewComponent},
    {path:'admin-orders',component:AdminOrderComponent}
 ]},

  {path:'women-all-sale',component:WomenSaleComponent},
  {path:'women-sale/:category',component:WomenSaleCategoryComponent},
  {path:'women-sale/:category/:id',component:WomenSaleCategoryIdComponent},
  {path:'women-all-sale/:id',component:WomenSaleIdComponent },

  {path:'women-new',component:WomenNewComponent},
  {path:'women-new/:id',component:WomenNewIdComponent},
  {path:'women-new-products/:category',component:WomenNewCategoryComponent},
  {path:'women-new-products/:category/:id',component:WomenNewCategoryIdComponent},

  {path:'women-all-clothing',component:WomenClothingComponent},
  {path:'women-all-clothing/:id',component:WomenClothingIdComponent},
  {path:'women-clothing/:style',component:WomenClothingStyleComponent},
  {path:'women-clothing/:style/:id',component:WomenClothingStyleIdComponent},

  {path:'women-all-shoes',component:WomenShoesComponent},
  {path:'women-all-shoes/:id',component:WomenShoesIdComponent},
  {path:'women-shoes/:style',component:WomenShoesStyleComponent},
  {path:'women-shoes/:style/:id',component:WomenShoesStyleIdComponent},

  {path:'women-all-accessories',component:WomenAccessoriesComponent},
  {path:'women-all-accessories/:id',component: WomenAccessoriesIdComponent},
  {path:'women-accessories/:style',component: WomenAccessoriesStyleComponent},
  {path:'women-accessories/:style/:id',component: WomenAccessoriesStyleIdComponent},

  {path:'women-all-azbrands',component:WomenAZBrandsComponent},
  {path:'women-all-azbrands/:id',component: WomenAZBrandsIdComponent},
  {path:'women-azbrands/:brand',component:WomenAZBrandsStyleComponent},
  {path:'women-azbrands/:brand/:id',component:WomenAZBrandsStyleIdComponent},

  {path:'**', redirectTo:'men'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:NoPreloading})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

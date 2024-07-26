import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authGuard } from './Guards/auth.guard';
import { noAuthGuard } from './Guards/no-auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //full ->home only , prefix->home/id ...
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'brands', canActivate: [authGuard], component: BrandsComponent },
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'categories', canActivate: [authGuard], component: CategoriesComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  { path: 'shippingAddress/:id', canActivate: [authGuard], component: ShippingAddressComponent },
  { path: 'allorders', canActivate: [authGuard], component: OrdersComponent },
  { path: 'product/:id', canActivate: [authGuard], component: ProductDetailsComponent },
  { path: 'products/Category/:id', canActivate: [authGuard], component: CategoryProductsComponent },
  //load modulesetting
  { path: 'settings', loadChildren:()=>(import('./settings/settings-routing.module').then((m) =>m.SettingsRoutingModule))},
  // authGurad hawsl ll pages w ana 3amla login
  //noAuthGuard msh ha3rf aro7 ll pages 8ir ama a3ml login
  { path: 'login', canActivate: [noAuthGuard], component: LoginComponent },
  { path: 'register', canActivate: [noAuthGuard], component: RegisterComponent },
  { path: 'forget-password', canActivate: [noAuthGuard], component: ForgetPasswordComponent },
  { path: 'verify-reset-code', canActivate: [noAuthGuard], component: VerifyResetCodeComponent },
  { path: 'reset-password', canActivate: [noAuthGuard], component: ResetPasswordComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

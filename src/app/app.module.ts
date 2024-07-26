import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeMainSliderComponent } from './components/home-main-slider/home-main-slider.component';
import { HomeCategoriesSliderComponent } from './components/home-categories-slider/home-categories-slider.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddEGPPipe } from './pipes/add-egp.pipe';
import { TitelSlicePipe } from './pipes/titel-slice.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { LoadingComponent } from './components/loading/loading.component';
import { WishlistComponent} from './components/wishlist/wishlist.component';
import { BrandDeatilsComponent } from './components/brand-deatils/brand-deatils.component';
//tgbly data token moshfr
// import { jwtDecode } from "/path/to/jwt-decode.js";

@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    NotfoundComponent,
    ProductsComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    VerifyResetCodeComponent,
    ResetPasswordComponent,
    ProductComponent,
    ProductDetailsComponent,
    HomeMainSliderComponent,
    HomeCategoriesSliderComponent,
    ShippingAddressComponent,
    OrdersComponent,
    AddEGPPipe,
    TitelSlicePipe,
    SearchPipe,
    CategoryProductsComponent,
    LoadingComponent,
    WishlistComponent,
    BrandDeatilsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import template forms FormsModule
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    // JwtDecodeModule,
    
    
  ],
  //providers khasa bl hagat eli bit3mlha @Injection
  providers: [{
    //Dh bi3rfny en el classes eli hadifha htb2a interceptor hai3rfny tari2 kol el requests
    provide:HTTP_INTERCEPTORS,
    //asm el class eli hai3trd
    useClass:AuthInterceptor,
    //akter mn interceptor
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

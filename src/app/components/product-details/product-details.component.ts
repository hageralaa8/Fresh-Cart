import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wish-list.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  //slidder
  customOptions: OwlOptions = {
    //loop-->option 3ande 5 items ama ya5lso arg3 tany mn el awel wla yo2f
    loop: true,
    //mouseDrag a slide b mouse in PC
    mouseDrag: true,
    //Lw 3la el mobile
    touchDrag: false,
    pullDrag: false,
    //yazher dots t7t el image b slide mnha
    dots: true,
    //sha8al navigate by defualt
    autoplay: true,
    //autoplayTimeout b7dd el time b ml/s
    autoplayTimeout: 2000,
    //autoplayHoverPause -> bikon sabt ama hover ll sora bi3ml pause
    autoplayHoverPause: true,
    navSpeed: 700,
    //two button l slide ymen w shmal ['prev', 'next']
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    //false -> la9it azhar button navText + navSpeed
    nav: false
  }

  isLoading: boolean = false;
  productId: string | null = null;
  productDetails?: IProduct;
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService, private _CartService: CartService, private toastr: ToastrService , private _WishListService:WishListService) { }
  ngOnInit(): void {
    this.isLoading = true;
    //awsel azay ll params (ActivatedRoute) ---> class birg3ly data 3n el routeActive 
    //paramMap (observable)--->map gowaha kol el paremters eli hia data structure map ,this
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        //ageb azay value bta3t key mo3in fe map ---> get("key") 
        this.productId = params.get('id') //return string or null
      }})
    if (this.productId != null) {
      this._ProductService.getProductById(this.productId).subscribe({
        next: (response) => {
          this.productDetails = response.data
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      })
    }

  }

  addToCart(id: any) {
    this.isLoading
    this._CartService.addCartItem(id).subscribe({
      next: (response) => {
        console.log(response)
        this._CartService.cartItemsNum.next(response.numOfCartItems)
        this.toastr.success('Successfully Added To Cart !', 'Product Added', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "increasing",
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  addToWishList(id:string){
    this._WishListService.addProductToWishList(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._WishListService.wishListCount.next((response.data as IProduct []).length)

        this.toastr.success('Added', 'product succes added to your wishlist',{
          positionClass: 'toast-top-right',
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
        });


      },
      error:(err)=>{console.log(err);
      }
    })

}

}
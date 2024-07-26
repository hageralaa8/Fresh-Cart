import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  isLoading: boolean = false
  allWishListProducts: IProduct[] = []
  constructor(private _WishlistService: WishListService, private _CartService: CartService, private toastr: ToastrService) { 
    
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.getWishListData();

  }
  getWishListData() {
    this._WishlistService.getUserWishlist().subscribe({
      next: (response) => {
        this.allWishListProducts = response.data
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  addToCart(id: string) {
    this._CartService.addCartItem(id).subscribe({
      next: (response) => {
        console.log(response)
        this._CartService.cartItemsNum.next(response.numOfCartItems)
        this.toastr.success('Successfully Added To Cart !', 'Product Added', {
          closeButton: true, //azher close btn
          timeOut: 3000, //a5od wa2t ad eh l7d m ya5tfy
          progressBar: true, //bar bi7ml 
          progressAnimation: "increasing", //bizen el Animation
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeItemFromWishList(id: string) {
    this.isLoading = true;
    this._WishlistService.removeTooWishList(id).subscribe({
      next: (response) => {
        this.getWishListData();
        this.toastr.info("product deleted successfully From wishList")
        this._WishlistService.wishListProducsIds.next(response.data);
        //ams7 mn wl wishlist el rakm fe navbar
        this._WishlistService.wishListCount.next(response.data.length)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

/* 
wishList service --> array of wishlist products ids----> behavior subject

home ---> onInit ---> get all products ---> display ---> مقارنه compare id ---> elProductsIds
products ---> 

add product to wishlist ===> update

*/
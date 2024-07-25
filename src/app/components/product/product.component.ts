import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product!: IProduct
  wishListProducsIdsList: string[] = []
  constructor(
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishListService: WishListService)
     { }

  ngOnInit(): void {
    this._WishListService.wishListProducsIds.subscribe((idsList) => {
      this.wishListProducsIdsList = idsList
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
  addToWishList(productId: string) {
    this._WishListService.addProductToWishList(productId).subscribe({
      next: (response) => {
        this.toastr.success(response.message, "Product Added")
        this._WishListService.wishListProducsIds.next(response.data);
        this._WishListService.wishListCount.next(response.data.length)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  isWishListProduct(id:string){
    //array of ids of wishlist products
    //id of current product
   return this.wishListProducsIdsList.includes(id) //true false
   
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDetails: any;
  //3andy haga asmha type inference msh shart a7dd el type talma hady initial value
  isLoading: boolean = true

  constructor(private _CartService: CartService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.isLoading=true;
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false;
      },
    })
  }

  removeCartItem(id: string) {
    this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        // response.data --> shakl el new cart b3d el mas7
        this.cartDetails = response.data
        this._CartService.cartItemsNum.next(response.numOfCartItems)
        this.toastr.error("This Item have been deleted successfully ")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  updateCartItem(id: string, count: number) {
    this._CartService.updateCartItem(id, count).subscribe({
      next: (response) => {
        this.cartDetails = response.data
        this.toastr.info("All Items have been update successfully ")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeAllCart() {
    // this.isLoading = true;
    this._CartService.removeAllCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data
        this._CartService.cartItemsNum.next(response.numOfCartItems)
        this.toastr.error("All Items have been deleted successfully ")
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        // this.isLoading = false;
      }
    })
  }

}







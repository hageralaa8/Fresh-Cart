import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //isLoggedUeser ===> false
  //isLoggedIn ===> true
  isLoggedUeser: boolean = false;
  numOfCartItems: number = 0
  wishListCount: number = 0



  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
   private _WishListService: WishListService) { }

  //function bttnfz enha btro7 call logout el fe service bttnfz lma click 3la button singout hiwdeny ll login
  logOut() {
    this._AuthService.logOut()
  }
  //isLoggedUeser khaliha b value property eli fe services hatkon false awel m ft7t + lma get 3mlt loggin f isLoggedIn at8irt b2t b true bs ana m3rftsh enha at8irt fe navbar 
  //fe navbar m3 to8ir el property eli fe service f msh baro7 update kemt el prperty eli 3andy eli bt7km feha fe zhor el liks w a5tfa2ha
  // solution

  ngOnInit() {
    //subscribe 3la subject nafso 3ashn kol emit aw notify a3rf w ast2bl el value eli ba3tha w set isLoggedUeser
    //act as obserable
    this._AuthService.isLoggedInSubject.subscribe((isLogged) => { this.isLoggedUeser = isLogged })
    // this.numOfCartItems=this._CartService.cartitemsNum xxx
    this._CartService.cartItemsNum.subscribe({
      next: (nums) => { this.numOfCartItems = nums }
    })
    //observable
    //observer.
    //subject ===> observable , observer
    this._WishListService.wishListCount.subscribe((count)=>{this.wishListCount = count})
  }
}

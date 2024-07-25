import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //BehaviorSubject (notify mn el kharg) --> 3ashn m3 kol ta8ir ya3rfny eno 7asl hwa observable a2der subscribe w observer use next , erroe , complate
  cartItemsNum = new BehaviorSubject<number>(0)

  constructor(private _HttpClient: HttpClient) {
    this.updateCartItemsCount()
    // this.getUserCart().subscribe({
    //   //subscribe3la method mo3ina bb3t request birg3ly response ya7slo notify b next yarg3ly response bikon object gowah key asmo numOfCartItems ba5od el rakm dh w set fe property ana 3amltha gwa el service cartitemsNum w di shared 3la akter mn component a2der ast5dmha fe akter mn mkan
    //   // next: (response) => { this.cartitemsNum = response.numOfCartItems }
    //   next: (response) => { this.cartItemsNum.next(response.numOfCartItems) }
    // })
  }

  // cartitemsNum: number = 0

  //xxx single instance -->awel m aft7 el app ha5od el token mn localstorage + user 3ml logout w da5l 3la account gded hai5od el token bta3 awel mra soultion interceptor
  // headers: any = { token: localStorage.getItem("token") }

  addCartItem(id: string): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: id,
      }
    )
  }

  //3aiza ageb ma3lomat el cart w hb3t token llbackend yt2kd en ana Authentication w ya3rf ana men f yrg3ly malomat el cart
  getUserCart(): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart",
    )
  }
  //function httnfz lma ados 3la delete + aro7 aged el id bta3 el product w concat w ab3t request 
  removeCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    )
  }

  updateCartItem(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count },
    )
  }

  onlinePayment(cartId: any, shappingAddress: any): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=url=https://fresh-cart-tau-seven.vercel.app/`,
      { shappingAddress: shappingAddress },
    )
  }

  removeAllCart(): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,
    )
  }

  //Method lma a3mlha call hatro7 subscribe w tb3t request w yarg3lha response btgeb mn numOfCartItems w notify beh kol el subscriber
  updateCartItemsCount() {
    this.getUserCart().subscribe({
      next: (response) => {
        this.cartItemsNum.next(response.numOfCartItems)
      },
      //make sure --->404 not found
      //notify navbar -->3add el elment fe cart 0 ->numOfCartItems = 0
      error: (err) => {
        //en mafish cart ll user elgded aw user m3ndhosh 3anaser fe cart bta3to f azher fe nav bar cart b zero
        if (err.status == 404) {
          this.cartItemsNum.next(0)
        }
      }
    })
  }
}
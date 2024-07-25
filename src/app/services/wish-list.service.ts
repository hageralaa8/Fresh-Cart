import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishListProducsIds = new BehaviorSubject<string[]>([])
  //BehaviorSubject biwsfly el rakm bta3 el 3naser fe wishleist
  wishListCount = new BehaviorSubject<number>(0)

  constructor(private _HttpClient: HttpClient) {
    this.updateWishListItemsCount()
    //mapping -->mapping lkol value gowa el array bta3ty mn shkl l shkl
    //lma awel m aft7 ashof el product eli ma3mol 3aliha wishlist tkon zahra
    this.getUserWishlist().subscribe({
      next: (response) => {
        //mapping 3la el hirg3ly lkol object gowa array ba7olo ll id
        this.wishListProducsIds.next((response.data as IProduct[]).map((product) => product._id))
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  addProductToWishList(productId: string): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId: productId,
      },
    )
  }
  getUserWishlist(): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/wishlist",)
  }

  removeTooWishList(productId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    )
  }


  //add el rakm at8ir fe wishlist ---> array data --->ids item wishlist
  //delete mas7t 3onsr fe wishlist el rakm at8ir aro7 agebo w a3ml notify---> array data --->ids item wishlist
  //get 1-(first awel m aft7 el app) /2-(m3 kol login)
  //get ---> array data --->object item wishlist

  //3ashn lma a3ml lofin mn new acc 
  updateWishListItemsCount(){
    this.getUserWishlist().subscribe({
      next: (response) => {   
        this.wishListProducsIds.next((response.data as IProduct[]).map((product)=>product._id))
        // kol m function ya7slha call tro7 tegb wishlist el gdeda eli lsa 3aml login now w tro7 notify kol el subscriber b rkm el gded
        this.wishListCount.next(response.data.length)
      },
      error:(err)=>{
        // if(err.status == 404){
        //   this.wishListProducsIds.next(0)
        // }
        console.log(err);
        
      }  
    })
  }

}

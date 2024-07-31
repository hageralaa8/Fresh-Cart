import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient: HttpClient) { }

  GetAllBrands(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  //page lma bad5ol 3la brand
  getSpecificBrand(id:string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
  }

}

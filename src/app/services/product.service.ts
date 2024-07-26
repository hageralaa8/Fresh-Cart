import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  getProductById(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  //bageb kol el categories 3ashn a3rdha fe slider bta3 el home
  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  getProductsByCateogory(categoryId: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
  }

  getProductsByBrand(brandId: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
  }

}

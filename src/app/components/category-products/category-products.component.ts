import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  allProducts: IProduct[] = []
  categoryId: string | null = ''
  //3andy haga asmha type inference msh shart a7dd el type talma hady initial value
  isLoading = false;
  constructor(private _ProductService: ProductService, private _ActivatedRoute: ActivatedRoute) {
    //3ashn ageb id mn url 3ande class dideny m3lomat 3n el active root el 7aly mn damnha kan 3andy Observable asmo param map 3obra mn map fe kol el paremters el fe msar path
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.categoryId = params.get("id");
      if (this.categoryId) {
        this._ProductService.getProductsByCateogory(this.categoryId).subscribe({
          next: (response) => { this.allProducts = response.data;
            this.isLoading=false;
           },
          error: (err) => {console.log(err),
            this.isLoading=false;

          }
        })
      }

    })
  }
}

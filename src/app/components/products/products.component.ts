import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductService: ProductService) { }
  isLoading = false
  allproduct: IProduct[] = []
  searchitem: string = ""
  pageSize: number = 0 // limit
  currentPage: number = 0
  total: number = 0 // results
  ngOnInit(): void {
    this.isLoading = true
    this._ProductService.getAllProducts().subscribe({

      next: (response) => {
        console.log(response);
        this.allproduct = response.data;
        this.total = response.results;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.isLoading = false
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false
      }
    })
  }


  // pageChanged(event: any) {
  //   this.isLoading = true
  //   this._ProductService.getAllProducts(event).subscribe({

  //     next: (response) => {
  //       console.log(response);
  //       this.allproduct = response.data;
  //       this.total = response.results;
  //       this.pageSize = response.metadata.limit;
  //       this.currentPage = response.metadata.currentPage;
  //       this.isLoading = false
  //     },
  //     error: (error) => {
  //       console.log(error);
  //       this.isLoading = false
  //     }
  //   })

  // }


}

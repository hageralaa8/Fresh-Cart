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

  allProduct: IProduct[]=[];
  isLoading:boolean=true;
  searchItems:string=''

  ngOnInit(): void {
   this.isLoading=true;
    this._ProductService.getAllProducts().subscribe({
      next: (response) => {
       
        this.allProduct = response.data;
        this.isLoading=false;
      },
      
    })
  }
  }


  


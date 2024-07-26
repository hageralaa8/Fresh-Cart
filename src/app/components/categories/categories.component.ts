import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/icategory';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  constructor(private _ProductService: ProductService,) { }
  isLoading = false;
  allCategories:ICategory[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this._ProductService.getAllCategories().subscribe({
      //responseel value eli bttb3t fe next
      next: (response) => {
        this.allCategories = response.data
        this.isLoading = false;
      },
      error:(err)=>{console.log(err)
      this.isLoading = false;
      }
    })
  }
}

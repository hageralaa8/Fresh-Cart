import { Component } from '@angular/core';
import { IBrand } from 'src/app/interfaces/ibrand';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  constructor(private _BrandsService:BrandsService) { }
  allbrands:IBrand[]=[]
  isLoading=false

  ngOnInit() {
    this.isLoading=true
    this._BrandsService.GetAllBrands().subscribe( {
      next: (response) => {
        console.log(response);
        this.allbrands=response.data
        this.isLoading=false

      },
      error: (error) => {
        console.log(error);
        this.isLoading=false

      }
    });
  }
}

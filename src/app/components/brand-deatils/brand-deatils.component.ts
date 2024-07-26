import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/interfaces/iproduct';
import { BrandsService } from 'src/app/services/brands.service';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-brand-deatils',
  templateUrl: './brand-deatils.component.html',
  styleUrls: ['./brand-deatils.component.css']
})
export class BrandDeatilsComponent implements OnInit  {
  constructor(private _ActivatedRoute: ActivatedRoute, private _BrandsService: BrandsService ,private _CartService:CartService,private toastr: ToastrService, private _WishlistService:WishListService) { }
  productId: string | null = null;
  productDetails:IProduct[]=[] ;
  isLoading: boolean = true;

  
  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id')
        this.isLoading = false;
      }
    })
    if (this.productId != null) {
      this.isLoading = true;

      this._BrandsService.getSpecificBrand(this.productId).subscribe({
        next: (response) => {
          this.productDetails = response.data;
          this.isLoading = false;
        }
      })
    }
  }

  
}

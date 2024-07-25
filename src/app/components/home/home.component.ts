import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allProducts: IProduct[] = [];
  searchItem:string =""
  isLoading:boolean= false ;
  constructor(private _ProductService: ProductService) { }
  ngOnInit() {
    this.isLoading = true ;
    this._ProductService.getAllProducts().subscribe({
      next: (response) => { this.allProducts = response.data;
        this.isLoading=false
       },
      error: (err) => {
        console.log(err);
        this.isLoading=false
      }
    })
  }
}

//que? azher awel kalmten
//Woman Bordeaux Long Sleeve 
//split("") ===> ["Woman" , "Bordeaux" , "Long" , "Sleeve"] ==> array w kol kelma fe element gowa el array
//slice(0,2) ===> ["Woman" , "Bordeaux"]
//join('')===> return string mrtn a5ory w bta5t eli haifsly ben el 3anaser ha5lih space

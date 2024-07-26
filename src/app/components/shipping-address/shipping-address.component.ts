import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {
  isLoading:boolean=false

  //Form:type نوع ->FormGroup = a5od instance mn FormGroup bta5od mny object fe kol el control({ details: new FormControl(null -> initial value , Validators or array)
  shappingAddressForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required])
  })

  cartId: string | null = "";
  ngOnInit(): void {
    
    //class _ActivatedRoute -->ba5od mno inistance fe ma3lomat kter / .paramMap ---> observable
    //
    this._ActivatedRoute.paramMap.subscribe({
      //ageb el id mn gowa el map .get
      next: (params) => {
        this.cartId = params.get("id");
      }
    })
  }


  redirectToPaymentPage(url: string) {
    //use dom msh hats5dm el navigateion el da5ly bta3 el angluar
    //a8ir el masar bta3 el saf7a bta3ty mn elhome -->window.location
    window.location.href = url;
  }

  constructor(private _CartService: CartService, private _ActivatedRoute: ActivatedRoute) { }
  handelshappingAddress(form: FormGroup) {
    if(this.shappingAddressForm.valid){
    this.isLoading=true
    this._CartService.onlinePayment(this.cartId, form.value).subscribe({
      next: (response) => {
        //path -> response --> object .session -> key url
        this.redirectToPaymentPage(response.session.url)
        this.isLoading=false
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false
      }
    })
  }
}
}


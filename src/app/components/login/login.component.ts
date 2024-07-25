import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private _AuthService: AuthService,
     private _Router: Router,
      private _CartService:CartService,
      private _WishListService:WishListService
    ) { }

  apiErrorMessage: string = ''
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}$/)]),
  });


  handlelogin(loginForm: FormGroup) {

    if (loginForm.valid) {
      this.isLoading=true;
      this._AuthService.login(loginForm.value).subscribe({

        next: (response) => {
          console.log(response);
          //lw rag3ly el response bshkl salem kont birg3ly token ba5zno
          localStorage.setItem('token' , response.token)
          //a5od nos5a mn cartservice w a3mlha call ll mehod updateCart
          //get logged in user cart ===>3ashn ageb mnha num of cart items --> notify l navbar w b3dha ya7ds el rakm
          this._CartService.updateCartItemsCount()
          //add number in icone cart in nav bar
          this._WishListService.updateWishListItemsCount()
          this._Router.navigate(['/home'])
          this._AuthService.isLoggedInSubject.next(true)
          this.isLoading= false;

        },
        error: (err) => {
          this.apiErrorMessage = err.error.message
          this.isLoading= false;
        }
      })

    }   
  }
}

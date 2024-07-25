import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   // take a new instance
import { IRegister } from 'src/app/interfaces/iregister';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILogin } from '../interfaces/iLogin';
import { Router } from '@angular/router';
import { IverifyResetCodeService } from '../interfaces/iverify-reset-code-service';
import { IforgetPassword } from '../interfaces/iforget-password';
import { IresetPassword } from '../interfaces/ireset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Observable ->container bitnfz gowah task mo3in w lma data targ3lo bi3mly notify m3 kol to8ir w send new value

  // isLoggedIn = new Observable((subscriber)=>{
  //   //async
  //   subscriber.next(true)
  // });

  //lw mowod token el initial value b true mafish token hatb2a b false  
  isLoggedInSubject = new BehaviorSubject<boolean>(localStorage.getItem("token") ? true : false);

  // a5od instance mn http clint Injection 
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  register(regForm: IRegister): Observable<any> {
    // this : لو عايز اجيب او اقرا اي حاجة علي مستوي ال component 
    // access modifier (public - private)
    // auth -> authentcation/authorization
    // () -> ay 7aga gowa l kos to3tabr asmha argements
    //observer-> technique mo5tlf 3n promises /return 3ashn lma call function ashof shakl observer
    // lma ab3t regObject direct kda send to body
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", regForm);
  }

  login(loginForm: ILogin): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", loginForm);
  }

  logOut() {
    //remove token from local storage
    localStorage.removeItem("token")
    //navigate to login page
    this._Router.navigate(['/login'])
    // ab3tlohom kolhom notify .next -> false
    this.isLoggedInSubject.next(false);
  }

  forgetPassword(forgetPasswordForm: IforgetPassword): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", forgetPasswordForm)
  }

  VerifyResetCode(verifyResetCodeForm: IverifyResetCodeService): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", verifyResetCodeForm)
  }
  resetPassword(resetPasswordForm: IresetPassword): Observable<any> {
    return this._HttpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", resetPasswordForm)
  }
}




//variable boolean ===>loggedIn

//1-logout ===>logOut method
//2-login ===>handleLogin 
//3-navbar ===>value

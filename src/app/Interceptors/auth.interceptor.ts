import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //request object immutable
    //request1===> intercept ===> copy (request2) modify ==> next.handle(request2)

    let token=localStorage.getItem("token") //string | null
    //lw token b true ya3ny rag3ly b string w user 3aml login a5od nos5a mn el req w aro7 adef ll headers key asmo "token" w value token
    if(token){
      //mehtod clone---> ha5odly nos5a mn el request hargly fe mehtod clone f ha5znha fe ay variable
      let clonedRequest=request.clone({
        //"token"-->key elbackend talpo mny 
        //append-->adafa add
        headers:request.headers.append("token",token)
      })
      //mrn new b3d eladafa
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
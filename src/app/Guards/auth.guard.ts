//true===>HomeComponent
//false===> malish el a72aia eni awesl ll component ana b2a lya eni a7dd return true or false
//que?azay a3rf eni 3amla login aw logOut ==>"token"
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  //class ===> constructor injection
  //que? atlop azay gowa el function mn el angluar enha t72nly nos5a mn el router ---> Inject(Router) create object mn no3 router 

  let router = inject(Router);

  if (localStorage.getItem("token")) {

    return true;

  } // lw feh token kda 3amla login return string || null empty

  else {
    //router gowh class navigate
    router.navigate(["/login"])
    return false;
  } // eni msh sh5s Authenicated
};

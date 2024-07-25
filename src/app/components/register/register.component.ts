import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from 'src/app/Custom Validation/match-password';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // use function name register a5od nos5a mnha -->dependancy injection

  constructor(private _AuthService: AuthService, private _Router: Router)  { }

  //LOAING dimen b false w tb2a zahra true lw send requset and wait response
  isLoading= false ;
  //create property
  apiErrorMessage: string = '';

  // handleSubmit(myForm: NgForm) {
  //   console.log(myForm);
  // }
  // reactive forms
  //1-add property mn no3 FormGroup contain magmo3a mn el form control
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),//msh 3aiz ay initshial value ll name
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:passwordMatch});


  //next====> navigation login ad5lo 3la home 1-  import Router + a5od mnha nos5a --> .navgate ([path])
  //error====> display error 1- a3rf propery akon adra a3mlha string interpolation gwa el html /err.key asmo error gowa key asmha message / set message in property lw rag3t b7es a2der binding 3liha w a3rdha in view 
  //a3ml loading spinner fe mkan kelmt register w a5ly button disabled / a5liha true lw send requset and wait response

  handleRegister(regForm: FormGroup) {
    if (this.registerForm.valid) {
      this.isLoading = true;

     // send request w see response use AuthService
      this._AuthService.register(regForm.value).subscribe({
        next: (response) => {
          this._Router.navigate(['/login'])
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading=false;
          this.apiErrorMessage = err.error.message;
          console.log(this.apiErrorMessage);
        },

      })
    }
    // console.log(regForm);
  }
}

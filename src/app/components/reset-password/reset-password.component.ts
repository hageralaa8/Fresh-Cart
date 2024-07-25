import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {


  constructor(private _AuthService: AuthService, private _Router: Router) { }

  isLoading:boolean = false;
  apiErrorMessage: string = '';
  
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}$/)])
  })
  handleResetPassword(resetPasswordForm:FormGroup){
    isLoading:true;
    this._AuthService.resetPassword(resetPasswordForm.value).subscribe({
      next: (response) => {
        // console.log(response);
        this._Router.navigate(['/login'])
        this.isLoading= false;

      },
      error: (err) => {
        this.apiErrorMessage = err.error.message
        this.isLoading= false;

      }
    })

  }

}


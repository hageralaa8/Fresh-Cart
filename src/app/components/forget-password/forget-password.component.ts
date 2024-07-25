import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  apiErrorMessage: string = ''
  isLoading: boolean = false;

  //1- define form
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  handleForgetPassword(forgetPasswordForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.forgetPassword(forgetPasswordForm.value).subscribe({
      next: (response) => {
        this._Router.navigate(["/verify-reset-code"])
      },
      error:(err)=>{
        this.apiErrorMessage = err.error.message
      }
    })
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css']
})
export class VerifyResetCodeComponent {

  apiErrorMessage: string = '';
  isLoading: boolean = false;


  constructor(private _AuthService: AuthService, private _Router: Router) { }


  //1-VerifyResetCode mn no3:FormGroup 2- a5od mnha nos5a w a7ot gowaha kol elFormControl
  verifyResetCodeForm: FormGroup = new FormGroup({


    resetCode: new FormControl(null, [Validators.required])
  })
  handleVerifyResetPassword(verifyResetCodeForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.VerifyResetCode(verifyResetCodeForm.value).subscribe({
      next: (response) => {
        // navigate path lha Array but navigateurl path leh url
        this._Router.navigate(['/reset-password'])
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading=false;
        this.apiErrorMessage = err.error.message;
        // console.log(this.apiErrorMessage);
      },
    })

  }
}

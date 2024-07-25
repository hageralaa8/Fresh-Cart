import { AbstractControl, ValidationErrors } from "@angular/forms";

//3amlt class 3ashn implement class tany yas3dny a3ml custom validation bta3y 
export class MatchPassword {
}

// create function 3ady bta3od mny paremter:type AbstractControl , retrun lia ValidationErrors| null + implement
export let passwordMatch = (control: AbstractControl) : ValidationErrors | null => {
    //export--->3ashn using fe mkan tany

    // 1- a3rf kwmt wl password or repassword
    // let password = control.value.password;
    // let rePassword = control.value.rePassword;

    let{password,rePassword} =control.value;

    // mokrna benhom lw match or not match
    // if (password == rePassword && password && rePassword)
    //  {
    //     return null; //mafish error
    // }
    // else {
    //     return {passwordMismatch: true}
    // }
    return password == rePassword && password && rePassword? null : {passwordMismatch: true} ;
}
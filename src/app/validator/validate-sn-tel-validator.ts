
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TelephoneService } from '../services/helpers/telephone.service';

export class ValidateSnTelValidator {
     
    constructor(){
    }
    static snValidFixMobileOk(control: AbstractControl) : ValidationErrors | null {
        let value:string =control.value as string;
        if(!TelephoneService.checkIfPhoneNumberIsOkStatic(value))return {phoneFormatInvalid:true};
        return null;
    }
    static snValidMobileOk(control: AbstractControl) : ValidationErrors | null {
        let value:string =control.value as string;
        if(TelephoneService.checkIfTelOrMobileStatic(value,"SN")!="MOBILE"){
            return {phoneMobileFormatInvalid:true};
        }
        return null;
    }
    static snValidFixOk(control: AbstractControl) : ValidationErrors | null {
        let value:string =control.value as string;
        if(TelephoneService.checkIfTelOrMobileStatic(value,"SN")!="FIX"){
            return {phoneFixFormatInvalid:true};
        }
        return null;
    }
   
}
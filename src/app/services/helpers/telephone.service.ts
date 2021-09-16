import { Injectable } from '@angular/core';
import { AsYouType } from 'libphonenumber-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js';
@Injectable({
    providedIn: 'root'
})
export class TelephoneService {
    public checkIfTelOrMobile(numero: string, countryCode: string = 'SN'): string {

        if (countryCode == 'SN') {
            let temp = numero.split(' ');

            if (temp.length == 4) {
                if (temp[0] == '33') {
                    return "FIX";
                } else if (temp[0] == '70' || temp[0] == '76' || temp[0] == '77' || temp[0] == '78') {
                    return "MOBILE";
                } else {
                    return undefined;
                }

            } else if (temp.length == 5) {
                if (temp[1] == '33') {
                    return "FIX";
                } else if (temp[1] == '70' || temp[1] == '76' || temp[1] == '77' || temp[1] == '78') {
                    return "MOBILE";
                } else {
                    return undefined;
                }

            }

        }
        else return undefined;

    }
    public checkIfPhoneNumberIsOk(value: string):boolean {
        let temp = new AsYouType('SN').input(value);
        if (value != "" && value != null && value != undefined) {
            if (!parsePhoneNumberFromString(value, "SN").isValid()) {
                return false;
            }
            return true;
        }
        return false;
    }
    public static checkIfTelOrMobileStatic(numero: string, countryCode: string = 'SN'): string {
        if(numero==null||numero==undefined)return undefined;
        if (countryCode == 'SN') {
            let temp = numero.split(' ');
    
            if (temp.length == 4) {
                if (temp[0] == '33') {
                    return "FIX";
                } else if (temp[0] == '70' || temp[0] == '76' || temp[0] == '77' || temp[0] == '78') {
                    return "MOBILE";
                } else {
                    return undefined;
                }
    
            } else if (temp.length == 5) {
                if (temp[1] == '33') {
                    return "FIX";
                } else if (temp[1] == '70' || temp[1] == '76' || temp[1] == '77' || temp[1] == '78') {
                    return "MOBILE";
                } else {
                    return undefined;
                }
    
            }
    
        }
        else return undefined;
    
    }
    public static checkIfPhoneNumberIsOkStatic(value: string) {
        if(value==null||value==undefined)return false;
        let temp = new AsYouType('SN').input(value);
        if(temp==null||temp==undefined||temp=="") return false;
        if (value != "" && value != null && value != undefined) {
            if(parsePhoneNumberFromString(value, "SN")==null||parsePhoneNumberFromString(value, "SN")==undefined)return false;
            if (!parsePhoneNumberFromString(value, "SN").isValid()) {
                return false;
            }
            return true;
        }
        return false;
    }
}
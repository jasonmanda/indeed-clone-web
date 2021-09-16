import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidateUrlValidator {
    static facebook(control: AbstractControl) : ValidationErrors | null {
        let value:string =control.value as string;
        if(value==null||value==undefined)return null;
        let tab_value:string[]=value.split("web.facebook.com");
        if(tab_value.length<2) return {urlError: true};
        if(tab_value[1]=="" && tab_value.length>1) return {urlError: true};
        tab_value=value.split("https://");
        tab_value=tab_value[1].split("/");
        if(tab_value[1]==""|| tab_value[1]==undefined || tab_value[1]==null) return {urlError: true};
        return null;
    }
    static linkedin(control: AbstractControl) : ValidationErrors | null {
        let value:string =control.value as string;
        if(value==null||value==undefined)return null;
        let tab_value:string[]=value.split("www.linkedin.com");
        if(tab_value.length<2) return {urlError: true};
        if(tab_value[1]=="" && tab_value.length>1) return {urlError: true};
        tab_value=value.split("https://");
        tab_value=tab_value[1].split("/");
        if(tab_value[1]==""|| tab_value[1]==undefined || tab_value[1]==null) return {urlError: true};
        tab_value=value.split("https://");
        tab_value=tab_value[1].split("/");
        if(tab_value[1]==""|| tab_value[1]==undefined || tab_value[1]==null) return {urlError: true};
        return null;
    }
    static twitter(control: AbstractControl) : ValidationErrors | null {
        let value:string =control.value as string;
        if(value==null||value==undefined)return null;
        let tab_value:string[]=value.split("twitter.com");
        if(tab_value.length<2) return {urlError: true};
        if(tab_value[1]=="" && tab_value.length>1) return {urlError: true};
        tab_value=value.split("https://");
        tab_value=tab_value[1].split("/");
        if(tab_value[1]==""|| tab_value[1]==undefined || tab_value[1]==null) return {urlError: true};
        return null;
    }
    static website(control: AbstractControl) : ValidationErrors | null {
        let value:string =control.value as string;
        if(value==null||value==undefined)return null;
        let tab_value:string[]=value.split(".");
        if(tab_value.length<2) return {urlError: true};
        if(tab_value[1]=="" && tab_value.length>1) return {urlError: true};
        return null;
    }
}
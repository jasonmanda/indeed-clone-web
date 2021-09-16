import { FormControl } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class CustomValidatorsService{

    public  is_valid(value:any,validation:any):boolean{
        return new FormControl(value,validation).valid;
    }
    comporeEqDate(date1:Date,date2:Date){
        if(date1.valueOf()==date2.valueOf()){
            return true;
        }
        return false;
    }
    comporeGtDate(date1:Date,date2:Date){
        if(date1.valueOf()>date2.valueOf()){
            return true;
        }
        return false;
    }
    comporeLtDate(date1:Date,date2:Date){
        if(date1.valueOf()<date2.valueOf()){
            return true;
        }
        return false;
    }
}
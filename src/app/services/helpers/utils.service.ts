
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export  class UtilsService{
    public uniqueArray<T>(temp_current:T[]):T[]{
        let i:number=0;
        let j:number=0;
        let current:T[]=[];
        for(i=0;i<temp_current.length;i++){
            let enter=false;
            for(j=0;j<i;j++){
    
              if(temp_current[i]==current[j]){
                enter=true;
                break;
              }
             
            }
            if(!enter){
    
              current.push(temp_current[i]);
            }
          }
          return current;
        }
    }

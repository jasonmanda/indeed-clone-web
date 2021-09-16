import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toArray' })
export class ToArrayPipe implements PipeTransform {
 
    constructor() {
   
    }
    transform(value: string|string[],option:string="avantages"):string[] {
        if(option=="avantages"){
            
            if(!Array.isArray(value)){
                let voffre=(value as string).substr(1,(value as string).length-2);
                let arrayOffre=voffre.split("\"");
                let realArrayOffre:string[]=[];
                for(let i=0;i<arrayOffre.length;i++){
                  if(arrayOffre[i]!="" && arrayOffre[i]!=","){
                    realArrayOffre.push(arrayOffre[i]);
                  }
                }
              
                return realArrayOffre;
              }else{
                  return value;
              }
        }
        return [];
    }
}
 
    
   
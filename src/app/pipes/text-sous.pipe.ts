import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textSous' })
export class TextSousPipe implements PipeTransform {
 
    constructor() {
   
    }
    transform(value: string):string {
        if(value.length>100){
            return value.substr(0,99);
        }
       return value;
    }
}

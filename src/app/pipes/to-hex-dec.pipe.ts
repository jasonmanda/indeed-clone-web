import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toHexDec' })
export class ToHexDecPipe implements PipeTransform {
 
    constructor() {
   
    }
    transform(value: number):string {
       return value.toString(16);
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'step' })
export class StepPipe implements PipeTransform {

    constructor() {

    }
    transform(route: number,  button_type: string): string {
            if(button_type=="continue"){
                if(route==1){
                    return button_type;
                }else if(route==2){
                    return button_type;
                }else if(route==3){
                   
                     return "finish";
                    
                } 
            }else{
                if(route==1){
                    return "";
                }else if(route==2){
                    return button_type;
                    
                }else if(route==3){
                    return button_type;
                    
                }
            }

    }
}


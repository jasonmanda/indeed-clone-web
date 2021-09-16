import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Pipe({ name: 'access' })
export class AccessPipe implements PipeTransform {
 
    constructor(private router: Router,private authService:AuthService) {
   
    }
    transform(value: string): boolean {
        if(value=="home")return true;
        if (this.authService.current_user_grants[value] != undefined && this.authService.current_user_grants[(value)] != null) {


            if (!this.authService.current_user_grants[(value)]) {
                // this.router.navigate(['/user/' + this.current_user.id_utilisateur + '']);
                return false;
            } else {
                return true;
            }
        }
        return false;

    }
}

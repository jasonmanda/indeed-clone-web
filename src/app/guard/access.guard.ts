import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate, CanActivateChild, CanLoad {
   
   
  constructor(private authService:AuthService,private router: Router) {
    
  } 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    if(route.data.role=='PRO' && this.authService.current_user_grants.role.role_name=='ROLE_PROFESSIONNEL'){
      return true;
    }else if(route.data.role=='ENT' && this.authService.current_user_grants.role.role_name=='ROLE_ENTREPRISE'){
      return true;
    }
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {

    let url = `/${route.path}`;
    return true;
  }


}

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Utilisateur } from '../model/Utilisateur';
import { Image } from '../model/Image';
import { Personne } from '../model/Personne';
import { Entreprise } from '../model/Entreprise';
import { Grants } from '../model/Grants';
import { Document } from '../model/Document';
import { Resume } from '../model/Resume';
import { Contact } from '../model/Contact';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLoginAndGrants(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {

    let url = `/${route.path}`;
    return this.checkLoginAndGrants(url);
  }

  checkLoginAndGrants(url: string): boolean {

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    // // Set our navigation extras object
    // // that contains our global query params and fragment
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': sessionId },
    //   fragment: 'anchor'
    // };

    // Navigate to the login page with extras
    // this.router.navigate(['/login'], navigationExtras);
    let ar = url.split('/');
    if (localStorage.getItem('current_user') != "" && localStorage.getItem('current_user_info') != "") {
      this.authService.current_user = JSON.parse(localStorage.getItem('current_user')) as Utilisateur;
      this.authService.current_user_info = JSON.parse(localStorage.getItem('current_user_info')) as Entreprise;
      this.authService.current_user_image = JSON.parse(localStorage.getItem('current_user_image')) as Image;
      this.authService.current_user_document = JSON.parse(localStorage.getItem('current_user_document')) as Resume;
      this.authService.current_user_contact = JSON.parse(localStorage.getItem('current_user_contact')) as Contact;
      this.authService.current_user_grants = JSON.parse(localStorage.getItem('current_user_grants')) as Grants;


      let curr_id = Number(ar[2]);

      if (!isNaN(curr_id)) {
       if(this.authService.current_user==null||this.authService.current_user==undefined)return true;
        if (this.authService.current_user.id_utilisateur != curr_id || this.authService.current_user.personne.id_personne != this.authService.current_user_info.personne.id_personne) {
          let final_url = "";
          ar.map((data: string) => {

            if (data != "") {

              if (Number(data) == curr_id) {
                final_url += "/" + this.authService.current_user.id_utilisateur + "";
              } else {
                final_url += "/" + data + "";
              }
            }
          });

          this.authService.redirectUrl = final_url;
          this.authService.isLoggedIn = true;
          if (url != final_url) {
            this.authService.redirectUrl = final_url;
            localStorage.setItem("update-info", null);
            this.router.navigate([final_url]);


          }

          return true;
        }
      }
    }


    this.authService.isLoggedIn = this.authService.getLoginState();
    if (this.authService.isLoggedIn) {
      let remember = this.cookieService.get("remember");
      let current_user = localStorage.getItem('current_user');
      let current_user_info = localStorage.getItem('current_user_info');

      if (remember == "" || remember == "false" || remember == undefined) {
        if (current_user == "" || current_user_info == "" || remember == undefined) {
          localStorage.setItem("update-info", null);
          this.router.navigate(['/login']);

        } else { 
          if(url=="/" && this.authService.isLoggedIn){
            this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
            return true;
          }else if (url == "/login" && this.authService.isLoggedIn) {
            this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
            return true;
          } else if (url == "/subscribe" && this.authService.isLoggedIn) {
            this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
            return true;
          } else if (url == "/subscribe/type_account" && this.authService.isLoggedIn) {
            this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
            return true;
          } else if (url == "/subscribe/type_account/ent" && this.authService.isLoggedIn) {
            this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
            return true;
          } else if (url == "/subscribe/type_account/ent/finish" && this.authService.isLoggedIn) {
            this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
            return true;
          } else if (url == "/subscribe/type_account/pro" && this.authService.isLoggedIn) {
            this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
            return true;
          } else if (url == "/subscribe/type_account/pro/finish" && this.authService.isLoggedIn) {
            this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
            return true;
          } else if (url == "/reset-password" && this.authService.isLoggedIn) {
            this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
            return true;
          }
        }

      } else {

      }


    } else {
      localStorage.setItem("update-info", null);

      if (url == "/" && !this.authService.isLoggedIn) {
        return true;
      } 
      else if (url == "/login" && !this.authService.isLoggedIn) {
        return true;
      } else if (url == "/subscribe" && !this.authService.isLoggedIn) {
        return true;
      } else if (url == "/subscribe/type_account" && !this.authService.isLoggedIn) {
        return true;
      } else if (url == "/subscribe/type_account/ent" && !this.authService.isLoggedIn) {
        return true;
      } else if (url == "/subscribe/type_account/ent/finish" && !this.authService.isLoggedIn) {
        return true;
      } else if (url == "/subscribe/type_account/pro" && !this.authService.isLoggedIn) {
        return true;
      } else if (url == "/subscribe/type_account/pro/finish" && !this.authService.isLoggedIn) {
        return true;
      } else if (url == "/reset-password" && !this.authService.isLoggedIn) {
        return true;
      }
      this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
    }

    return this.authService.isLoggedIn;


    

  }
  public resetCurrentUserCookie() {
    localStorage.setItem('current_user', null);//, 1, "/");
    localStorage.setItem('current_user_info', null);//, 1, "/");
    localStorage.setItem('current_user_image', null);//, 1, "/");
    localStorage.setItem('current_user_document', null);//, 1, "/");
    // this.cookieService.set("current_user_grants", "", 1, "/");
    localStorage.setItem("current_user_grants", null);
  }
}

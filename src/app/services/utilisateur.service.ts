import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BaseQuery } from '../model/BaseQuery';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { WebConfigService } from './helpers/web-config.service';
import { catchError } from 'rxjs/operators';
import { Utilisateur } from '../model/Utilisateur';
import { Image } from '../model/Image';
import { Entreprise } from '../model/Entreprise';
import { Grants } from '../model/Grants';
import { Contact } from '../model/Contact';

@Injectable({ 
  providedIn: 'root'
})
export class UtilisateurService {
 

  private httpHeaders =new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
});
 private httpParams=new HttpParams();

 
public  isLoggedIn:boolean = false;
   private handleError=(error: HttpErrorResponse)=> {
    // this.resetCurrentUserCookie();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
     
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
 
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  constructor(private authService:AuthService,private http:HttpClient,public cookieService:CookieService,private webConfigService:WebConfigService) {
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;
 
  // private myMethodSubject = new Subject<TickectPrice[]>();
  // public tarifications:Observable<TickectPrice[]>;
  // constructor() {
  //   this.tarifications = this.myMethodSubject.asObservable();
  // }
  
  // myMethod(data) {
  
  //   this.myMethodSubject.next(data);
  // } 
   
    // } 
  

  

  // public test():Observable<any>{
  //   
  //   this.httpParams=new HttpParams().set("api_token",this.authService.current_user.api_token);
  //   return this.http.get<Base_Query>(this.authService.base_url+"reglage/test",{headers:this.httpHeaders,params:this.httpParams}).pipe(
  //     catchError(this.handleError)
  //   );
  // }
 
  public uniqueEmail(id:number,type:string,email:string): Observable<BaseQuery<{exists:boolean}>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("email", email).set("type",type).set("id",id+"");
    return this.http.get<BaseQuery<{exists:boolean}>>(this.authService.base_url + "subscribe/email/exists", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
  public uniqueNomEnt(id:number,type:string,nom_ent:string): Observable<BaseQuery<{exists:boolean}>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("nom_ent", nom_ent).set("type",type).set("id",id+"");
    return this.http.get<BaseQuery<{exists:boolean}>>(this.authService.base_url + "subscribe/nom_ent/exists", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
  public utilisateurSave(data,type:string):Observable<BaseQuery<{   utilisateur:Utilisateur,
    image:Image,
    personne:Entreprise,
    contact:Contact,
    grants:Grants,}>>{
    
    this.httpParams=new HttpParams().set("type",type);
   // headers:this.httpHeaders,
    
    return this.http.post<BaseQuery<{   utilisateur:Utilisateur,
      image:Image,
      personne:Entreprise,
      contact:Contact,
      grants:Grants,}>>(this.authService.base_url+"subscribe",data,{params:this.httpParams, reportProgress: true, observe: 'body'}).pipe(
      catchError(this.handleError)
    );
  }
 
 
public utilisateurUpdate(data:{ entreprise: Entreprise,grants:Grants,image:Image,utilisateur:Utilisateur, oldPwd: string, newPwd: string },type:string,option:string):Observable<BaseQuery<{   utilisateur:Utilisateur,
  image:Image,
  personne:Entreprise,
  contact:Contact,
  grants:Grants}>>{
  
  this.httpParams=new HttpParams().set("type",type).set("option",option).set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
 // headers:this.httpHeaders,
  
  return this.http.post<BaseQuery<{ utilisateur:Utilisateur,
    image:Image,
    personne:Entreprise,
    contact:Contact,
    grants:Grants,}>>(this.authService.base_url+"user/update",data,{params:this.httpParams, reportProgress: true, observe: 'body'}).pipe(
    catchError(this.handleError)
  );
}
  resetCurrentUserCookie() {
    localStorage.setItem('current_user', "");//, 1, "/");
  // this.cookieService.set("current_user_grants", "", 1, "/");
  localStorage.setItem("current_user_grants",null);
}
  
}
 
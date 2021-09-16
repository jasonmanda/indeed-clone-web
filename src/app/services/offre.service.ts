import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { WebConfigService } from './helpers/web-config.service';
import { BaseQuery } from '../model/BaseQuery';
import { catchError } from 'rxjs/operators';
import { Resume } from '../model/Resume';
import { Offre } from '../model/Offre';
import { Postuler } from '../model/Postuler';
import { Favoris } from '../model/Favoris';


@Injectable({
  providedIn: 'root'
})
export class OffreService {
 

  private httpHeaders =new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'p.
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
  public offreList(is_ent:boolean): Observable<BaseQuery<Offre[]>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("is_ent",is_ent+"").set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
    return this.http.get<BaseQuery<Offre[]>>(this.authService.base_url + "offre/list", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
  public offreFavoris(): Observable<BaseQuery<Favoris[]>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
    return this.http.get<BaseQuery<Favoris[]>>(this.authService.base_url + "offre/favoris", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
  public offreById(id_offre:number): Observable<BaseQuery<Offre>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("id_offre",id_offre+"").set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
    return this.http.get<BaseQuery<Offre>>(this.authService.base_url + "offre/get", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
 
  public offrePostulerCount(option:string,id_offre:number,cv_uid:string): Observable<BaseQuery<number>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("option",option).set("cv_uid",cv_uid).set("id_offre",id_offre+"").set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
    return this.http.get<BaseQuery<number>>(this.authService.base_url + "offre/postuler/count", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
  public offrePostulerList(option:string,id_offre:number,cv_uid:string): Observable<BaseQuery<Postuler[]>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("option",option).set("cv_uid",cv_uid).set("id_offre",id_offre+"").set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
    return this.http.get<BaseQuery<Postuler[]>>(this.authService.base_url + "offre/postuler/list", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
  public offreFavorisCount(option:string,id_offre:number,cv_uid:string): Observable<BaseQuery<number>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("option",option).set("cv_uid",cv_uid).set("id_offre",id_offre+"").set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
    return this.http.get<BaseQuery<number>>(this.authService.base_url + "offre/favoris/count", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
 
  public offreDelete(id_offre:number): Observable<BaseQuery<Offre>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("id_offre",id_offre+"").set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
    return this.http.get<BaseQuery<Offre>>(this.authService.base_url + "offre/delete", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
  public offreSave(data,is_ent:boolean):Observable<BaseQuery<Offre>>{
    
    this.httpParams=new HttpParams().set("is_ent",is_ent+"").set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);

   // headers:this.httpHeaders,
    
    return this.http.post<BaseQuery<Offre>>(this.authService.base_url+"offre/save",data,{params:this.httpParams, reportProgress: true, observe: 'body'}).pipe(
      catchError(this.handleError)
    );
  }
  public offrePostulerSave(id_offre:number,cv_uid:string):Observable<BaseQuery<Postuler>>{
    
    this.httpParams=new HttpParams().set("cv_uid",cv_uid).set("id_offre",id_offre+"").set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);

   // headers:this.httpHeaders,
    
    return this.http.post<BaseQuery<Postuler>>(this.authService.base_url+"offre/postuler/save",{},{params:this.httpParams, reportProgress: true, observe: 'body'}).pipe(
      catchError(this.handleError)
    );
  }

  public offrePostulerRetenue(postuler:Postuler[]):Observable<BaseQuery<{status:boolean}>>{
    
    this.httpParams=new HttpParams().set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);

   // headers:this.httpHeaders,
    
    return this.http.post<BaseQuery<{status:boolean}>>(this.authService.base_url+"offre/postuler/retenue",postuler,{params:this.httpParams, reportProgress: true, observe: 'body'}).pipe(
      catchError(this.handleError)
    );
  }
 

  public offreSearch(what:string,where:string): Observable<BaseQuery<Offre[]>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("what",what).set("where",where).set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
    return this.http.get<BaseQuery<Offre[]>>(this.authService.base_url + "offre/search", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
  
  public offreFavorisSave(option:string,id_offre:number,cv_uid:string):Observable<BaseQuery<Favoris>>{
    
    this.httpParams=new HttpParams().set("option",option).set("cv_uid",cv_uid).set("id_offre",id_offre+"").set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);

   // headers:this.httpHeaders,
    
    return this.http.post<BaseQuery<Favoris>>(this.authService.base_url+"offre/favoris/save",{},{params:this.httpParams, reportProgress: true, observe: 'body'}).pipe(
      catchError(this.handleError)
    );
  }
  resetCurrentUserCookie() {
    localStorage.setItem('current_user', "");//, 1, "/");
  // this.cookieService.set("current_user_grants", "", 1, "/");
  localStorage.setItem("current_user_grants",null);
}

public offreSoumission(): Observable<BaseQuery<Postuler[]>> {
   
  // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
  this.httpParams = new HttpParams().set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
  return this.http.get<BaseQuery<Postuler[]>>(this.authService.base_url + "offre/soumission", { headers: this.httpHeaders, params: this.httpParams }).pipe(
    catchError(this.handleError)
  );
}
  
}
 
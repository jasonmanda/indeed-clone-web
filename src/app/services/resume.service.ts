import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { WebConfigService } from './helpers/web-config.service';
import { BaseQuery } from '../model/BaseQuery';
import { catchError } from 'rxjs/operators';
import { Resume } from '../model/Resume';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {
 

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
  public resumeSave(data):Observable<BaseQuery<Resume>>{
    
    this.httpParams=new HttpParams().set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);

   // headers:this.httpHeaders,
    
    return this.http.post<BaseQuery<Resume>>(this.authService.base_url+"resume/save",data,{params:this.httpParams, reportProgress: true, observe: 'body'}).pipe(
      catchError(this.handleError)
    );
  }
  public resumeGet(cv_uid:string): Observable<BaseQuery<Resume>> {
   
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("cv_uid",cv_uid).set("api_token", this.authService.current_user==null?null:this.authService.current_user.api_token);
    return this.http.get<BaseQuery<Resume>>(this.authService.base_url + "resume/get", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
  resetCurrentUserCookie() {
    localStorage.setItem('current_user', "");//, 1, "/");
  // this.cookieService.set("current_user_grants", "", 1, "/");
  localStorage.setItem("current_user_grants",null);
}
  
}
 
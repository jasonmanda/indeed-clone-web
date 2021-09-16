import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BaseQuery } from '../model/BaseQuery';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { WebConfigService } from './helpers/web-config.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 

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

 
  public uniqueContact(id:number,type:string="add",val:{key:string,value:string}[]): Observable<BaseQuery<{exists:boolean}>[]> {
    
    // this.httpParams = new HttpParams().set("api_token", this.authService.current_user.api_token).set("id_role", id_role.toString()).set("etat_role", etat_role + "");
    this.httpParams = new HttpParams().set("type",type).set("id",id+"");
    return this.http.post<BaseQuery<{exists:boolean}>[]>(this.authService.base_url + "contact/exists/multi", val,{ headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }
 
 
  resetCurrentUserCookie() {
    localStorage.setItem('current_user', "");//, 1, "/");
  // this.cookieService.set("current_user_grants", "", 1, "/");
  localStorage.setItem("current_user_grants",null);
}
  
}
 
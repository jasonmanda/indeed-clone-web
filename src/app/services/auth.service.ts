import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Utilisateur } from '../model/Utilisateur';
import { BaseQuery } from '../model/BaseQuery';
import { CookieService } from 'ngx-cookie-service';
import { Grants } from '../model/Grants';
import { WebConfigService } from './helpers/web-config.service';
import { Image } from '../model/Image';
import { Personne } from '../model/Personne';
import { Entreprise } from '../model/Entreprise';
import { Document } from '../model/Document';
import { Resume } from '../model/Resume';
import { Contact } from '../model/Contact';
 
 
 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  });
  ///GuestAccount
  // login:guest

  ///Base declaration
  private httpParams = new HttpParams();
  public redirectUrl: string;
 
  public current_user: Utilisateur;
  public current_user_info: Entreprise;
  public current_user_image: Image;
  public current_user_document: Resume;
  public current_user_contact: Contact;
  public current_user_grants: Grants;
  public isLoggedIn: boolean = false;
  public isAuthorize: boolean = false;
  public base_url = null;
  public base_host = null;
  public folder_key:string = null;
  ///Base declaration
  private handleError = (error: HttpErrorResponse) => {
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

  constructor(private http: HttpClient, public cookieService: CookieService,private webConfigService:WebConfigService) {
    this.base_url=this.webConfigService.data['remote_api_host'];
    this.base_host=this.webConfigService.data['local_host'];
    this.folder_key = this.webConfigService.data['folder_key'];
    if(localStorage.getItem("current_user")!=null && localStorage.getItem("current_user")!=undefined && localStorage.getItem("current_user")!="")this.current_user=JSON.parse(localStorage.getItem("current_user")) as Utilisateur;
    else this.current_user=null;
    if(localStorage.getItem("current_user_info")!=null && localStorage.getItem("current_user_info")!=undefined && localStorage.getItem("current_user_info")!="")this.current_user_info=JSON.parse(localStorage.getItem("current_user_info")) as Entreprise;
    else this.current_user_info=null;
    if(localStorage.getItem("current_user_image")!=null && localStorage.getItem("current_user_image")!=undefined && localStorage.getItem("current_user_image")!="")this.current_user_image=JSON.parse(localStorage.getItem("current_user_image")) as Image;
    else this.current_user_image=null;
    if(localStorage.getItem("current_user_document")!=null && localStorage.getItem("current_user_document")!=undefined && localStorage.getItem("current_user_document")!="")this.current_user_document=JSON.parse(localStorage.getItem("current_user_document")) as Resume;
    else this.current_user_document=null;
    if(localStorage.getItem("current_user_contact")!=null && localStorage.getItem("current_user_contact")!=undefined && localStorage.getItem("current_user_contact")!="")this.current_user_contact=JSON.parse(localStorage.getItem("current_user_contact")) as Contact;
    else this.current_user_contact=null;
    if(localStorage.getItem("current_user_grants")!=null && localStorage.getItem("current_user_grants")!=undefined && localStorage.getItem("current_user_grants")!="")this.current_user_grants=JSON.parse(localStorage.getItem("current_user_grants")) as Grants;
    else this.current_user_grants=null;
  }


  login(utilisateur: Utilisateur): Observable<BaseQuery<{
    image:Image,
    personne:Entreprise,
    utilisateur:Utilisateur,
    document:Resume,
    contact:Contact,
    grants:Grants,
  }>> {
    // this.httpParams=new HttpParams().set("api_token",this.api_token);t
    return this.http.post<BaseQuery<{
      image:Image,
      personne:Entreprise,
      utilisateur:Utilisateur,
      document:Resume,
      contact:Contact,
      grants:Grants,
    }>>(this.base_url + "login", utilisateur, { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }

  updateInfo(): Observable<BaseQuery<  { image:Image, personne:Entreprise, utilisateur:Utilisateur, grants:Grants,document:Resume,contact:Contact, }>> {
    this.httpParams=new HttpParams().set("api_token",this.current_user.api_token);
    return this.http.get<BaseQuery<{ image:Image, personne:Entreprise, utilisateur:Utilisateur, grants:Grants,document:Resume,contact:Contact, }>>(this.base_url + "user/update_info", { headers: this.httpHeaders, params: this.httpParams }).pipe(
      catchError(this.handleError)
    );
  }


  // private myMethodSubject = new Subject<TickectPrice[]>();
  // public tarifications:Observable<TickectPrice[]>;
  // constructor() {
  //   this.tarifications = this.myMethodSubject.asObservable();
  // }

  // myMethod(data) {

  //   this.myMethodSubject.next(data);
  // }
  getLoginState(): boolean {

    let res = (localStorage.getItem('current_user'));
    let res1 = (localStorage.getItem('current_user_info'));
    let res2 = (localStorage.getItem('current_user_image'));
    let res3 = (localStorage.getItem('current_user_grants'));
    let res4 = (localStorage.getItem('current_user_document'));
    let res5 = (localStorage.getItem('current_user_contact'));

    if ((res == "" || res == "undefined" || res == "null" || res == null || res == undefined)||(res1 == "" || res1 == "undefined" || res1 == "null" || res1 == null || res1 == undefined)) {

      localStorage.setItem('current_user', (res));//,1,"/");
      localStorage.setItem('current_user_info', (res1));//,1,"/");
      localStorage.setItem('current_user_image', (res2));//,1,"/");
      localStorage.setItem('current_user_document', (res4));//,1,"/");
      localStorage.setItem('current_user_contact', (res5));//,1,"/");
      localStorage.setItem('current_user_grants', (res3));//,1,"/");
       res = ((this.cookieService.get("validate")));
      this.cookieService.set("validate", (res), 1, "/");
      res = ((this.cookieService.get("erreur_mssg")));
      this.cookieService.set("erreur_mssg", (res), 1, "/");
      res = ((this.cookieService.get("remember")));
      this.cookieService.set("remember", (res), 1, "/");

      return false;
    } else {
      let json=JSON.parse(res);
      if(json==null)return false;
      if(json.password==null||json.password==undefined){
        localStorage.setItem('current_user', (res));//,1,"/");
        localStorage.setItem('current_user_info', (res1));//,1,"/");
        localStorage.setItem('current_user_image', (res2));//,1,"/");
      localStorage.setItem('current_user_document', (res4));//,1,"/");
      localStorage.setItem('current_user_contact', (res5));//,1,"/");
        localStorage.setItem('current_user_grants', (res3));//,1,"/");
        res = ((this.cookieService.get("validate")));
  
        this.cookieService.set("validate", (res), 1, "/");
        res = ((this.cookieService.get("erreur_mssg")));
  
        this.cookieService.set("erreur_mssg", (res), 1, "/");
  
  
        res = ((this.cookieService.get("remember")));
  
        this.cookieService.set("remember", (res), 1, "/");
        return true;
      }else{
        localStorage.setItem('current_user', (res));//,1,"/");
        localStorage.setItem('current_user_info', (res1));//,1,"/");
        localStorage.setItem('current_user_image', (res2));//,1,"/");
        localStorage.setItem('current_user_document', (res4));//,1,"/");
        localStorage.setItem('current_user_contact', (res5));//,1,"/");
        localStorage.setItem('current_user_grants', (res3));//,1,"/");
         res = ((this.cookieService.get("validate")));
        this.cookieService.set("validate", (res), 1, "/");
        res = ((this.cookieService.get("erreur_mssg")));
        this.cookieService.set("erreur_mssg", (res), 1, "/");
        res = ((this.cookieService.get("remember")));
        this.cookieService.set("remember", (res), 1, "/");
        return false;
      }


    }




  }

  logout(): void {
    this.isLoggedIn = false;
  }
  resetCurrentUserCookie() {
    localStorage.setItem('current_user', "");//, 1, "/");
    // this.cookieService.set("current_user_grants", "", 1, "/");
    localStorage.setItem("current_user_grants", null);
  }

 
}

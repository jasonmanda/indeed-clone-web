import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router,  } from '@angular/router';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { Image } from 'src/app/model/Image';
import { Grants } from 'src/app/model/Grants';
import * as $ from 'jquery';
import { Entreprise } from 'src/app/model/Entreprise';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { Document } from 'src/app/model/Document';
import { Resume } from 'src/app/model/Resume';
import { Contact } from 'src/app/model/Contact';


export interface DialogData {

  text: String
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ///Form declaration
  form: FormGroup;
  email: FormControl = new FormControl(null, Validators.required);
  password: FormControl = new FormControl(null, Validators.required);
  confirmPassword: FormControl = new FormControl(null);
  oldPassword: FormControl = new FormControl(null);
  remember: FormControl = new FormControl(false);
  ///Form declaration

  ///Base declaration
 
  ///Base declaration
  businessReglageHelpersService:BusinessReglageHelpersService;
  constructor(public dialog: MatDialog,
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router) {

    this.loadForm();
      this.businessReglageHelpersService=new BusinessReglageHelpersService();
  }


  loadForm() {
    ///Init form
    this.form = new FormGroup(
      {
        email: this.email,
        password: this.password,
        oldPassword:this.oldPassword,
        confirmPassword:this.confirmPassword,
        remember: this.remember
      }

    );
  }
  ///Open modal popup

  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }



  ngOnInit() {

    // $("body").css("backgroundColor","#f2f2f2");
 
  }

  onSubmit(form_value) {
 
    this.authService.current_user = form_value as Utilisateur;

    this.authService.login(this.authService.current_user).subscribe((data: BaseQuery<{
      image: Image,
      personne: Entreprise,
      utilisateur: Utilisateur,
      document: Resume,
      contact:Contact,
      grants: Grants,
    }>) => { 
 
      this.authService.isLoggedIn = data.validate;

      if (data.data.utilisateur == undefined || data.data.utilisateur == null) {
        this.openMessageDialog("Connexion impossible",data.erreur_mssg,"ok");
        this.clear();

      } else {

        this.authService.current_user = data.data.utilisateur as Utilisateur;
        this.authService.current_user_info = data.data.personne as Entreprise;
        this.authService.current_user_image = data.data.image as Image;
        this.authService.current_user_document = data.data.document as Resume;
        this.authService.current_user_contact = data.data.contact as Contact;
        this.authService.current_user_grants = data.data.grants as Grants;
        if (this.authService.isLoggedIn == true) {

          if ((this.authService.current_user == null || this.authService.current_user == undefined) || (this.authService.current_user_info == null || this.authService.current_user_info == undefined)) {
            localStorage.setItem('current_user', null)//, 1, "/");
            localStorage.setItem('current_user_info', null)//, 1, "/");
            localStorage.setItem('current_user_image', null)//, 1, "/");
            localStorage.setItem('current_user_document', null)//, 1, "/");
            localStorage.setItem('current_user_contact', null)//, 1, "/");
            // this.cookieService.set("current_user_grants", "", 1, "/");
            localStorage.setItem("current_user_grants", null);
          } else {
            localStorage.setItem('current_user', JSON.stringify(this.authService.current_user));//, 1, "/");
            localStorage.setItem('current_user_info', JSON.stringify(this.authService.current_user_info));//, 1, "/");
            localStorage.setItem('current_user_image', JSON.stringify(this.authService.current_user_image));//, 1, "/");
            localStorage.setItem('current_user_document', JSON.stringify(this.authService.current_user_document));//, 1, "/");
            localStorage.setItem('current_user_contact', JSON.stringify(this.authService.current_user_contact));//, 1, "/");
            // this.cookieService.set("current_user_grants", JSON.stringify(this.authService.current_user_grants)), 1, "/");
            localStorage.setItem("current_user_grants", JSON.stringify(this.authService.current_user_grants));


          }

          this.cookieService.set("validate", (data.validate.toString()), 1, "/");
          this.cookieService.set("erreur_mssg", (data.erreur_mssg), 1, "/");
          this.cookieService.set("remember", (form_value.remember), 1, "/");

        } else {
          localStorage.setItem('current_user',null);//, 1, "/");
          localStorage.setItem('current_user_info',null);//, 1, "/");
          localStorage.setItem('current_user_image',null);//, 1, "/");
          localStorage.setItem('current_user_document',null);//, 1, "/");
          localStorage.setItem('current_user_contact',null);//, 1, "/");
          // this.cookieService.set("current_user_grants", "", 1, "/");
          localStorage.setItem("current_user_grants", null);
          this.cookieService.set("validate", (data.validate.toString()), 1, "/");
          this.cookieService.set("erreur_mssg", (data.erreur_mssg), 1, "/");

          this.cookieService.set("remember", (form_value.remember), 1, "/");
        }
        if (this.authService.isLoggedIn) {
          this.authService.current_user = JSON.parse(localStorage.getItem('current_user')) as Utilisateur;
          this.authService.current_user_info = JSON.parse(localStorage.getItem('current_user_info')) as Entreprise;
          this.authService.current_user_image = JSON.parse(localStorage.getItem('current_user_image')) as Image;
          this.authService.current_user_document = JSON.parse(localStorage.getItem('current_user_document')) as Resume;
          this.authService.current_user_contact = JSON.parse(localStorage.getItem('current_user_contact')) as Contact;
          this.authService.current_user_grants = JSON.parse(localStorage.getItem('current_user_grants')) as Grants;

          localStorage.setItem("update-info", null);
          this.router.navigate(['/user/'+this.authService.current_user.id_utilisateur]);

        } else {
          this.openMessageDialog("Connexion impossible",data.erreur_mssg,"ok");

            this.clear();
        }
      }



    });
  }
clear(){
    localStorage.setItem("current_user",null);
    localStorage.setItem("current_user_info",null);
    localStorage.setItem("current_user_image",null);
    localStorage.setItem("current_user_document",null);
    localStorage.setItem("current_user_contact",null);
    localStorage.setItem("current_user_grants",null);
    this.cookieService.delete("validate");
    this.cookieService.delete("erreur_mssg");
    this.cookieService.delete("remember");
 
}
 
}
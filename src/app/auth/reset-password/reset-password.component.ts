import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { Image } from 'src/app/model/Image';
import { Grants } from 'src/app/model/Grants';
import * as $ from 'jquery';
 

export interface DialogData {

  text: String
}


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  ///Form declaration
  form: FormGroup;
  email: FormControl = new FormControl(null, Validators.required);
  password: FormControl = new FormControl(null, Validators.required);
  remember: FormControl = new FormControl(false);
  ///Form declaration

  ///Base declaration
 
 
  ///Base declaration
  constructor(public dialog: MatDialog,
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router) {

      this.loadForm();
    
  }


  loadForm(){
        ///Init form
        this.form = new FormGroup(
          {
            email: this.email,
            password: this.password,
            remember: this.remember
          }
    
        );
  }
 


  ngOnInit() { 
    
    // $("body").css("backgroundColor","#f2f2f2");
 
  }

  onSubmit(form_value) {
   
 
    // this.authService.current_user = form_value as Utilisateur;
    
    // this.authService.login(this.authService.current_user).subscribe((data: Base_Query) => {
    //   this.authService.base_Query = data;
    //   this.authService.isLoggedIn = data.validate; 
      
    //   if(data.data.utilisateur==undefined || data.data.utilisateur==null){
    //     this.openDialog("Authentification impossible");
    //   }else{
         
    //     this.authService.current_user = data.data.utilisateur as Utilisateur;
    //     this.authService.current_user_info = data.data.personne as Personne;
    //     this.authService.current_user_image = data.data.image as Image;
    //     this.authService.current_user_document = data.data.document as Resume;
    //     this.authService.current_user_contact= data.data.contact as Contact;
    //     this.authService.current_user_grants = data.data.grants as Grants;
    //     if (this.authService.isLoggedIn == true) {
    //       if ((this.authService.current_user == null || this.authService.current_user == undefined) || (this.authService.current_user_info == null || this.authService.current_user_info == undefined)) {
    //         localStorage.setItem('current_user',"")//, 1, "/");
    //         localStorage.setItem('current_user_info',"")//, 1, "/");
    //         localStorage.setItem('current_user_image',"")//, 1, "/");
    //         localStorage.setItem('current_user_document',"")//, 1, "/");
    //         localStorage.setItem('current_user_contact',"")//, 1, "/");
    //         // this.cookieService.set("current_user_grants", "", 1, "/");
    //         localStorage.setItem("current_user_grants",null);
    //       } else {
    //         localStorage.setItem('current_user', (JSON.stringify(this.authService.current_user)));//, 1, "/");
    //         localStorage.setItem('current_user_info', (JSON.stringify(this.authService.current_user_info)));//, 1, "/");
    //         localStorage.setItem('current_user_image', (JSON.stringify(this.authService.current_user_image)));//, 1, "/");
    //         localStorage.setItem('current_user_document', (JSON.stringify(this.authService.current_user_document)));//, 1, "/");
    //         localStorage.setItem('current_user_contact', (JSON.stringify(this.authService.current_user_contact)));//, 1, "/");
    //         // this.cookieService.set("current_user_grants", (JSON.stringify(this.authService.current_user_grants)), 1, "/");
    //         localStorage.setItem("current_user_grants", (JSON.stringify(this.authService.current_user_grants)));
             
  
    //       }
      
    //       this.cookieService.set("validate", (this.authService.base_Query.validate.toString()), 1, "/");
    //       this.cookieService.set("erreur_mssg", (this.authService.base_Query.erreur_mssg), 1, "/");
    //       this.cookieService.set("remember", (form_value.remember), 1, "/");
  
    //     } else {
    //       localStorage.setItem('current_user', "");//, 1, "/");
    //       localStorage.setItem('current_user_info', "");//, 1, "/");
    //       localStorage.setItem('current_user_image', "");//, 1, "/");
    //       localStorage.setItem('current_user_document', "");//, 1, "/");
    //       localStorage.setItem('current_user_contact', "");//, 1, "/");
    //       // this.cookieService.set("current_user_grants", "", 1, "/");
    //       localStorage.setItem("current_user_grants",null);
    //       this.cookieService.set("validate", (this.authService.base_Query.validate.toString()), 1, "/");
    //       this.cookieService.set("erreur_mssg", (this.authService.base_Query.erreur_mssg), 1, "/");
     
    //       this.cookieService.set("remember", (form_value.remember), 1, "/");
    //     }
    //     if (this.authService.isLoggedIn) {
    //       this.authService.current_user = JSON.parse((localStorage.getItem('current_user'))) as Utilisateur;
    //       this.authService.current_user_info = JSON.parse((localStorage.getItem('current_user_info'))) as Personne;
    //       this.authService.current_user_image= JSON.parse((localStorage.getItem('current_user_image'))) as Image;
    //       this.authService.current_user_document= JSON.parse((localStorage.getItem('current_user_document'))) as Resume;
    //       this.authService.current_user_contact= JSON.parse((localStorage.getItem('current_user_contact'))) as Resume;
      
    //       localStorage.setItem("update-info", null);
    //       this.router.navigate(['/user/' + this.authService.current_user.id_utilisateur + '']);
  
    //     } else {
    //       this.openDialog((this.cookieService.get("erreur_mssg")));
         
          
    //     }
    //   }



    // });
  }

 
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router,  ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { Image } from 'src/app/model/Image';
import { Grants } from 'src/app/model/Grants';
import * as $ from 'jquery';
import { PasseDataService } from 'src/app/services/passe-data.service';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { map } from 'rxjs/internal/operators/map';
import { Entreprise } from 'src/app/model/Entreprise';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from 'src/app/model/Contact';


export interface DialogData {

  text: String
}


@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class SubscribeStepOneComponent implements OnInit {
 
  ///Form declaration
  form: FormGroup;
  email: FormControl = new FormControl(null, Validators.compose([Validators.email, Validators.required]));
  password: FormControl = new FormControl(null, Validators.required);
  confirmPassword: FormControl = new FormControl(null);
  oldPassword: FormControl = new FormControl(null);
  remember: FormControl = new FormControl(false);
  ///Form declaration 
  data_type:string="";
  ///Base declaration
  businessReglageHelpersService:BusinessReglageHelpersService;
  ///Base declaration
  is_ent:boolean=false;
  constructor(public dialog: MatDialog,
    private cookieService: CookieService,
    private authService: AuthService,    
    private utilisateurService: UtilisateurService,
    private _snackBar:MatSnackBar,
    private router: Router,public route:ActivatedRoute) {
    route.data.subscribe((data)=>{
       this.data_type=data.type;
       if(this.data_type=="edit"){
        if(this.authService.current_user_info.id_entreprise==null||
          this.authService.current_user_info.id_entreprise==undefined||
          this.authService.current_user_info.id_entreprise==0||
           this.authService.current_user_info.id_entreprise==-1){
             this.is_ent=false;
       }else{
         this.is_ent=true;

       }
       }
    });
    this.loadForm();
    this.businessReglageHelpersService=new BusinessReglageHelpersService();

  }


  loadForm() {
    ///Init form
    this.form = new FormGroup(
      {
        email: this.email,
        password: this.password,
        oldPassword: this.oldPassword,
        confirmPassword: this.confirmPassword,
        remember: this.remember
      }

    );
  }
 


  ngOnInit() {

    
      if(this.data_type=="add")localStorage.setItem("sign_in", "step-one");
      
      this.loadValue(this.authService.current_user);
    


  }

  onSubmit(form_value) {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': "killerbees" },
    //   replaceUrl:true
    // };
    if(this.form.valid){
      let id:number=this.data_type=="add"?null:this.authService.current_user.id_utilisateur;
 
      this.utilisateurService.uniqueEmail(id,this.data_type,this.email.value).subscribe((data:BaseQuery<{exists:boolean}>)=>{
          if(data.validate){
            if(data.data!=null && data.data!=undefined){
              if(data.data.exists){
                this.openMessageDialog("Erreur vérification email",data.erreur_mssg,"ok");
               
              }else{
                // {
                //   email: this.email,
                //   password: this.password,
                //   remember: this.remember
                // }
                if(this.data_type=="add"){
                  localStorage.setItem("current_user",JSON.stringify(form_value));
                  localStorage.setItem("sign_in","step-two");
                  this.router.navigate(["/subscribe/type_account"]);
               
                }else{
                  if(this.confirmPassword.value!=this.password.value)return this.openMessageDialog("Erreur mot de passe","Le nouveau mot de passe ne se ressemble pas","ok")
         
                  let datas: { entreprise: Entreprise,grants:Grants,image:Image,utilisateur:Utilisateur,contact:Contact, oldPwd: string, newPwd: string } = 
                  { entreprise: this.authService.current_user_info,
                    grants:this.authService.current_user_grants,
                    image:this.authService.current_user_image,
                    utilisateur:this.authService.current_user,
                    contact:this.authService.current_user_contact,
                     oldPwd: null, newPwd: null };
                     datas.utilisateur.email=this.email.value;
                     datas.oldPwd=this.oldPassword.value;
                     datas.newPwd=this.confirmPassword.value;

                     this.utilisateurService.utilisateurUpdate(datas, this.is_ent ? "entreprise" : "professionnel", "user_password").subscribe((data: BaseQuery<{
                      utilisateur: Utilisateur,
                      image: Image,
                      personne: Entreprise,
                      grants: Grants,
                    }>) => {
                      if (data.validate) {
                        if (data.data != null && data.data != undefined) {
                    
                          this.authService.current_user = data.data.utilisateur;
                          this.authService.current_user_info = data.data.personne;
                          this.authService.current_user_image = data.data.image;
                          // // this.authService.current_user_document=data.data.document;
                          // // this.authService.current_user_contact=data.data.contact;
                          this.authService.current_user_grants = data.data.grants;
                          localStorage.setItem("current_user_image", JSON.stringify(data.data.image));
                    
                          localStorage.setItem("current_user_info", JSON.stringify(data.data.personne));
                          localStorage.setItem("current_user_grants", JSON.stringify(data.data.grants));
                          localStorage.setItem("current_user", JSON.stringify(data.data.utilisateur));
                    
                    
                          let message: string = "La mise à jour des informations à réussi";
                    
                          this._snackBar.open(message, null, {
                            duration: 1000
                          });
                    
                    
                          localStorage.setItem("update-info", null);
                    
                    
                        } else {
                          this.openMessageDialog("Erreur de mise à jour", "Erreur serveur", "ok");
                    
                        }
                      } else {
                        this.openMessageDialog("Erreur de mise à jour", data.erreur_mssg, "ok");
                    
                      }
                    });
                      
                }
               
              }
            }else{
              this.openMessageDialog("Erreur vérification email","Erreur serveur","ok");

            }
          }else{
            this.openMessageDialog("Erreur vérification email",data.erreur_mssg,"ok");
          }
      });
    } 
 
 
  }
  ///Open Modal  Popup
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }
  loadValue(value){
    if(value!=null && value!=undefined){
      this.email.setValue(value.email);
      this.password.setValue(value.password);
      this.remember.setValue(value.remember);
      if(this.data_type=="edit"){
        this.password.reset();
        this.confirmPassword.reset();
        this.oldPassword.reset();
      }
    }

  }
 
} 
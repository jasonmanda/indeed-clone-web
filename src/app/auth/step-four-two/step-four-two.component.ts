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
import { PasseDataService } from 'src/app/services/passe-data.service';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioButton } from '@angular/material/radio';
import { Observable } from 'rxjs/internal/Observable';
import { VilleDatabase } from 'src/app/model/VilleDatabase';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { ValidateSnTelValidator } from 'src/app/validator/validate-sn-tel-validator';
import { ValidateUrlValidator } from 'src/app/validator/validate-url-validator';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ImageService } from 'src/app/services/helpers/image.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { ContactService } from 'src/app/services/contact.service';
import { Entreprise } from 'src/app/model/Entreprise';
import { Personne } from 'src/app/model/Personne';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from 'src/app/model/Contact';

export interface DialogData {

  text: String
}


@Component({
  selector: 'app-step-four-two',
  templateUrl: './step-four-two.component.html',
  styleUrls: ['./step-four-two.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
}) 
export class SubscribeStepFourTwoComponent implements OnInit {

  ///Form declaration
  ///Form declaration
  kronos_logo: string = this.authService.base_host + "assets/template/kronos_logo_1.jpg";
  image: any;
  account: any;
  grants: any;
  user: any;
  info: any;
  hold: boolean = false;
  businessReglageHelpersService: BusinessReglageHelpersService;

  ///Base declaration
  ///Base declaration
  constructor(public dialog: MatDialog,
    private cookieService: CookieService,
    private authService: AuthService,
    private imageService: ImageService,
    private utilisateurService: UtilisateurService,
    private contactService: ContactService,
    private _snackBar: MatSnackBar,
    private router: Router, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    registerLocaleData(fr);
    this.businessReglageHelpersService = new BusinessReglageHelpersService();
  }






  ngOnInit() {
    // $("body").css("backgroundColor","#f2f2f2");
    let erreur_mssg = (this.cookieService.get("erreur_mssg"));
    let current_user = (localStorage.getItem('current_user'));
    let current_user_info = (localStorage.getItem('current_user_info'));
    let current_type_account = (localStorage.getItem('current_type_account'));
    
    let current_user_image = (localStorage.getItem('current_user_image'));
    // // let current_user_document = (localStorage.getItem('current_user_document'));
    // // let current_user_contact = (localStorage.getItem('current_user_contact'));
    let current_user_grants = (localStorage.getItem('current_user_grants'));
    let remember = this.cookieService.get("remember");
 
        this.loadValue(
          JSON.parse(current_user_image),
          JSON.parse(current_type_account),
          JSON.parse(current_user_grants),
          JSON.parse(current_user),
          JSON.parse(current_user_info),
        );
  

   
    localStorage.setItem("sign_in", "step-four-one");

  }

  onSubmit(option: string) {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': "killerbees" }, 
    //   replaceUrl:true
    // };
    if (option == "back") {
      localStorage.setItem("sign_in", "step-three-two");
      localStorage.setItem("update-info", null);
      this.router.navigate(['/subscribe/type_account/pro']);
    } else {
      this.hold = true;
      this.utilisateurService.uniqueEmail(null, "add", this.user.email).subscribe((data: BaseQuery<{ exists: boolean }>) => {
        if (data.validate) {
          if (data.data != null && data.data != undefined) {
            if (data.data.exists) {
              this.openMessageDialog("Erreur vérification email", data.erreur_mssg, "ok");
              this.hold = false;

            } else {
              ///
              this.hold = true;
              let data = {
                user: this.user,
                image: this.image,
                grants: {
                  role: {
                    role_name: this.grants.role.role_name
                  }
                },
                entreprise: {
                  personne: {
                    nom_personne: this.info.personne.nom_personne,
                    prenom_personne: this.info.personne.prenom_personne,
                    ville: {
                      nom_ville: this.info.personne.ville.nom_ville,
                    }
                  },
                  ville: null
                },
              };
            
              this.utilisateurService.utilisateurSave(data, "professionnel").subscribe((data: BaseQuery<{
                utilisateur:Utilisateur,
                image:Image,
                personne:Entreprise,
                contact:Contact,
                grants:Grants, 
              }>) => {
                if (data.validate) {
                  if (data.data != null && data.data != undefined) {
                  this.hold=false;
                    this.authService.current_user=data.data.utilisateur;
                    this.authService.current_user_info=data.data.personne;
                    this.authService.current_user_image=data.data.image;
                    // // this.authService.current_user_document=data.data.document;
                    // // this.authService.current_user_contact=data.data.contact;
                    this.authService.current_user_grants=data.data.grants;
                    localStorage.setItem("current_user_image",JSON.stringify(data.data.image));
                    // // localStorage.setItem("current_user_document",JSON.stringify(data.data.document));
                   localStorage.setItem("current_user_contact",JSON.stringify(data.data.contact));
                    localStorage.setItem("current_user_info",JSON.stringify(data.data.personne));
                    localStorage.setItem("current_user_grants",JSON.stringify(data.data.grants));
                    localStorage.setItem("current_user",JSON.stringify(data.data.utilisateur));
                  
                    localStorage.setItem("current_type_account",null);
                    localStorage.setItem("sign_in",null);
                   
                    this._snackBar.open("Bienvenue "+this.authService.current_user_info.personne.nom_personne+" "+this.authService.current_user_info.personne.prenom_personne,null,{
                      duration: 1000
                    });
                    this.hold=true;
            
                    setTimeout(()=>{
                    localStorage.setItem("update-info", null);
                    this.router.navigate(["/user/"+this.authService.current_user.id_utilisateur]);
                      
                    },1250);
            
                  } else {
                    this.openMessageDialog("Erreur d'inscription", "Erreur serveur", "ok");
                  this.hold=false;
            
                  }
                } else {
                  this.openMessageDialog("Erreur d'inscription", data.erreur_mssg, "ok");
                  this.hold=false;
            
                }
              });
            
           
              ///
            }
          } else {
            this.openMessageDialog("Erreur vérification email", "Erreur serveur", "ok");
            this.hold = false;

          }
        } else {
          this.openMessageDialog("Erreur vérification email", data.erreur_mssg, "ok");
          this.hold = false;

        }
      });
      // console.log(this.contact);
      // console.log(this.image);
      // console.log(this.account);
      // console.log(this.grants);
      // console.log(this.user); 
      // console.log(this.info);

    }


  }

  validate(data: BaseQuery<{ exists: boolean }>, ok: { ok: boolean }) {
    if (data.validate) {
      if (data.data != null && data.data != undefined) {
        if (data.data.exists) {

          this.openMessageDialog("Erreur vérification", data.erreur_mssg, "ok");
          this.hold = true;
          ok.ok = false;
        } else {

          this.hold = false;


        }
      } else {
        this.openMessageDialog("Erreur vérification", "Erreur serveur", "ok");
        this.hold = true;
        ok.ok = false;

      }
    } else {
      this.openMessageDialog("Erreur vérification", data.erreur_mssg, "ok");
      this.hold = true;
      ok.ok = false;

    }
  }

  public _filter(value: string, options: string[]): string[] {
    if (value == null) return [];
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
  public loadValue( current_user_image, current_type_account, current_user_grants, current_user, current_user_info) {
    this.image = current_user_image;
    this.account = current_type_account;
    this.grants = current_user_grants;
    this.user = current_user;
    this.info = current_user_info;
    if (this.image == null || this.image == undefined) {
      this.kronos_logo = this.authService.base_host + "assets/template/kronos_logo_1.jpg";
    } else {
      this.kronos_logo = this.imageService.getDocumentPath(this.image.path_image);

    }
  }
  ///Open Modal  Popup
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }
} 
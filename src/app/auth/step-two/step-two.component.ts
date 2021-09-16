import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { Image } from 'src/app/model/Image';
import { Grants } from 'src/app/model/Grants';
import * as $ from 'jquery';
import { PasseDataService } from 'src/app/services/passe-data.service';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioButton } from '@angular/material/radio';
import { Role } from 'src/app/model/Role';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { ImageService } from 'src/app/services/helpers/image.service';
import { ReglageService } from 'src/app/services/reglage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Entreprise } from 'src/app/model/Entreprise';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from 'src/app/model/Contact';


export interface DialogData {

  text: String
}


@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class SubscribeStepTwoComponent implements OnInit {

  ///Form declaration
  form: FormGroup;
  type_account: FormControl = new FormControl(null);// constraint remove//, Validators.required);
  nom_ent: FormControl = new FormControl();
  cab_recrutement: FormControl = new FormControl(false);
  ///Form declaration

  form_upload_file: FormGroup;
  ///File upload declaration
  fichier: FormControl = new FormControl(null);
  ///File upload declaration
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  kronos_logo: string = this.authService.base_host + "assets/template/kronos_logo_1.jpg";
  current_image: Image = null;
  businessReglageHelpersService: BusinessReglageHelpersService;
  hold: boolean = false;
  data_type:string="";
  is_ent:boolean=false;
  ///Base declaration
  
 
  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    public imageService: ImageService,
    public _snackBar: MatSnackBar,
    public utilisateurService: UtilisateurService,
    public passeDataService:PasseDataService,
    public reglageService: ReglageService,public route:ActivatedRoute) {
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

    this.businessReglageHelpersService = new BusinessReglageHelpersService();

  }


  loadForm() {
    ///Init form
    this.form = new FormGroup(
      {
        type_account: this.type_account,
        nom_ent: this.nom_ent,
        cab_recrutement: this.cab_recrutement,
      }

    );
  }



  ngOnInit() {
    this.loadForm();
    this.loadUploadForm();

    // $("body").css("backgroundColor","#f2f2f2");
    if(this.data_type=="add"){ 
      let current_type_account = (localStorage.getItem('current_type_account'));
      let current_user_image = (localStorage.getItem('current_user_image'));
      // // let current_user_document = (localStorage.getItem('current_user_document'));
      // // let current_user_contact = (localStorage.getItem('current_user_contact'));
      this.loadValue(JSON.parse(current_type_account), JSON.parse(current_user_image));
      localStorage.setItem("sign_in", "step-two");
    }else{
     
      let current_user_image = (localStorage.getItem('current_user_image'));
 
      let vtype_account:string=this.authService.current_user_grants.role.role_name=="ROLE_PROFESSIONNEL"?"professionnel":"entreprise";
      this.loadValue({type_account:vtype_account},  JSON.parse(current_user_image));
      try{
        this.passeDataService.imageObservable.subscribe((data:Image)=>{
          if (data == null || data == undefined) {
            this.kronos_logo = this.authService.base_host + "assets/template/kronos_logo_1.jpg";
          } else {
            this.kronos_logo = this.imageService.getDocumentPath(data.path_image);
      
          }
        });
      }catch(error){
        console.log(error);
      }
    }
  



  }

  onSubmit(form_value, option: string) {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': "killerbees" },
    //   replaceUrl:true
    // };
    if (option == "back") {
      localStorage.setItem("sign_in", "step-one");
      localStorage.setItem("update-info", null);
      this.router.navigate(['/subscribe']);
    } 
    else if(option=="next") {
      if (form_value.type_account == "entreprise") {



        if (this.form.valid) {
          this.hold = true;   
          this.utilisateurService.uniqueNomEnt(null, "add", this.nom_ent.value).subscribe((data: BaseQuery<{ exists: boolean }>) => {
            if (data.validate) {
              if (data.data != null && data.data != undefined) {
                if (data.data.exists) {
                  this.hold = false;
                  this.openMessageDialog("Erreur vérification nom de l'entreprise", data.erreur_mssg, "ok");

                } else {
                  setTimeout(() => {
                    this.hold = false;
                    localStorage.setItem("sign_in", "step-three-one");
                    localStorage.setItem("current_type_account", JSON.stringify(form_value));
                    localStorage.setItem("current_user_image", JSON.stringify(this.current_image));
                    localStorage.setItem("current_user_document", null);
                    localStorage.setItem("current_user_contact", null);
                    let grants: Grants = new Grants();
                    grants.role = new Role();
                    grants.role.role_name = "ROLE_ENTREPRISE";
                    localStorage.setItem("current_user_grants", JSON.stringify(grants));
                    localStorage.setItem("update-info", null);
                    this.router.navigate(['/subscribe/type_account/ent']);
                  }, 50);

                }
              } else {
                this.openMessageDialog("Erreur vérification nom de l'entreprise", "Erreur serveur", "ok");
                this.hold = false;

              }
            } else {
              this.openMessageDialog("Erreur vérification nom de l'entreprise", data.erreur_mssg, "ok");
              this.hold = false;
            }
          });
        }


      } else if (form_value.type_account == "professionnel") {
        localStorage.setItem("sign_in", "step-three-two"); 
        localStorage.setItem("current_type_account", JSON.stringify(form_value));
        localStorage.setItem("current_user_image", JSON.stringify(this.current_image));
        localStorage.setItem("current_user_document", null);
        localStorage.setItem("current_user_contact", null);
        let grants: Grants = new Grants();
        grants.role = new Role();
        grants.role.role_name = "ROLE_PROFESSIONNEL";
        localStorage.setItem("current_user_grants", JSON.stringify(grants));
        localStorage.setItem("update-info", null);
        this.router.navigate(['/subscribe/type_account/pro']);

      }

    }
    else if(option=="update") {
      let id:number=this.authService.current_user.id_utilisateur;
 
      if (form_value.type_account == "entreprise") {

        if (this.form.valid) {
          this.hold = true;   
          this.utilisateurService.uniqueNomEnt(id, "update", this.nom_ent.value).subscribe((data: BaseQuery<{ exists: boolean }>) => {
            if (data.validate) {
              if (data.data != null && data.data != undefined) {
                if (data.data.exists) {
                  this.hold = false;
                  this.openMessageDialog("Erreur vérification nom de l'entreprise", data.erreur_mssg, "ok");

                } else {  
                   this.hold = false;
            
                   let datas: { entreprise: Entreprise,grants:Grants,image:Image,utilisateur:Utilisateur,contact:Contact, oldPwd: string, newPwd: string } = 
                   { entreprise: this.authService.current_user_info,
                     grants:this.authService.current_user_grants,
                     image:this.authService.current_user_image,
                     contact:this.authService.current_user_contact,
                     utilisateur:this.authService.current_user,
                      oldPwd: null, newPwd: null };
                      datas.entreprise.nom=this.nom_ent.value;
                      datas.entreprise.cab_recrutement=this.cab_recrutement.value;
                      if(!datas.entreprise.etat_entreprise)datas.entreprise.etat_entreprise=true;
                      datas.grants.role.role_name="ROLE_ENTREPRISE";
                    datas.image=this.current_image;
                    this.is_ent=true;
           
                    this.utilisateurService.utilisateurUpdate(datas, "entreprise" , "user_grants_image").subscribe((data: BaseQuery<{
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
                          if (this.authService.current_user_image == null || this.authService.current_user_image == undefined) {
                            this.kronos_logo = this.authService.base_host + "assets/template/kronos_logo_1.jpg";
                          } else {
                            this.kronos_logo = this.imageService.getDocumentPath(this.authService.current_user_image.path_image);
                      
                          }
                         
                          localStorage.setItem("current_user_image", JSON.stringify(data.data.image));
                    
                          localStorage.setItem("current_user_info", JSON.stringify(data.data.personne));
                          localStorage.setItem("current_user_grants", JSON.stringify(data.data.grants));
                          localStorage.setItem("current_user", JSON.stringify(data.data.utilisateur));
                          this.passeDataService.myUpdateInfoSubject(true);
                          this.passeDataService.myMainNavSubject(true);
                          this.passeDataService.myAnonymousTypeSubject(true);
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
              } else {
                this.openMessageDialog("Erreur vérification nom de l'entreprise", "Erreur serveur", "ok");
                this.hold = false;

              }
            } else {
              this.openMessageDialog("Erreur vérification nom de l'entreprise", data.erreur_mssg, "ok");
              this.hold = false;
            }
          });
        }


      } else if (form_value.type_account == "professionnel") {
   
        if (this.form.valid) {
          this.hold = true;   
        
                   let datas: { entreprise: Entreprise,grants:Grants,image:Image,utilisateur:Utilisateur, oldPwd: string, newPwd: string } = 
                   { entreprise: this.authService.current_user_info,
                     grants:this.authService.current_user_grants,
                     image:this.authService.current_user_image,
                     utilisateur:this.authService.current_user,
                      oldPwd: null, newPwd: null };
                      
                      datas.grants.role.role_name="ROLE_PROFESSIONNEL";
                    datas.image=this.current_image;
                    this.is_ent=false;
                   this.utilisateurService.utilisateurUpdate(datas,  "professionnel", "user_grants_image").subscribe((data: BaseQuery<{
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
                        if (this.authService.current_user_image == null || this.authService.current_user_image == undefined) {
                          this.kronos_logo = this.authService.base_host + "assets/template/kronos_logo_1.jpg";
                        } else {
                          this.kronos_logo = this.imageService.getDocumentPath(this.authService.current_user_image.path_image);
                    
                        }
                   
                        localStorage.setItem("current_user_image", JSON.stringify(data.data.image));
                  
                        localStorage.setItem("current_user_info", JSON.stringify(data.data.personne));
                        localStorage.setItem("current_user_grants", JSON.stringify(data.data.grants));
                        localStorage.setItem("current_user", JSON.stringify(data.data.utilisateur));
                        this.passeDataService.myUpdateInfoSubject(true);
                        this.passeDataService.myMainNavSubject(true);
                        this.passeDataService.myAnonymousTypeSubject(true);
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
      

    }




  }
  changeTypeAccount($event: MatRadioButton) {
    if ($event.value == "entreprise") {
      setTimeout(() => {
        this.nom_ent.setValidators(Validators.required);

        setTimeout(() => {
          this.hold = false;
          this.loadForm();
          localStorage.setItem("publishResumeBlock",false+"");
          localStorage.setItem("publishEntAnnounceBlock",true+"");
          this.kronos_logo = this.authService.base_host + "assets/template/kronos_logo_1.jpg";
      
          if(this.data_type=="edit"){
          localStorage.setItem("current_user_image", null);
          }
          this.passeDataService.myUpdateInfoSubject(true);
          this.passeDataService.myMainNavSubject(true);
          this.passeDataService.myAnonymousTypeSubject(true);
        }, 50);
      }
        , 50);


    } else if ($event.value == "professionnel") {
      setTimeout(() => {
        this.nom_ent.clearValidators();
        setTimeout(() => {
          this.nom_ent.setValue(null);
          setTimeout(() => {
            this.cab_recrutement.setValue(false);
            setTimeout(() => {
              this.hold = false;

              this.loadForm();
              localStorage.setItem("publishResumeBlock",true+"");
              localStorage.setItem("publishEntAnnounceBlock",false+"");
              this.kronos_logo = this.authService.base_host + "assets/template/kronos_logo_1.jpg";
        
              if(this.data_type=="add"){
                localStorage.setItem("current_user_image", null);
                localStorage.setItem("current_user_document", null);
                localStorage.setItem("current_user_contact", null);
                localStorage.setItem("current_user_info", null);
                localStorage.setItem("current_user_grants", null);
                localStorage.setItem("current_type_account", null); 
              }else{
                localStorage.setItem("current_user_image", null);
    

              }

              this.passeDataService.myUpdateInfoSubject(true);
              this.passeDataService.myMainNavSubject(true);
              this.passeDataService.myAnonymousTypeSubject(true);
            }, 50);
          }, 50);
        }, 50);

      }, 50);


    }

  }


  ///Init file_upload
  public loadUploadForm() {
    this.form_upload_file = new FormGroup({
      fichier: this.fichier,
    });
  }


  ///Check the image extension and validate when user change the logo
  public logoChange(event, option) {

    this.businessReglageHelpersService.logoChange(event, option, { component: this });
    // this.businessReglageHelpersService.logoChange(event, 'professionnelle', { component: this });

  }
  ///Remove image when user click on red circle x and update database
  public removeImg() {
    this.businessReglageHelpersService.removeImg({ component: this });
  }
 
  loadValue(value, image: Image) {
    
    if (value != null && value != undefined) {
      this.type_account.setValue(value.type_account);
      if(this.data_type=='add'){
        this.nom_ent.setValue(value.nom_ent);
        this.cab_recrutement.setValue(value.cab_recrutement);
      }else{
        this.nom_ent.setValue(this.authService.current_user_info.nom);
        this.cab_recrutement.setValue(this.authService.current_user_info.cab_recrutement);
      }

    }
    if (image == null || image == undefined) {
      this.kronos_logo = this.authService.base_host + "assets/template/kronos_logo_1.jpg";
    } else {
      this.kronos_logo = this.imageService.getDocumentPath(image.path_image);

    }
  
  }
  ///Open Modal  Popup
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }

} 
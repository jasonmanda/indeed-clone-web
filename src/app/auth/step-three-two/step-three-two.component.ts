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
import { Observable } from 'rxjs/internal/Observable';
import { VilleDatabase } from 'src/app/model/VilleDatabase';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { ValidateSnTelValidator } from 'src/app/validator/validate-sn-tel-validator';
import { ValidateUrlValidator } from 'src/app/validator/validate-url-validator';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Entreprise } from 'src/app/model/Entreprise';
import { Contact } from 'src/app/model/Contact';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { Ville } from 'src/app/model/Ville';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface DialogData {

  text: String
}


@Component({
  selector: 'app-step-three-two',
  templateUrl: './step-three-two.component.html',
  styleUrls: ['./step-three-two.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class SubscribeStepThreeTwoComponent implements OnInit {

  ///Form declaration
  form: FormGroup;
  nom: FormControl = new FormControl(null);// constraint remove//, Validators.required);
  prenom: FormControl = new FormControl(null);// constraint remove//, Validators.required);
  where: FormControl = new FormControl(null);// constraint remove//, Validators.required);
  
  ///Form declaration
 

  ///Base declaration
  filteredOptions: Observable<string[]>;
  listVilles: string[] = [];
  ///Base declaration
  data_type:string="";
  is_ent:boolean=false;
  hold: boolean = false;
  businessReglageHelpersService: BusinessReglageHelpersService;
  constructor(public dialog: MatDialog,
    private cookieService: CookieService,
    private authService: AuthService,
    private utilisateurService:UtilisateurService,
    private _snackBar:MatSnackBar,
    private passeDataService:PasseDataService,
    private router: Router,private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer,public route:ActivatedRoute) {
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
     this.businessReglageHelpersService=new BusinessReglageHelpersService();
  }


  loadForm() {
    ///Init form
    this.form = new FormGroup(
      {
        nom: this.nom,
        prenom: this.prenom,
        where: this.where,
      }

    );
  }
 


  ngOnInit() {
    this.loadForm();

    this.listVilles = VilleDatabase.DATA;
    this.filteredOptions = this.where.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.listVilles))
      );
        
    // $("body").css("backgroundColor","#f2f2f2");
    let current_user_info = (localStorage.getItem('current_user_info'));

    this.loadValue(JSON.parse(current_user_info));
    if(this.data_type=="add"){
    localStorage.setItem("sign_in", "step-three-two");

    }
 
  }
  loadValue(value) {

    if (value != null && value != undefined) {
      this.nom.setValue(value.personne.nom_personne);
      this.prenom.setValue(value.personne.prenom_personne);
      this.where.setValue(value.personne.ville.nom_ville);
    }


  }
  onSubmit(form_value, option: string) {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': "killerbees" },
    //   replaceUrl:true
    // };
    if (option == "back") {
      localStorage.setItem("sign_in", "step-two");
      localStorage.setItem("update-info", null);

      this.router.navigate(['/subscribe/type_account']);
    } else if(option=="next") {

      localStorage.setItem("sign_in", "step-four-two");
      localStorage.setItem("current_user_info", JSON.stringify({
        personne:{
          nom_personne:form_value.nom,
          prenom_personne:form_value.prenom,
          ville:{
          nom_ville:form_value.where,
        }
        },
    
      }));
      localStorage.setItem("update-info", null);

      this.router.navigate(['/subscribe/type_account/pro/finish']);


    }else if(option=="update") {
      let id:number=this.authService.current_user.id_utilisateur;

      if (this.form.valid) {
        this.hold = true;
    
        let datas: { entreprise: Entreprise,grants:Grants,image:Image,utilisateur:Utilisateur,contact:Contact, oldPwd: string, newPwd: string } = 
        { entreprise: this.authService.current_user_info,
          grants:this.authService.current_user_grants,
          image:this.authService.current_user_image,
          utilisateur:this.authService.current_user,
          contact:this.authService.current_user_contact,
           oldPwd: null, newPwd: null };
       
        datas.entreprise.personne.nom_personne = form_value.nom;
        datas.entreprise.personne.prenom_personne = form_value.prenom;
      
        datas.entreprise.personne.ville.nom_ville = form_value.where;
    
   

        this.utilisateurService.utilisateurUpdate(datas, "professionnel" , "user_info").subscribe((data: BaseQuery<{
          utilisateur: Utilisateur,
          image: Image, 
          personne: Entreprise,
          contact: Contact,
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
              
        
        
              localStorage.setItem("current_user_info", JSON.stringify(data.data.personne));
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



  public _filter(value: string, options: string[]): string[] {
    if (value == null) return [];
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ///Open Modal  Popup
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }
} 
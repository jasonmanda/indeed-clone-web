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
import { ContactService } from 'src/app/services/contact.service';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { Contact } from 'src/app/model/Contact';
import { Entreprise } from 'src/app/model/Entreprise';
import { Personne } from 'src/app/model/Personne';
import { Ville } from 'src/app/model/Ville';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface DialogData {

  text: String
}
 

@Component({
  selector: 'app-step-three-one',
  templateUrl: './step-three-one.component.html',
  styleUrls: ['./step-three-one.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class SubscribeStepThreeOneComponent implements OnInit {

  ///Form declaration
  form: FormGroup;
  nom_pic: FormControl = new FormControl(null, Validators.required);
  prenom_pic: FormControl = new FormControl(null, Validators.required);
  domaine: FormControl = new FormControl(null);
  taille: FormControl = new FormControl(null);
  capital: FormControl = new FormControl(null, Validators.compose([Validators.required, Validators.min(0), Validators.pattern("[0-9]\\d*(\\.\\d+)?$")]));
  description: FormControl = new FormControl(null, Validators.compose([Validators.required, Validators.minLength(30)]));
  where: FormControl = new FormControl(null, Validators.required);

  facebook: FormControl = new FormControl(null, Validators.compose([Validators.pattern(/[(http(s)?)://(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/), ValidateUrlValidator.facebook]));
  linkedin: FormControl = new FormControl(null, Validators.compose([Validators.pattern(/[(http(s)?)://(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/), ValidateUrlValidator.linkedin]));
  mail: FormControl = new FormControl(null, Validators.compose([Validators.email, Validators.required]));
  numero: FormControl = new FormControl(null, Validators.compose([Validators.required, ValidateSnTelValidator.snValidFixMobileOk, ValidateSnTelValidator.snValidFixOk]));
  twitter: FormControl = new FormControl(null, Validators.compose([Validators.pattern(/[(http(s)?)://(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/), ValidateUrlValidator.twitter]));
  website: FormControl = new FormControl(null, Validators.compose([Validators.pattern(/[(http(s)?)://(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/), ValidateUrlValidator.website]));
  ///Form declaration

  size: { key: string, value: string }[] = [{ key: "1-49", value: "1-49" }, { key: "50-149", value: "50-149" }, { key: "150-249", value: "150-249" }, { key: "250-499", value: "250-499" }, { key: "500-749", value: "500-749" }, { key: "750-999", value: "750-999" }, { key: "1000+", value: "1000+" }];

  domaines: { key: string, value: string }[] = [ { key: "Aérospatiale et défense", value: "Aérospatiale et défense" }, { key: "Agriculture et extraction", value: "Agriculture et extraction" }, { key: "Automobile", value: "Automobile" }, { key: "Banque et finance", value: "Banque et finance" }, { key: "Électronique et électrotechnique", value: "Électronique et électrotechnique" }, { key: "Construction", value: "Construction" }, { key: "Consulting et services aux entreprises", value: "Consulting et services aux entreprises" }, { key: "Biens et services de consommation", value: "Biens et services de consommation" }, { key: "Enseignement et formation", value: "Enseignement et formation" }, { key: "Énergie", value: "Énergie" }, { key: "Restauration et débit de boissons", value: "Restauration et débit de boissons" }, { key: "Administration", value: "Administration" }, { key: "Médical", value: "Médical" }, { key: "Ressources humaines et recrutement", value: "Ressources humaines et recrutement" }, { key: "Production et fabrication industrielles", value: "Production et fabrication industrielles" }, { key: "Assurance", value: "Assurance" }, { key: "Numérique et développement informatique", value: "Numérique et développement informatique" }, { key: "Médias et communication", value: "Médias et communication" }, { key: "Organisation", value: "Organisation" }, { key: "Pharmaceutique", value: "Pharmaceutique" }, { key: "Immobilier", value: "Immobilier" }, { key: "Hôtellerie, tourisme et divertissements", value: "Hôtellerie, tourisme et divertissements" }, { key: "Commerce de détail", value: "Commerce de détail" }, { key: "Télécommunications", value: "Télécommunications" }, { key: "Transport de biens ou de personnes", value: "Transport de biens ou de personnes" },];
  ///Base declaration
  filteredOptions: Observable<string[]>;
  listVilles: string[] = [];
  hold: boolean = false;
  businessReglageHelpersService: BusinessReglageHelpersService;
  data_type:string="";
  is_ent:boolean=false;
  ///Base declaration
  constructor(public dialog: MatDialog,
    private cookieService: CookieService,
    private authService: AuthService,
    private contactService: ContactService,
    public route:ActivatedRoute,
    private utilisateurService:UtilisateurService,
    private passeDataService:PasseDataService,
    private _snackBar:MatSnackBar,
    private router: Router, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {

    this.loadForm();
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.authService.base_host + 'assets/facebook.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'twitter',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.authService.base_host + 'assets/twitter.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.authService.base_host + 'assets/linkedin.svg')
    );
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
        nom_pic: this.nom_pic,
        prenom_pic: this.prenom_pic,
        domaine: this.domaine,
        taille: this.taille,
        capital: this.capital,
        description: this.description,
        where: this.where,
        facebook: this.facebook,
        linkedin: this.linkedin,
        mail: this.mail,
        numero: this.numero,
        twitter: this.twitter,
        website: this.website
      }

    );
  }


  ngOnInit() {
    this.listVilles = VilleDatabase.DATA;
    this.filteredOptions = this.where.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.listVilles))
      );
      let current_user_info = (localStorage.getItem('current_user_info'));
      let current_user_contact = (localStorage.getItem('current_user_contact'));
    // $("body").css("backgroundColor","#f2f2f2");
        if(this.data_type=="add"){
  
          this.loadValue(JSON.parse(current_user_info),JSON.parse(current_user_contact));
          localStorage.setItem("sign_in", "step-three-one");
        }else{
       
          this.loadValue(JSON.parse(current_user_info),JSON.parse(current_user_contact));
      
        }


  }
  loadValue(value, contact) {

    if (value != null && value != undefined) {
   
        this.nom_pic.setValue(value.personne.nom_personne);
        this.prenom_pic.setValue(value.personne.prenom_personne);
        this.domaine.setValue(value.domaine);
        this.taille.setValue(value.taille);
        this.capital.setValue(value.capital);
        this.description.setValue(value.description);
        this.where.setValue(value.ville==null?null:value.ville.nom_ville);
      

    }

    if (contact != null && contact != undefined) {
    this.facebook.setValue(contact.facebook);
    this.linkedin.setValue(contact.linkedin);
    this.mail.setValue(contact.mail);
    this.numero.setValue(contact.numero);
    this.twitter.setValue(contact.twitter);
    this.website.setValue(contact.website);
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
    } 
    else if(option=="next") {
      if (this.form.valid) {
        this.hold = true;

        this.contactService.uniqueContact(null, "add", [
          { key: "facebook", value: this.facebook.value },
          { key: "mail", value: this.mail.value },
          { key: "linkedin", value: this.linkedin.value },
          { key: "twitter", value: this.twitter.value },
          { key: "website", value: this.website.value },
          { key: "numero", value: this.numero.value },
        ]).subscribe((datas: BaseQuery<{ exists: boolean }>[]) => {
          let ok: { ok: boolean } = { ok: true };
          datas.map((data: BaseQuery<{ exists: boolean }>) => {
            this.validate(data, ok);
          });
          if (ok.ok) {

            let entreprise: Entreprise = new Entreprise();
            entreprise.personne = new Personne();
            entreprise.personne.nom_personne = form_value.nom_pic;
            entreprise.personne.prenom_personne = form_value.prenom_pic;
            entreprise.domaine = form_value.domaine;
            entreprise.taille = form_value.taille;
            entreprise.description = form_value.description;
            entreprise.capital = form_value.capital;
            entreprise.ville = new Ville();
            entreprise.ville.nom_ville = form_value.where;
            let contact: Contact = new Contact();
            contact.facebook = form_value.facebook;
            contact.linkedin = form_value.linkedin;
            contact.mail = form_value.mail;
            contact.numero = form_value.numero;
            contact.twitter = form_value.twitter;
            contact.website = form_value.website;


            localStorage.setItem("sign_in", "step-four-one");
            localStorage.setItem("current_user_info", JSON.stringify(entreprise));
            localStorage.setItem("current_user_contact", JSON.stringify(contact));
            localStorage.setItem("update-info", null);
            this.router.navigate(['/subscribe/type_account/ent/finish']);
          }else{
            this.hold=true;
          }
        });
      }



    } else if(option=="update") {
      let id:number=this.authService.current_user.id_utilisateur;

      if (this.form.valid) {
        this.hold = true;
        this.contactService.uniqueContact(id, "edit", [
          { key: "facebook", value: this.facebook.value },
          { key: "mail", value: this.mail.value },
          { key: "linkedin", value: this.linkedin.value },
          { key: "twitter", value: this.twitter.value },
          { key: "website", value: this.website.value },
          { key: "numero", value: this.numero.value },
        ]).subscribe((datas: BaseQuery<{ exists: boolean }>[]) => {
          let ok: { ok: boolean } = { ok: true };
          datas.map((data: BaseQuery<{ exists: boolean }>) => {
            this.validate(data, ok);
          });
          if (ok.ok) {
 
            let datas: { entreprise: Entreprise,grants:Grants,image:Image,utilisateur:Utilisateur,contact:Contact, oldPwd: string, newPwd: string } = 
            { entreprise: this.authService.current_user_info,
              grants:this.authService.current_user_grants,
              image:this.authService.current_user_image,
              utilisateur:this.authService.current_user,
              contact:this.authService.current_user_contact,
               oldPwd: null, newPwd: null };
               if(datas.contact==null||datas.contact==undefined){
                datas.contact=new Contact();
                datas.contact.etat_contact=true;
              }
              if(datas.entreprise.ville==null||datas.entreprise.ville==undefined){
                datas.entreprise.ville=new Ville();
                datas.entreprise.ville.etat_ville=true;
              }
           
            datas.entreprise.personne.nom_personne = form_value.nom_pic;
            datas.entreprise.personne.prenom_personne = form_value.prenom_pic;
            datas.entreprise.domaine = form_value.domaine;
            datas.entreprise.taille = form_value.taille;
            datas.entreprise.description = form_value.description;
            datas.entreprise.capital = form_value.capital;
          
            datas.entreprise.ville.nom_ville = form_value.where;
        
            datas.contact.facebook = form_value.facebook;
            datas.contact.linkedin = form_value.linkedin;
            datas.contact.mail = form_value.mail;
            datas.contact.numero = form_value.numero;
            datas.contact.twitter = form_value.twitter;
            datas.contact.website = form_value.website;

 
            datas.entreprise.contact=datas.contact;

            this.utilisateurService.utilisateurUpdate(datas, "entreprise" , "user_info").subscribe((data: BaseQuery<{
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
                  localStorage.setItem("current_user_contact", JSON.stringify(data.data.contact));
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
          }else{
            this.hold=true;
          }
        });
      }



    }


  }
  validate(data: BaseQuery<{ exists: boolean }>, ok: { ok: boolean }) {
    if (data.validate) {
      if (data.data != null && data.data != undefined) {
        if (data.data.exists) {

          this.openMessageDialog("Erreur vérification", data.erreur_mssg, "ok");
          this.hold = false;
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
      this.hold = false;
      ok.ok = false;

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
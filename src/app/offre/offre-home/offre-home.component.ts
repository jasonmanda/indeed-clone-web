import { Component, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Image } from 'src/app/model/Image';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { StepPipe } from 'src/app/pipes/step.pipe';
import { Observable } from 'rxjs/internal/Observable';
import { VilleDatabase } from 'src/app/model/VilleDatabase';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter'
import { OffreService } from 'src/app/services/offre.service';
import { Offre } from 'src/app/model/Offre';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Personne } from 'src/app/model/Personne';
import { Entreprise } from 'src/app/model/Entreprise';
import { Ville } from 'src/app/model/Ville';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ToArrayPipe } from 'src/app/pipes/to-array.pipe';
@Component({ 
  selector: 'app-offre-home',
  templateUrl: './offre-home.component.html',
  styleUrls: ['./offre-home.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },
  {provide:ToArrayPipe},
  {provide:StepPipe},
  
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }]
})
export class OffreHomeComponent implements OnInit {


  back:string="";
  continue:string="";
  index:number=1;

  ///Form declaration
  form_step_one: FormGroup;
  nom_ent: FormControl = new FormControl();
  cab_recrutement: FormControl = new FormControl(false);
  poste: FormControl = new FormControl(null);
  where: FormControl = new FormControl(null);
  taille: FormControl = new FormControl(null);
  type_contrat: FormControl = new FormControl(null);
  type_emp: FormControl = new FormControl(null);
  salaire: FormControl = new FormControl(null,Validators.compose([Validators.min(0),Validators.pattern("[0-9]\\d*(\\.\\d+)?$")]));
  salaire_type: FormControl = new FormControl("par heure");
  salaire_min: FormControl = new FormControl(null,Validators.compose([Validators.min(0),Validators.pattern("[0-9]\\d*(\\.\\d+)?$")]));
  salaire_max: FormControl = new FormControl(null,Validators.compose([Validators.min(0),Validators.pattern("[0-9]\\d*(\\.\\d+)?$")]));
  salaire_model: FormControl =  new FormControl();
  no_salaire: FormControl =  new FormControl();
  avantages: FormControl =  new FormControl();
  cv_require: FormControl =  new FormControl();
  test_compet: FormControl = new FormControl();
  date_debut: FormControl = new FormControl();
  date_limit: FormControl = new FormControl();
  description: FormControl = new FormControl(null, Validators.compose([Validators.required, Validators.minLength(30)]));
  date_immediat: FormControl = new FormControl(false);

  size: { key: string, value: string }[] = [{ key: "1-49", value: "1-49" }, { key: "50-149", value: "50-149" }, { key: "150-249", value: "150-249" }, { key: "250-499", value: "250-499" }, { key: "500-749", value: "500-749" }, { key: "750-999", value: "750-999" }, { key: "1000+", value: "1000+" }];

  hold: boolean = false;
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  businessReglageHelpersService: BusinessReglageHelpersService;
  filteredOptions: Observable<string[]>;
  listVilles:string[];
  current_user_offre:Offre=new Offre();
  is_ent:boolean=false;
  offres:string="/";
  ///Show or hide Hamburger button
  base_link:string="/";
  ///Base declaration 
 public is_add_update:boolean=false;
  constructor(public dialog: MatDialog,
    private stepPipe: StepPipe,
    private authService: AuthService,
    private router: Router,
    private offreService:OffreService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public toArrayPipe:ToArrayPipe
  ) {
    registerLocaleData(fr);
     this.back= this.stepPipe.transform(this.index,"back");
     this.continue= "continue";//this.stepPipe.transform("step_one","continue");
     
    this.route.params.subscribe(params=>{
      if(params.offre_id!=null && params.offre_id!=undefined){
        this.is_add_update=false;
        if(this.authService.current_user_info.id_entreprise==null||
          this.authService.current_user_info.id_entreprise==undefined||
          this.authService.current_user_info.id_entreprise==0||
           this.authService.current_user_info.id_entreprise==-1){
             this.is_ent=false;
       }else{
         this.is_ent=true;

       }
        this.offreService.offreById(params.offre_id).subscribe((data:BaseQuery<Offre>)=>{
          if (data.validate) {
            if (data.data != null && data.data != undefined) {
             
              this.current_user_offre=data.data;

              this.nom_ent.setValue(this.current_user_offre.nom_ent);
              this.cab_recrutement.setValue(this.current_user_offre.cab_recrutement);
              this.poste.setValue(this.current_user_offre.poste);
              this.where.setValue(this.current_user_offre.localite.nom_ville);
              this.taille.setValue(this.current_user_offre.taille);
              this.type_contrat.setValue(this.current_user_offre.type_contrat);
              this.type_emp.setValue(this.current_user_offre.type_emp);
              this.salaire.setValue(this.current_user_offre.salaire);
              this.salaire_type.setValue(this.current_user_offre.salaire_type);
              this.salaire_min.setValue(this.current_user_offre.salaire_min);
              this.salaire_max.setValue(this.current_user_offre.salaire_max);
              this.salaire_model.setValue(this.current_user_offre.salaire_model);
              this.no_salaire.setValue(this.current_user_offre.no_salaire);
              // let voffre=this.current_user_offre.avantages.substr(1,this.current_user_offre.avantages.length-2);
              // let arrayOffre=voffre.split("\""); 
              // let realArrayOffre:string[]=[];
              // for(let i=0;i<arrayOffre.length;i++){
              //   if(arrayOffre[i]!="" && arrayOffre[i]!=","){
              //     realArrayOffre.push(arrayOffre[i]);
              //   }
              // }
              // this.avantages.setValue(realArrayOffre);
              
              this.avantages.setValue(this.toArrayPipe.transform(this.current_user_offre.avantages));
              this.cv_require.setValue(this.current_user_offre.cv_require);
              this.test_compet.setValue(this.current_user_offre.test_compet);
              this.date_debut.setValue(new Date(this.current_user_offre.date_debut));
              this.date_limit.setValue(new Date(this.current_user_offre.date_limit));
              this.description.setValue(this.current_user_offre.description);
              this.date_immediat.setValue(this.current_user_offre.date_immediat);
              
            } else {
              this.openMessageDialog("Erreur durant le chargement", "Erreur serveur", "ok");
            this.hold=false;
      
            }
          } else {
            this.openMessageDialog("Erreur durant le chargement", data.erreur_mssg, "ok");
            this.hold=false;
      
          }
        });
      }else{
        this.is_add_update=true;
         
        if(this.authService.current_user_info.id_entreprise==null||
           this.authService.current_user_info.id_entreprise==undefined||
          this.authService.current_user_info.id_entreprise==0||
            this.authService.current_user_info.id_entreprise==-1){
              this.current_user_offre.personne=this.authService.current_user_info.personne;
              this.is_ent=false;
        }else{
          this.current_user_offre.entreprise=this.authService.current_user_info;
          this.is_ent=true;

        }
        
        this.current_user_offre.localite=new Ville();

      }
    });

    if(this.authService.getLoginState()){
      this.base_link="/user/"+this.authService.current_user.id_utilisateur;
    }else{
      this.base_link="";

    }
  this.businessReglageHelpersService=new  BusinessReglageHelpersService();

  }
 

 
 

  ngOnInit() {
   this.loadStepFormOne();

    this.listVilles = VilleDatabase.DATA;
    this.filteredOptions = this.where.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.listVilles))
      );
      this.offres=this.base_link+"/mes_offres";
  }
buildEntity(){
  if(this.current_user_offre.id_offre==null||
  this.current_user_offre.id_offre==undefined||
  this.current_user_offre.id_offre==0||
  this.current_user_offre.id_offre==-1){
  this.current_user_offre.etat_offre=true;

  }
  this.current_user_offre.cab_recrutement=this.cab_recrutement.value;
  this.current_user_offre.nom_ent=this.nom_ent.value;
  this.current_user_offre.poste=this.poste.value;
  this.current_user_offre.localite.nom_ville=this.where.value; 
  this.current_user_offre.taille=this.taille.value;
  this.current_user_offre.type_emp=this.type_emp.value;
  this.current_user_offre.type_contrat=this.type_contrat.value;
  this.current_user_offre.salaire=this.salaire.value;
  this.current_user_offre.salaire_type=this.salaire_type.value;
  this.current_user_offre.salaire_min=this.salaire_min.value;
  this.current_user_offre.salaire_max=this.salaire_max.value;
  this.current_user_offre.salaire_model=this.salaire_model.value;
  this.current_user_offre.no_salaire=this.no_salaire.value;
  this.current_user_offre.avantages=JSON.stringify((this.avantages.value as string[]));
  this.current_user_offre.cv_require=this.cv_require.value;
  this.current_user_offre.test_compet=this.test_compet.value;
  this.current_user_offre.description=this.description.value;
  try{
    this.current_user_offre.date_limit=new Date((this.date_limit.value as Moment).toDate().getFullYear() + "-" + ((this.date_limit.value as Moment).toDate().getMonth() + 1) + "-" + (this.date_limit.value as Moment).toDate().getDate());

  }catch(error){
    try{
      this.current_user_offre.date_limit=new Date(this.date_limit.value);
  
    }catch(error1){
      console.log(error);
      console.log(error1);
    }
  }

  try{
    this.current_user_offre.date_debut=new Date((this.date_debut.value as Moment).toDate().getFullYear() + "-" + ((this.date_debut.value as Moment).toDate().getMonth() + 1) + "-" + (this.date_debut.value as Moment).toDate().getDate());

  }catch(error){
    try{
      this.current_user_offre.date_debut=new Date(this.date_debut.value);
  
    }catch(error1){
      console.log(error);
      console.log(error1);
    }
  }

  this.current_user_offre.date_immediat=this.date_immediat.value;
}
incre(){
  if(this.index!=3) this.index++;
  else{
    this.hold=true;
    this.buildEntity();
    this.offreService.offreSave(this.current_user_offre,this.is_ent).subscribe((data: BaseQuery<Offre>) => {
      if (data.validate) { 
        if (data.data != null && data.data != undefined) {
        this.hold=true;
          if(!this.is_add_update){

            this._snackBar.open("Modification réussie",null,{
              duration: 1000
            });
            this.current_user_offre=null;
            setTimeout(()=>{
              this.router.navigate([this.base_link+"/mes_offres"]);
            }); 
          }
          else{
            this._snackBar.open("Insertion réussie",null,{
              duration: 1000
            });
            this.current_user_offre=null;
            setTimeout(()=>{
              this.form_step_one.reset();
               this.hold=false;
               this.index=1; 
               this.back= this.stepPipe.transform(this.index,"back");
               this.continue= this.stepPipe.transform(this.index,"continue");
            });
          }

        
        } else {
          this.openMessageDialog("Erreur de mise à jour", "Erreur serveur", "ok");
        this.hold=false;
  
        }
      } else {
        this.openMessageDialog("Erreur de mise à jour", data.erreur_mssg, "ok");
        this.hold=false;
  
      }
 
    });
  }
  this.back= this.stepPipe.transform(this.index,"back");
  this.continue= this.stepPipe.transform(this.index,"continue");
}
decre(){
  this.index--; 
  this.back= this.stepPipe.transform(this.index,"back");
  this.continue= this.stepPipe.transform(this.index,"continue");
}
 
loadStepFormOne() {
  ///Init form
  this.form_step_one = new FormGroup(
    {
      nom_ent: this.nom_ent,
      cab_recrutement: this.cab_recrutement,
      poste: this.poste,
      where: this.where,
      taille: this.taille,
      type_contrat: this.type_contrat,
      type_emp: this.type_emp,
      salaire: this.salaire,
      salaire_type: this.salaire_type,
      salaire_min: this.salaire_min,
      salaire_max: this.salaire_max,
      salaire_model:this.salaire_model,
      no_salaire:this.no_salaire,
      avantages:this.avantages,
      cv_require:this.cv_require,
      test_compet:this.test_compet,
      date_debut:this.date_debut,
      date_limit:this.date_limit,
      description:this.description,
      date_immediat:this.date_immediat,
    }

  );
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
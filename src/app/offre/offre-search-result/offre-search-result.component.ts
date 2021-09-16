import { Component, OnInit, HostListener, } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Image } from 'src/app/model/Image';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
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
import { Postuler } from 'src/app/model/Postuler';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Personne } from 'src/app/model/Personne';
import { Entreprise } from 'src/app/model/Entreprise';
import { Ville } from 'src/app/model/Ville';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ToArrayPipe } from 'src/app/pipes/to-array.pipe';
import { Favoris } from 'src/app/model/Favoris';
@Component({
  selector: 'app-offre-search-result',
  templateUrl: './offre-search-result.component.html',
  styleUrls: ['./offre-search-result.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },
  {provide:ToArrayPipe},
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }]
})
export class OffreSearchResultComponent implements OnInit{



  ///Form declaration
  form_step_one: FormGroup;
  what: FormControl = new FormControl(null);
  where: FormControl = new FormControl(null);
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  businessReglageHelpersService: BusinessReglageHelpersService;
  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
  listVilles: string[];
  current_user_offre: Offre = null;
  listOffres: Offre[] = [];
  offres: string = "/";
  ///Show or hide Hamburger button
  base_link: string = "/";
  is_ent: boolean = false;
  ///Base declaration 
  public innerWidth: any;
  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private offreService: OffreService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public toArrayPipe:ToArrayPipe,
  ) {
    registerLocaleData(fr);
    this.route.params.subscribe(params => {
      this.loadStepFormOne();
      this.what.setValue(params.what == "null" ? null : params.what);
      this.where.setValue(params.where == "null" ? null : params.where);

      this.offreService.offreSearch(this.what.value, this.where.value).subscribe((data: BaseQuery<Offre[]>) => {
        if (data.validate) {
          if (data.data != null && data.data != undefined) {
            this.listOffres = data.data;
          } else {
            this.openMessageDialog("Erreur durant le chargement", "Erreur serveur", "ok");


          }
        } else {
          this.openMessageDialog("Erreur durant le chargement", data.erreur_mssg, "ok");

        }
      });

    });

    if (this.authService.getLoginState()) {
      if (this.authService.current_user_info.id_entreprise == null ||
        this.authService.current_user_info.id_entreprise == undefined ||
        this.authService.current_user_info.id_entreprise==0||
        this.authService.current_user_info.id_entreprise == -1) {
        this.is_ent = false;
      } else {
        this.is_ent = true;
  
      }
      this.base_link = "/user/" + this.authService.current_user.id_utilisateur;
    } else {
      this.base_link = "";
      this.is_ent=false;
    }
    this.businessReglageHelpersService = new BusinessReglageHelpersService();


  }
 





  ngOnInit() {


    this.listVilles = VilleDatabase.DATA;
    this.filteredOptions = this.what.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, []))
      );
    this.filteredOptions1 = this.where.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.listVilles))
      );
    this.offres = this.base_link + "/mes_offres";
    this.innerWidth = window.innerWidth;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  loadStepFormOne() {
    ///Init form
    this.form_step_one = new FormGroup(
      {
        where: this.where,
        what: this.what,
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
  info(id_offre: number) {
    if (this.current_user_offre==null||this.current_user_offre==undefined) {
      this.loadInfo(id_offre);
    }else{
      if(this.current_user_offre.id_offre!=id_offre){
        this.loadInfo(id_offre);
      }
    }

  }
  loadInfo(id_offre: number){
    let offres = this.listOffres.filter(data => data.id_offre == id_offre);
    try {
 
      this.current_user_offre = offres[0];
      if(!this.authService.getLoginState()){
        this.current_user_offre.is_favorite=true;
        this.current_user_offre.is_posted=true;
      }else{
        if(this.authService.current_user_grants.role.role_name=="ROLE_PROFESSIONNEL"){
          this.current_user_offre.is_favorite=true;
          this.current_user_offre.is_posted=true;
          setTimeout(()=>{
            this.progress_upload = true;
            this.progress_upload_real = false;
            this.offreService.offrePostulerCount("model_1",this.current_user_offre.id_offre,this.authService.current_user_document.cv.cv_uid).subscribe((data:BaseQuery<number>)=>{
              this.progress_upload = false;
              this.progress_upload_real = true;
              if (data.validate) {
                if (data.data != null && data.data != undefined) {
                  let nb:number=data.data;
                  if(nb==0){
                    this.current_user_offre.is_posted=false;
                  }else{
                    this.current_user_offre.is_posted=true;

                  }
     
               
                  
                } else {
                  this.openMessageDialog("Erreur durant le chargement", "Erreur serveur", "ok");
          
                }
              } else {
                this.openMessageDialog("Erreur durant le chargement", data.erreur_mssg, "ok");
          
              }
            });
            this.offreService.offreFavorisCount("model_1",this.current_user_offre.id_offre,this.authService.current_user_document.cv.cv_uid).subscribe((data:BaseQuery<number>)=>{
              this.progress_upload = false;
              this.progress_upload_real = true;
              this.current_user_offre.is_favorite=false;
              if (data.validate) {
                if (data.data != null && data.data != undefined) {
                  let nb:number=data.data;
                  if(nb==0){
                    this.current_user_offre.icon_favorite='favorite_border';
                  }else{
                    this.current_user_offre.icon_favorite='favorite';

                  }
     
               
                  
                } else {
                  this.openMessageDialog("Erreur durant le chargement", "Erreur serveur", "ok");
          
                }
              } else {
                this.openMessageDialog("Erreur durant le chargement", data.erreur_mssg, "ok");
          
              }
            });
          },50);
     
          
          

        }else{
          this.current_user_offre.is_favorite=true;
          this.current_user_offre.is_posted=true;

        }

      }

    } catch (error) {
      console.log(error);
    }
  }
  close() {
    this.current_user_offre = null;
  }
  
  post(){
    if(this.current_user_offre.cv_require && (this.authService.current_user_document.cv.document==null||this.authService.current_user_document.cv.document==undefined)){
  
      this.openMessageDialog("Erreur postuler","Veuillez ajouter votre cv avant de postuler","ok");
    }else{
      this.progress_upload = true;
      this.progress_upload_real = false;
      this.offreService.offrePostulerSave(this.current_user_offre.id_offre,this.authService.current_user_document.cv.cv_uid).subscribe((data:BaseQuery<Postuler>)=>{
        this.progress_upload = false;
        this.progress_upload_real = true;
        if (data.validate) {
          if (data.data != null && data.data != undefined) {
            this.current_user_offre.is_posted=true;
            this._snackBar.open("Votre demande a été pris en compte",null,{
              duration: 1000
            });
            // let nb:number=data.data;
            // if(nb==0){
            //   this.current_user_offre.is_posted=false;
            // }else{
            //   this.current_user_offre.is_posted=true;

            // }

         
            
          } else {
            this.openMessageDialog("Erreur durant la mise à jour", "Erreur serveur", "ok");
    
          }
        } else {
          this.openMessageDialog("Erreur durant la mise à jour", data.erreur_mssg, "ok");
    
        }
      });
    }

  }
  fav(){
    this.progress_upload = true;
    this.progress_upload_real = false;
    let option:string="add";
    if(this.current_user_offre.icon_favorite=='favorite_border'){
        option="add";
    }else{
      option="remove";
      // this.current_user_offre.icon_favorite='favorite';

    }

    this.offreService.offreFavorisSave(option,this.current_user_offre.id_offre,this.authService.current_user_document.cv.cv_uid).subscribe((data:BaseQuery<Favoris>)=>{
      this.progress_upload = false;
      this.progress_upload_real = true;
      if (data.validate) {
        if (data.data != null && data.data != undefined) {
          if(option=="add"){
            this.current_user_offre.icon_favorite='favorite';

            this.current_user_offre.is_posted=true;
            this._snackBar.open("Vous avez ajouter aux favoris",null,{
              duration: 1000
            });
          }else{
            this.current_user_offre.icon_favorite='favorite_border';

            this.current_user_offre.is_posted=true;
            this._snackBar.open("Vous avez retirer des favoris",null,{
              duration: 1000
            });
          }
 

       
          
        } else {
          this.openMessageDialog("Erreur durant la mise à jour", "Erreur serveur", "ok");
  
        }
      } else {
        this.openMessageDialog("Erreur durant la mise à jour", data.erreur_mssg, "ok");
  
      }
    });
  }
}
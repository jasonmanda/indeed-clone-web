import { Component, OnInit, ViewChild } from '@angular/core';
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
import { BaseQuery } from 'src/app/model/BaseQuery';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Personne } from 'src/app/model/Personne';
import { Entreprise } from 'src/app/model/Entreprise';
import { Ville } from 'src/app/model/Ville';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { Postuler } from 'src/app/model/Postuler';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DialogResponse } from 'src/app/model/DialogResponse';
import { OffrePostulerDetailComponent } from '../layouts/offre-postuler-detail/offre-postuler-detail.component';
import { OffrePostulerSmsComponent } from '../layouts/offre-postuler-sms/offre-postuler-sms.component';
@Component({
  selector: 'app-offre-list-postuler-detail',
  templateUrl: './offre-list-postuler-detail.component.html',
  styleUrls: ['./offre-list-postuler-detail.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' }, 
  },
  { provide: MatPaginatorIntl, useClass: OffreListPostulerDetailComponent },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }]
})
export class OffreListPostulerDetailComponent extends MatPaginatorIntl implements OnInit {



  ///Form declaration
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  businessReglageHelpersService: BusinessReglageHelpersService;
  current_user_offre:Offre=new Offre();
  offres:string="/";
  ///Show or hide Hamburger button
  base_link:string="/";
  ///Base declaration 
  ELEMENT_DATA: Postuler[]=[];
  displayedColumns: string[] = ['select', 'id', 'nom','prenom','ville', "action"]; 
  dataSource: MatTableDataSource<Postuler> = new MatTableDataSource<Postuler>(this.ELEMENT_DATA);
  selection: SelectionModel<Postuler> = new SelectionModel<Postuler>(true, this.ELEMENT_DATA); 
  deletePostuler: any[] = [];
  deleteELEMENT_DATA: Postuler[] = [];
  tempDeleteELEMENT_DATA: Postuler[];
  id_postuler:number=-1;
 public is_add_update:boolean=false;
  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private offreService:OffreService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    super();

    this.nextPageLabel = "Suivant";
    this.previousPageLabel = "Précédent";
    this.itemsPerPageLabel = "Postuler par page";
    this.lastPageLabel = "Dernière Page";
    this.firstPageLabel = "Première Page";

    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Postuler>(allowMultiSelect, initialSelection);

    registerLocaleData(fr);
     
    this.route.params.subscribe(params=>{
        if(params.offre_id!=null && params.offre_id!=undefined){
        this.is_add_update=false;
        this.offreService.offreById(params.offre_id).subscribe((data:BaseQuery<Offre>)=>{
          if (data.validate) {
            if (data.data != null && data.data != undefined) {
             
              this.current_user_offre=data.data;

               
            } else {
              this.openMessageDialog("Erreur durant le chargement", "Erreur serveur", "ok");
      
            }
          } else {
            this.openMessageDialog("Erreur durant le chargement", data.erreur_mssg, "ok");
      
          }
        });
        this.id_postuler=params.offre_id;
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

      this.offres=this.base_link+"/mes_offres";
      this.loadPostuler(this.id_postuler);
  }
  public update($event: MatCheckboxChange, element: Postuler, option: string, option_base: string = "none") {
    if (element != null && element != undefined) {

      if ($("#only-" + element.id + "-input").prop("checked") == false) {
        $("#only-" + element.id + "-input").click();
      }
    }
    
    if (option == "delete") { 
 
      this.delTraRp($event, option_base, element, option);
    }else  if (option == "info") { 
      this.delTraRp($event, option_base, element, option);
    }
  }
     ///Selects all rows if they are not all selected; otherwise clear selection. 
     public masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
      ///Check if all items are selected in table;
      public isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        // console.log("selected length:"+this.selection.selected.length);
        // console.log("data length:"+this.dataSource.data.length);
        return numSelected === numRows;
    
      }
  public delTraRp($event, option_base, element: Postuler, option) {
    if (option_base == "one") {
      if ($event != null) {
        if ($event.checked) {

          if (this.deletePostuler.length != 0) {
            if (this.deletePostuler[0] == "all") {
              this.deletePostuler = [];
              this.deleteELEMENT_DATA = [];
            } else {

              let newDeletePostuler = [];
              this.tempDeleteELEMENT_DATA = this.deleteELEMENT_DATA;
              this.deleteELEMENT_DATA = [];
              for (let i = 0; i < this.deletePostuler.length; i++) {
                if (this.deletePostuler[i] != element.id_postuler) {
                  newDeletePostuler.push(this.deletePostuler[i]);
                  this.deleteELEMENT_DATA.push(this.tempDeleteELEMENT_DATA[i]);


                }
              }
              this.deletePostuler = newDeletePostuler;
            }
          }
          this.deletePostuler.push(element.id_postuler);
          this.deleteELEMENT_DATA.push(element);
        } else {

          if (this.deletePostuler.length != 0) {
            if (this.deletePostuler[0] == "all") {
              this.deletePostuler = [];
              this.deleteELEMENT_DATA = [];
            } else {

              let newDeletePostuler = [];
              this.tempDeleteELEMENT_DATA = this.deleteELEMENT_DATA;
              this.deleteELEMENT_DATA = [];
              for (let i = 0; i < this.deletePostuler.length; i++) {
                if (this.deletePostuler[i] != element.id_postuler) {
                  newDeletePostuler.push(this.deletePostuler[i]);
                  this.deleteELEMENT_DATA.push(this.tempDeleteELEMENT_DATA[i]);


                }
              }
              this.deletePostuler = newDeletePostuler;
            }
          } else {
            let newDeletePostuler = [];
            this.deleteELEMENT_DATA = [];
            for (let i = 0; i < this.deletePostuler.length; i++) {
              if (this.deletePostuler[i] != element.id_postuler) {
                newDeletePostuler.push(this.deletePostuler[i]);
                this.deleteELEMENT_DATA.push(this.deletePostuler[i]);
              }
            }
            this.deletePostuler = newDeletePostuler;
          }

        }
        // if(option=="delete"){
        //   console.log(this.deleteELEMENT_DATA);
        //   console.log(this.deletePostuler);
        // }
          
        
      } else {
        this.deletePostuler = [];
        this.deletePostuler.push(element.id_postuler);
        this.deleteELEMENT_DATA = [];
        this.deleteELEMENT_DATA.push(element);
        // if (option == "edit") {
        //   // this.router.navigate([this.base_link+"/announce",{
        //   //   "offre_id":element.id_postuler,
        //   // }]);
        // }else
        if(option=="info"){
          this.info(element);

        }
       
       

      }
    }
    else if (option_base == "all") {

      if ($event.checked) {
        this.deletePostuler = [];
        this.deleteELEMENT_DATA = this.ELEMENT_DATA;
        this.deletePostuler = [];

        this.dataSource.data.map((data: Postuler) => {
        
          this.deletePostuler.push(data.id_postuler);

        });

      } else {
        this.deletePostuler = [];
        this.deleteELEMENT_DATA = [];
      }
      // if(option=="delete"){
      //   console.log(this.deleteELEMENT_DATA);
      //   console.log(this.deletePostuler);
      // }
        
    }

  }

  info(postuler:Postuler){
      this.openDialog({ postuler:postuler, base_link:this.base_link,option:'postuler' }, OffrePostulerDetailComponent, "px", "px", 600);
    }
        ///Open Popup modal
        public openDialog(data: any, component: any, width_type_dimen: string = "px", height_type_dimen: string = "px", width?: number, height?: number): void {

          let lwidth = (width == null ? 'auto' : "" + width + width_type_dimen);
          let lheight = (height == null ? 'auto' : "" + height + height_type_dimen);
      
          const dialogRef = this.dialog.open(component, {
            autoFocus: false,
            closeOnNavigation: true,
            data: data,
            disableClose: true,
            // backdropClass: 'cdk-overlay-transparent-backdrop',
            height: lheight,
            // position: {
            //   top: '0',
            //   right: '0'
            // },
            width: lwidth
          });
      
          dialogRef.afterClosed().subscribe((data: DialogResponse) => {
        
      
            if(data.response_message=="refresh"){
              this.loadPostuler(this.id_postuler);
            }
          });
      
      
    
        }
loadPostuler(id_postuler:number){
  this.progress_upload = true;
  this.progress_upload_real = false;
  this.offreService.offrePostulerList("model_1",id_postuler,null).subscribe((data:BaseQuery<Postuler[]>)=>{
    this.progress_upload = false;
    this.progress_upload_real = true;
    if (data.validate) { 
      if (data.data != null && data.data != undefined) {
       
        
        setTimeout(() => {
          this.ELEMENT_DATA = data.data as Postuler[];
          for (var i = 0; i < this.ELEMENT_DATA.length; i++) {
            this.ELEMENT_DATA[i].id = i + 1;
          }
          this.selection.clear();
          this.deleteELEMENT_DATA = [];
          this.deletePostuler = [];
          this.dataSource = new MatTableDataSource<Postuler>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
       
        
        }, 50);
        

         
      } else {
        this.openMessageDialog("Erreur durant le chargement", "Erreur serveur", "ok");

      }
    } else {
      this.openMessageDialog("Erreur durant le chargement", data.erreur_mssg, "ok");

    }
  });
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
  public validate(){
 
  
    this.openDialog({ data:this.deleteELEMENT_DATA, base_link:this.base_link }, OffrePostulerSmsComponent, "px", "px", 600);
   
  }
}
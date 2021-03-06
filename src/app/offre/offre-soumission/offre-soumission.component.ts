import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogResponse } from 'src/app/model/DialogResponse';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Favoris } from 'src/app/model/Favoris';
import { OffreService } from 'src/app/services/offre.service';
import { OffreDetailComponent } from '../layouts/offre-detail/offre-detail.component';
import { Postuler } from 'src/app/model/Postuler';
@Component({
  selector: 'app-offre-soumission',
  templateUrl: './offre-soumission.component.html',
  styleUrls: ['./offre-soumission.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },
  { provide: MatPaginatorIntl, useClass: OffreSoumissionComponent },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }]
})
export class OffreSoumissionComponent extends MatPaginatorIntl implements OnInit {
 
 
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ///Form declaration
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  ///Base declaration 
  businessReglageHelpersService:BusinessReglageHelpersService;
  base_link:string="/";
  announce:string="/";
  ELEMENT_DATA: Postuler[]=[];
  displayedColumns: string[] = ['select', 'id', 'poste','cab_recrutement','date_limit','date_debut', "action"];
  dataSource: MatTableDataSource<Postuler> = new MatTableDataSource<Postuler>(this.ELEMENT_DATA);
  selection: SelectionModel<Postuler> = new SelectionModel<Postuler>(true, this.ELEMENT_DATA);
  deletePostuler: any[] = [];
  deleteELEMENT_DATA: Postuler[] = [];
  tempDeleteELEMENT_DATA: Postuler[];
  constructor(private offreService:OffreService,private dialog:MatDialog,private authService:AuthService,private router : Router,   private _snackBar: MatSnackBar) {
    super();

    this.nextPageLabel = "Suivant";
    this.previousPageLabel = "Pr??c??dent";
    this.itemsPerPageLabel = "Postuler par page";
    this.lastPageLabel = "Derni??re Page";
    this.firstPageLabel = "Premi??re Page";

    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Postuler>(allowMultiSelect, initialSelection);

    registerLocaleData(fr);
  this.businessReglageHelpersService=new  BusinessReglageHelpersService();
 
 if(this.authService.getLoginState()){
  this.base_link="/user/"+this.authService.current_user.id_utilisateur;
}else{
  this.base_link="";

}
  }
 

 
 

  ngOnInit() {
    this.loadListSoumission();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
 

  }

  public loadListSoumission(){
    this.progress_upload = true;
    this.progress_upload_real = false;
    this.offreService.offreSoumission().subscribe((data:BaseQuery<Postuler[]>)=>{
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
 
  
  info(id_postuler:number){
  let postuler:Postuler[]=  this.ELEMENT_DATA.filter(option => option.id_postuler==id_postuler);
  let post:Postuler=  null;
  if(postuler.length==0)this.openMessageDialog("Erreur ??l??ment","Element introuvable","ok");
  else{
    post=postuler[0];
  }
 
  this.openDialog({ offre:post.offre, base_link:this.base_link,message:post.message ,option:"PRO_RETENUE"}, OffreDetailComponent, "px", "px", 600);
  
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
  
   
      });
  
  

    }

  public update($event: MatCheckboxChange, element: Postuler, option: string, option_base: string = "none") {
    if (element != null && element != undefined) {

      if ($("#only-" + element.id + "-input").prop("checked") == false) {
        $("#only-" + element.id + "-input").click();
      }
    }
     if (option == "info") { 
      this.delTraRp($event, option_base, element, option);
 

    }
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

      } else {
        this.deletePostuler = [];
        this.deletePostuler.push(element.id_postuler);
        this.deleteELEMENT_DATA = [];
        this.deleteELEMENT_DATA.push(element);
        if(option=="info"){
          this.info(element.id_postuler);

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
}
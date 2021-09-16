import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { OffreService } from 'src/app/services/offre.service';
import { Offre } from 'src/app/model/Offre';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OffreDetailComponent } from '../layouts/offre-detail/offre-detail.component';
import { DialogResponse } from 'src/app/model/DialogResponse';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-offre-list',
  templateUrl: './offre-list.component.html',
  styleUrls: ['./offre-list.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },
  { provide: MatPaginatorIntl, useClass: OffreListeComponent },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }]
})
export class OffreListeComponent extends MatPaginatorIntl implements OnInit {
 
 
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ///Form declaration
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  is_ent:boolean;
  ///Base declaration 
  businessReglageHelpersService:BusinessReglageHelpersService;
  base_link:string="/";
  announce:string="/";
  ELEMENT_DATA: Offre[]=[];
  displayedColumns: string[] = ['select', 'id', 'poste','cab_recrutement','date_limit','date_debut', "action"];
  dataSource: MatTableDataSource<Offre> = new MatTableDataSource<Offre>(this.ELEMENT_DATA);
  selection: SelectionModel<Offre> = new SelectionModel<Offre>(true, this.ELEMENT_DATA);
  deleteOffre: any[] = [];
  deleteELEMENT_DATA: Offre[] = [];
  tempDeleteELEMENT_DATA: Offre[];
  constructor(private offreService:OffreService,private dialog:MatDialog,private authService:AuthService,private router : Router,   private _snackBar: MatSnackBar) {
    super();

    this.nextPageLabel = "Suivant";
    this.previousPageLabel = "Précédent";
    this.itemsPerPageLabel = "Offre par page";
    this.lastPageLabel = "Dernière Page";
    this.firstPageLabel = "Première Page";

    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Offre>(allowMultiSelect, initialSelection);

    registerLocaleData(fr);
  this.businessReglageHelpersService=new  BusinessReglageHelpersService();
  if(this.authService.current_user_info.id_entreprise==null||
    this.authService.current_user_info.id_entreprise==undefined||
    this.authService.current_user_info.id_entreprise==0||
     this.authService.current_user_info.id_entreprise==-1){
       this.is_ent=false;
 }else{
   this.is_ent=true;

 }
 if(this.authService.getLoginState()){
  this.base_link="/user/"+this.authService.current_user.id_utilisateur;
}else{
  this.base_link="";

}
  }
 

 
 

  ngOnInit() {
    this.loadListOffres();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  public loadListOffres(){
    this.progress_upload = true;
    this.progress_upload_real = false;
    this.offreService.offreList(this.is_ent).subscribe((data:BaseQuery<Offre[]>)=>{
      this.progress_upload = false;
      this.progress_upload_real = true;
      if (data.validate) {
        if (data.data != null && data.data != undefined) { 

          setTimeout(() => {
            this.ELEMENT_DATA = data.data as Offre[];
            for (var i = 0; i < this.ELEMENT_DATA.length; i++) {
              this.ELEMENT_DATA[i].id = i + 1;
            }
            this.selection.clear();
            this.deleteELEMENT_DATA = [];
            this.deleteOffre = [];
            this.dataSource = new MatTableDataSource<Offre>(this.ELEMENT_DATA);
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
 
 
  delete(id_offre:number){
    this.progress_upload = true;
    this.progress_upload_real = false;
    this.offreService.offreDelete(id_offre).subscribe((data:BaseQuery<Offre>)=>{
      this.progress_upload = false;
      this.progress_upload_real = true;
      if (data.validate) {
        if (data.data != null && data.data != undefined) {
          this._snackBar.open("Suppression réussie",null,{
            duration: 1000
          });
          setTimeout(()=>{

            this.loadListOffres();
          },1250);
          
        } else {
          this.openMessageDialog("Erreur durant le chargement", "Erreur serveur", "ok");

        }
      } else {
        this.openMessageDialog("Erreur durant le chargement", data.erreur_mssg, "ok");

      }

    });
  }
  info(id_offre:number){
  let offres:Offre[]=  this.ELEMENT_DATA.filter(option => option.id_offre==id_offre);
  let offre:Offre=  null;
  if(offres.length==0)this.openMessageDialog("Erreur élément","Element introuvable","ok");
  else{
    offre=offres[0];
  }
 

  this.openDialog({ offre:offre, base_link:this.base_link,option:"ENT" }, OffreDetailComponent, "px", "px", 600);
 
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

  public update($event: MatCheckboxChange, element: Offre, option: string, option_base: string = "none") {
    if (element != null && element != undefined) {

      if ($("#only-" + element.id + "-input").prop("checked") == false) {
        $("#only-" + element.id + "-input").click();
      }
    }
    if (option == "edit") { 
      this.delTraRp($event, option_base, element, option);
 
    }
    else if (option == "delete") {
      this.delTraRp($event, option_base, element, option);
 
    } 
    else if (option == "info") { 
      this.delTraRp($event, option_base, element, option);
 

    }
  }

  public delTraRp($event, option_base, element: Offre, option) {
    if (option_base == "one") {
      if ($event != null) {
        if ($event.checked) {

          if (this.deleteOffre.length != 0) {
            if (this.deleteOffre[0] == "all") {
              this.deleteOffre = [];
              this.deleteELEMENT_DATA = [];
            } else {

              let newDeleteOffre = [];
              this.tempDeleteELEMENT_DATA = this.deleteELEMENT_DATA;
              this.deleteELEMENT_DATA = [];
              for (let i = 0; i < this.deleteOffre.length; i++) {
                if (this.deleteOffre[i] != element.id_offre) {
                  newDeleteOffre.push(this.deleteOffre[i]);
                  this.deleteELEMENT_DATA.push(this.tempDeleteELEMENT_DATA[i]);


                }
              }
              this.deleteOffre = newDeleteOffre;
            }
          }
          this.deleteOffre.push(element.id_offre);
          this.deleteELEMENT_DATA.push(element);
        } else {

          if (this.deleteOffre.length != 0) {
            if (this.deleteOffre[0] == "all") {
              this.deleteOffre = [];
              this.deleteELEMENT_DATA = [];
            } else {

              let newDeleteOffre = [];
              this.tempDeleteELEMENT_DATA = this.deleteELEMENT_DATA;
              this.deleteELEMENT_DATA = [];
              for (let i = 0; i < this.deleteOffre.length; i++) {
                if (this.deleteOffre[i] != element.id_offre) {
                  newDeleteOffre.push(this.deleteOffre[i]);
                  this.deleteELEMENT_DATA.push(this.tempDeleteELEMENT_DATA[i]);


                }
              }
              this.deleteOffre = newDeleteOffre;
            }
          } else {
            let newDeleteOffre = [];
            this.deleteELEMENT_DATA = [];
            for (let i = 0; i < this.deleteOffre.length; i++) {
              if (this.deleteOffre[i] != element.id_offre) {
                newDeleteOffre.push(this.deleteOffre[i]);
                this.deleteELEMENT_DATA.push(this.deleteOffre[i]);
              }
            }
            this.deleteOffre = newDeleteOffre;
          }

        }

      } else {
        this.deleteOffre = [];
        this.deleteOffre.push(element.id_offre);
        this.deleteELEMENT_DATA = [];
        this.deleteELEMENT_DATA.push(element);
        if (option == "edit") {
          this.router.navigate([this.base_link+"/announce",{
            "offre_id":element.id_offre,
          }]);
        }else if(option=="delete"){
          this.delete(element.id_offre);
        }else if(option=="info"){
          this.info(element.id_offre);

        }
       
       

      }
    }
    else if (option_base == "all") {

      if ($event.checked) {
        this.deleteOffre = [];
        this.deleteELEMENT_DATA = this.ELEMENT_DATA;
        this.deleteOffre = [];

        this.dataSource.data.map((data: Offre) => {
          this.deleteOffre.push(data.id_offre);

        });

      } else {
        this.deleteOffre = [];
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
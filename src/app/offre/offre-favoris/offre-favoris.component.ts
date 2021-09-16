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
@Component({
  selector: 'app-offre-favoris',
  templateUrl: './offre-favoris.component.html',
  styleUrls: ['./offre-favoris.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },
  { provide: MatPaginatorIntl, useClass: OffreFavorisComponent },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }]
})
export class OffreFavorisComponent extends MatPaginatorIntl implements OnInit {
 
 
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ///Form declaration
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  ///Base declaration 
  businessReglageHelpersService:BusinessReglageHelpersService;
  base_link:string="/";
  announce:string="/";
  ELEMENT_DATA: Favoris[]=[];
  displayedColumns: string[] = ['select', 'id', 'poste','cab_recrutement','date_limit','date_debut', "action"];
  dataSource: MatTableDataSource<Favoris> = new MatTableDataSource<Favoris>(this.ELEMENT_DATA);
  selection: SelectionModel<Favoris> = new SelectionModel<Favoris>(true, this.ELEMENT_DATA);
  deleteFavoris: any[] = [];
  deleteELEMENT_DATA: Favoris[] = [];
  tempDeleteELEMENT_DATA: Favoris[];
  constructor(private offreService:OffreService,private dialog:MatDialog,private authService:AuthService,private router : Router,   private _snackBar: MatSnackBar) {
    super();

    this.nextPageLabel = "Suivant";
    this.previousPageLabel = "Précédent";
    this.itemsPerPageLabel = "Favoris par page";
    this.lastPageLabel = "Dernière Page";
    this.firstPageLabel = "Première Page";

    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Favoris>(allowMultiSelect, initialSelection);

    registerLocaleData(fr);
  this.businessReglageHelpersService=new  BusinessReglageHelpersService();
 
 if(this.authService.getLoginState()){
  this.base_link="/user/"+this.authService.current_user.id_utilisateur;
}else{
  this.base_link="";

}
  }
 

 
 

  ngOnInit() {
    this.loadListFavoris();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  public loadListFavoris(){
    this.progress_upload = true;
    this.progress_upload_real = false;
    this.offreService.offreFavoris().subscribe((data:BaseQuery<Favoris[]>)=>{
      this.progress_upload = false;
      this.progress_upload_real = true;
      if (data.validate) {
        if (data.data != null && data.data != undefined) { 

          setTimeout(() => {
            this.ELEMENT_DATA = data.data as Favoris[];
            for (var i = 0; i < this.ELEMENT_DATA.length; i++) {
              this.ELEMENT_DATA[i].id = i + 1;
            }
            this.selection.clear();
            this.deleteELEMENT_DATA = [];
            this.deleteFavoris = [];
            this.dataSource = new MatTableDataSource<Favoris>(this.ELEMENT_DATA);
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
 
  
  info(id_favoris:number){
  let favoris:Favoris[]=  this.ELEMENT_DATA.filter(option => option.id_favoris==id_favoris);
  let favori:Favoris=  null;
  if(favoris.length==0)this.openMessageDialog("Erreur élément","Element introuvable","ok");
  else{
    favori=favoris[0];
  }
 
  this.openDialog({ offre:favori.offre, base_link:this.base_link ,option:"PRO"}, OffreDetailComponent, "px", "px", 600);
 
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

  public update($event: MatCheckboxChange, element: Favoris, option: string, option_base: string = "none") {
    if (element != null && element != undefined) {

      if ($("#only-" + element.id + "-input").prop("checked") == false) {
        $("#only-" + element.id + "-input").click();
      }
    }
     if (option == "delete") {
      this.delTraRp($event, option_base, element, option);
 
    } 
    else if (option == "info") { 
      this.delTraRp($event, option_base, element, option);
 

    }
  }

  public delTraRp($event, option_base, element: Favoris, option) {
    if (option_base == "one") {
      if ($event != null) {
        if ($event.checked) {

          if (this.deleteFavoris.length != 0) {
            if (this.deleteFavoris[0] == "all") {
              this.deleteFavoris = [];
              this.deleteELEMENT_DATA = [];
            } else {

              let newDeleteFavoris = [];
              this.tempDeleteELEMENT_DATA = this.deleteELEMENT_DATA;
              this.deleteELEMENT_DATA = [];
              for (let i = 0; i < this.deleteFavoris.length; i++) {
                if (this.deleteFavoris[i] != element.id_favoris) {
                  newDeleteFavoris.push(this.deleteFavoris[i]);
                  this.deleteELEMENT_DATA.push(this.tempDeleteELEMENT_DATA[i]);


                }
              }
              this.deleteFavoris = newDeleteFavoris;
            }
          }
          this.deleteFavoris.push(element.id_favoris);
          this.deleteELEMENT_DATA.push(element);
        } else {

          if (this.deleteFavoris.length != 0) {
            if (this.deleteFavoris[0] == "all") {
              this.deleteFavoris = [];
              this.deleteELEMENT_DATA = [];
            } else {

              let newDeleteFavoris = [];
              this.tempDeleteELEMENT_DATA = this.deleteELEMENT_DATA;
              this.deleteELEMENT_DATA = [];
              for (let i = 0; i < this.deleteFavoris.length; i++) {
                if (this.deleteFavoris[i] != element.id_favoris) {
                  newDeleteFavoris.push(this.deleteFavoris[i]);
                  this.deleteELEMENT_DATA.push(this.tempDeleteELEMENT_DATA[i]);


                }
              }
              this.deleteFavoris = newDeleteFavoris;
            }
          } else {
            let newDeleteFavoris = [];
            this.deleteELEMENT_DATA = [];
            for (let i = 0; i < this.deleteFavoris.length; i++) {
              if (this.deleteFavoris[i] != element.id_favoris) {
                newDeleteFavoris.push(this.deleteFavoris[i]);
                this.deleteELEMENT_DATA.push(this.deleteFavoris[i]);
              }
            }
            this.deleteFavoris = newDeleteFavoris;
          }

        }

      } else {
        this.deleteFavoris = [];
        this.deleteFavoris.push(element.id_favoris);
        this.deleteELEMENT_DATA = [];
        this.deleteELEMENT_DATA.push(element);
        if (option == "edit") {
          this.router.navigate([this.base_link+"/announce",{
            "offre_id":element.id_favoris,
          }]);
        }else if(option=="delete"){
          this.delete(element.id_favoris);
        }else if(option=="info"){
          this.info(element.id_favoris);

        }
       
       

      }
    }
    else if (option_base == "all") {

      if ($event.checked) {
        this.deleteFavoris = [];
        this.deleteELEMENT_DATA = this.ELEMENT_DATA;
        this.deleteFavoris = [];

        this.dataSource.data.map((data: Favoris) => {
          this.deleteFavoris.push(data.id_favoris);

        });

      } else {
        this.deleteFavoris = [];
        this.deleteELEMENT_DATA = [];
      }

    }

  }

  delete(id_favoris:number){
    this.progress_upload = true;
    this.progress_upload_real = false;
    let favoris:Favoris[]=  this.ELEMENT_DATA.filter(option => option.id_favoris==id_favoris);
    let favori:Favoris=  null;
    if(favoris.length==0)this.openMessageDialog("Erreur élément","Element introuvable","ok");
    else{
      favori=favoris[0];
    }
    this.offreService.offreFavorisSave("remove",favori.offre.id_offre,this.authService.current_user_document.cv.cv_uid).subscribe((data:BaseQuery<Favoris>)=>{
      this.progress_upload = false;
      this.progress_upload_real = true;
      if (data.validate) {
        if (data.data != null && data.data != undefined) {
         
            this._snackBar.open("Vous avez retirer des favoris",null,{
              duration: 1000
            });
            this.loadListFavoris();
          
 

       
          
        } else {
          this.openMessageDialog("Erreur durant la mise à jour", "Erreur serveur", "ok");
  
        }
      } else {
        this.openMessageDialog("Erreur durant la mise à jour", data.erreur_mssg, "ok");
  
      }
    });
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
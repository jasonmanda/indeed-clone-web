import { Component, OnInit, Input } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Resume } from 'src/app/model/Resume';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { DocumentService } from 'src/app/services/helpers/document.service';
import { Document } from 'src/app/model/Document';
import { SharedViewPdfComponent } from '../view-pdf/shared-view-pdf.component';
import { DialogResponse } from 'src/app/model/DialogResponse';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-shared-resume-view',
    templateUrl: './shared-resume-view.component.html',
    styleUrls: ['./shared-resume-view.component.scss'],
    providers: [
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
      { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    ]
  })
export class SharedResumeViewComponent implements OnInit{
   @Input() current_user_document:Resume;
   businessReglageHelpersService:BusinessReglageHelpersService;

  constructor(private documentService:DocumentService,private dialog: MatDialog){
  this.businessReglageHelpersService=new BusinessReglageHelpersService();
  }
  ngOnInit() {
  
  } 

  public readDocument() {
  
    if (this.current_user_document == null || this.current_user_document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }else if(this.current_user_document.cv == null || this.current_user_document.cv == undefined){
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }else if(this.current_user_document.cv.document == null || this.current_user_document.cv.document == undefined){
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }
    this.showDocument(this.current_user_document.cv.document);
  
  }
  public showDocument(document: Document) {
    if(document == null || document == undefined){
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }
    ///Image or document
    let url_pdf = this.documentService.getDocumentPath(document.path_document);
    let type_file: string = "";

    if (!this.documentService.checkDocumentExtension((document.path_document), [".pdf"])) {
      type_file = "pdf";
    } else {
      type_file = "image";
    }



    this.openDialog({ type_file: type_file, url_pdf: url_pdf, mssg: "Afficher le document" }, SharedViewPdfComponent, "px", "px", 1366, 550);

  }
     ///Open Modal  Popup
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
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

    listNivEtude:{key:string,value:string}[]=[
      {
        key:"aucun",
        value:"Aucun"
      },
      {
        key:"bepc",
        value:"Bepc"
      },
      {
        key:"bfem",
        value:"Bfem"
      },
      {
        key:"bac",
      value:"Bac"
      },
      {
        key:"bac+1",
      value:"Bac +1"
      },
      {
        key:"bac+2",
      value:"Bac +2"
      },
      {
        key:"licence",
      value:"Licence"
      },
      {
        key:"bac+4",
      value:"Bac +4"
      },
      {
        key:"master",
      value:"Master"
      },
      {
        key:"doctorat",
      value:"Doctorat"
      },
    ];
}
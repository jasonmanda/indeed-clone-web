import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { VilleDatabase } from 'src/app/model/VilleDatabase';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { DocumentService } from 'src/app/services/helpers/document.service';
import { ReglageService } from 'src/app/services/reglage.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponse } from 'src/app/model/DialogResponse';
import { Document } from 'src/app/model/Document';
import { SharedViewPdfComponent } from 'src/app/shared/view-pdf/shared-view-pdf.component';
import { Resume } from 'src/app/model/Resume';
@Component({
  selector: 'app-resume-home',
  templateUrl: './resume-home.component.html',
  styleUrls: ['./resume-home.component.scss']
})
export class ResumeHomeComponent implements OnInit {
  title: string = "Kronos-Job";
  form_step_one: FormGroup;
  ///File upload declaration
  fichier: FormControl = new FormControl(null);
  ///File upload declaration
  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
  listVilles: string[] = [];
  publishResumeBlock: boolean = false;
  publishEntAnnounceBlock: boolean = false;
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  documentExists: boolean = false;
  businessReglageHelpersService: BusinessReglageHelpersService;
  progress = "0";
  public current_user_document: Resume;
  constructor(public dialog: MatDialog, public authService: AuthService, public httpClient: HttpClient, public documentService: DocumentService, public reglageService: ReglageService) {
    if (localStorage.getItem("current_user_document") == null || localStorage.getItem("current_user_document") == undefined) {
      this.documentExists = false;
      localStorage.setItem("current_user_document", null);
      this.current_user_document = null;
      authService.current_user_document = null;
    } else {
  
      this.current_user_document = JSON.parse(localStorage.getItem("current_user_document")) as Resume;
      
      if (this.current_user_document == null || this.current_user_document == undefined) {
        this.documentExists = false;
      } else {
        if (this.current_user_document.cv == null || this.current_user_document.cv == undefined) {
          this.documentExists = false;
        } else{
          if (this.current_user_document.cv.document == null || this.current_user_document.cv.document == undefined) {
            this.documentExists = false;
          }else{
        this.documentExists = true;

          }
        }
      }
      authService.current_user_document = this.current_user_document;
  
    }
    if (authService.current_user_grants == null || authService.current_user_grants == undefined) {
      this.publishResumeBlock = true;
      this.publishEntAnnounceBlock = true;
      localStorage.setItem("publishResumeBlock", this.publishResumeBlock + "");
      localStorage.setItem("publishEntAnnounceBlock", this.publishEntAnnounceBlock + "");
    } else {
      if (authService.current_user_grants.role == null || authService.current_user_grants.role == undefined) {
        this.publishResumeBlock = true;
        this.publishEntAnnounceBlock = true;
        localStorage.setItem("publishResumeBlock", this.publishResumeBlock + "");
        localStorage.setItem("publishEntAnnounceBlock", this.publishEntAnnounceBlock + "");
      } else {
        if (authService.current_user_grants.role.role_name == 'ROLE_PROFESSIONNEL') {
          this.publishResumeBlock = true;
          this.publishEntAnnounceBlock = false;
          localStorage.setItem("publishResumeBlock", this.publishResumeBlock + "");
          localStorage.setItem("publishEntAnnounceBlock", this.publishEntAnnounceBlock + "");
        } else if (authService.current_user_grants.role.role_name == 'ROLE_ENTREPRISE') {
          this.publishResumeBlock = false;
          this.publishEntAnnounceBlock = true;
          localStorage.setItem("publishResumeBlock", this.publishResumeBlock + "");
          localStorage.setItem("publishEntAnnounceBlock", this.publishEntAnnounceBlock + "");
        } else {
          this.publishResumeBlock = false;
          this.publishEntAnnounceBlock = false;
          localStorage.setItem("publishResumeBlock", this.publishResumeBlock + "");
          localStorage.setItem("publishEntAnnounceBlock", this.publishEntAnnounceBlock + "");
        }
      }
    }
    this.businessReglageHelpersService = new BusinessReglageHelpersService();
  }

  ngOnInit(): void {

    this.listVilles = VilleDatabase.DATA;
    this.loadStepOneForm();


     
  }

  public loadStepOneForm() {
    this.form_step_one = new FormGroup({
      fichier: this.fichier,
    });
  }
  public _filter(value: string, options: string[]): string[] {
    if (value == null) return [];
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ///Check the image extension and validate when user change the logo
  public cvChange(event, option) {
    this.businessReglageHelpersService.cvChange(event, option, { component: this });

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
  public showDocument(document: Document) {
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
  public readDocument() {
    let document: Resume = JSON.parse(localStorage.getItem("current_user_document")) as Resume;

    this.current_user_document=document;
    this.authService.current_user_document=this.current_user_document;
    if (document == null || document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }else if(document.cv == null || document.cv == undefined){
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }else if(document.cv.document == null || document.cv.document == undefined){
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }
    this.showDocument(document.cv.document);

  }
  public removeDocument() {
    let document: Resume = JSON.parse(localStorage.getItem("current_user_document")) as Resume;
    if (document == null || document == undefined) {
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }else if(document.cv == null || document.cv == undefined){
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }else if(document.cv.document == null || document.cv.document == undefined){
      this.openMessageDialog("Erreur document", "Le document n'existe pas", "ok");
      return;
    }
    this.businessReglageHelpersService.removeDocument({ component: this });
  }
  ///Open Modal  Popup
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }
}

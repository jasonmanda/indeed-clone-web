import { Injectable, Component } from '@angular/core';
import { DialogResponse } from 'src/app/model/DialogResponse';
import { FormControl } from '@angular/forms';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { SharedCustomAlertComponent } from 'src/app/shared/custom-alert/shared-custom-alert.component';
import { Image } from 'src/app/model/Image';
import { ResumeHomeComponent } from 'src/app/resume/resume-home/resume-home.component';
import { map } from 'rxjs/operators';
import { HttpEventType, HttpParams } from '@angular/common/http';
import { Document } from '../../model/Document';
import { SharedViewPdfComponent } from 'src/app/shared/view-pdf/shared-view-pdf.component';
import { ResumeVirtualComponent } from 'src/app/resume/resume-virtual/resume-virtual.component';

@Injectable({
  providedIn: 'root'
})
export class BusinessReglageHelpersService {

  constructor() {

  }
  ///Open Modal  Popup businessReglageHelpersService
  public openMessageDialog(header: string, message: string | any[], option_button: string, base_data: { component: any }): void {
    let temp: string[] = header.split(" - ");
    const dialogRef = base_data.component.dialog.open(SharedCustomAlertComponent, {
      autoFocus: false,
      closeOnNavigation: true,
      data: { header: temp[0], message: message, option_button: option_button },
      disableClose: true,
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      // height: '100%',
      // position: {
      //   top: '0',
      //   right: '0'
      // },
      // width: '250px'
    });
    dialogRef.afterClosed().subscribe((data: DialogResponse) => {

      let response: DialogResponse = {};

      if (data.response_message !== null && data.response_message !== undefined) {
        if (data.response_message === "oui") {

          base_data.component.dialogRef.close(response);
        }
        else if (data.response_message === "ok") { }
        else { }
      }

    });
  }



  ///Check if the country respect base format

  ///initialize filter for the autocomplete component
  public _filter(value: string, base_data: { options: string[] }): string[] {
    if (value == null) return [];
    const filterValue = value.toLowerCase();
    return base_data.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  ///Remove image when user click on red circle x and update database
  public removeImg(base_data: { component: any }) {
    if (base_data.component.current_image != null) {
      base_data.component.progress_upload = true;
      base_data.component.progress_upload_real = false;
      base_data.component.reglageService.imageDelete(base_data.component.current_image.id_image).subscribe((data: BaseQuery<{ image: any }>) => {
        base_data.component.progress_upload = false;
        base_data.component.progress_upload_real = true;
        if (data.validate != null && data.validate != undefined) {
          if (data.validate) {
            base_data.component.current_image = null;
            base_data.component.kronos_logo = base_data.component.authService.base_host + "assets/template/kronos_logo_1.jpg";
          } else {
            this.openMessageDialog("Erreur durant la suppression d'image", data.erreur_mssg, "ok", { component: base_data.component });
          }
        }
      });
    }
  }
    ///Remove image when user click on red circle x and update database
    public removeDocument(base_data: { component: ResumeHomeComponent|ResumeVirtualComponent }) {
      if (base_data.component.current_user_document != null && base_data.component.current_user_document!=undefined) {
        base_data.component.progress_upload = true;
        base_data.component.progress_upload_real = false;
        
        base_data.component.reglageService.documentDelete(base_data.component.current_user_document.cv.document.id_document).subscribe((data: BaseQuery<{ document: any }>) => {
          base_data.component.progress_upload = false;
          base_data.component.progress_upload_real = true; 
          if (data.validate != null && data.validate != undefined) {
            if (data.validate) {
              base_data.component.current_user_document = null;
              base_data.component.documentExists = false;
              base_data.component.authService.current_user_document=null;
              localStorage.setItem("current_user_document",null);


            } else {
              this.openMessageDialog("Erreur durant la suppression du document", data.erreur_mssg, "ok", { component: base_data.component });
            }
          }
        });
      }
    }
  ///Check the image extension and validate when user change the logo
  public logoChange(event, option: string, base_data: { component: any }) {

    if (base_data.component.imageService.checkImageExtension((base_data.component.fichier.value as string))) {
      this.openMessageDialog("Erreur format image", "Les extensions valide sont les suivantes:" + base_data.component.imageService.getValidExtension(), "ok", { component: base_data.component });
      base_data.component.fichier = new FormControl(null);
      base_data.component.loadUploadForm();
    } else {
      base_data.component.progress_upload = true;
      base_data.component.progress_upload_real = false;
      let fd = new FormData();
      fd.append("fichier", event.target.files[0]);
      base_data.component.reglageService.imageSave(fd, option).subscribe((data: BaseQuery<{ image: Image }>) => {
        base_data.component.progress_upload = false;
        base_data.component.progress_upload_real = true;
        if (data.validate != null && data.validate != undefined) {
          if (data.validate) {
            base_data.component.current_image = data.data.image as Image;
            base_data.component.kronos_logo = base_data.component.imageService.getDocumentPath(base_data.component.current_image.path_image);
          } else {
            this.openMessageDialog("Erreur durant le téléchargement d'image", data.erreur_mssg, "ok", { component: base_data.component });
          }
        }
      });
    }
  }

  ///Check the image extension and validate when user change the logo
  public cvChange(event, option: string, base_data: { component: ResumeHomeComponent|ResumeVirtualComponent }) {

    if (base_data.component.documentService.checkDocumentExtension((base_data.component.fichier.value as string),[".pdf", ".jpg", "jpeg", ".gif", ".png", ".svg"])) {
      this.openMessageDialog("Erreur format cv", "Les extensions valide sont les suivantes:" + base_data.component.documentService.getValidExtension([".pdf", ".jpg", "jpeg", ".gif", ".png", ".svg"]), "ok", { component: base_data.component });
      base_data.component.fichier = new FormControl(null);
      base_data.component.loadStepOneForm();
    } else {
      base_data.component.progress_upload = true;
      base_data.component.progress_upload_real = false;
      let fd = new FormData();
      fd.append("fichier", event.target.files[0]);
      base_data.component.reglageService.documentSave(fd, option).subscribe((data: BaseQuery<{document:Document}>) => {
        base_data.component.progress_upload = false;
        base_data.component.progress_upload_real = true;
        if (data.validate != null && data.validate != undefined) {
          if (data.validate) {
            base_data.component.authService.current_user_document.cv.document=data.data.document;
            localStorage.setItem("current_user_document",JSON.stringify(base_data.component.authService.current_user_document));
            base_data.component.documentExists=true;
            base_data.component.showDocument(data.data.document);
          } else {
            this.openMessageDialog("Erreur durant le téléchargement du document", data.erreur_mssg, "ok", { component: base_data.component });
            localStorage.setItem("current_user_document", null);
            base_data.component.documentExists=false;

          }
        }
      });
      // let httpParams=new HttpParams().set("api_token",base_data.component.authService.current_user==null?null:base_data.component.authService.current_user.api_token).set("type","cv");
      // base_data.component.progress="0";
      // base_data.component.httpClient.post<any>(base_data.component.authService.base_url + "reglage/document/save", fd, {
      //   reportProgress: true,
      //   observe: 'events',
      //   params :httpParams,
      // }).pipe(map((event) => {

      //   switch (event.type) {

      //     case HttpEventType.UploadProgress:
      //       const progress = Math.round(100 * event.loaded / event.total);
      //       return { status: 'progress', message: progress };

      //     case HttpEventType.Response:

      //       return event.body;
      //     default:

      //       return `Unhandled event: ${event.type}`;
      //   }
      // })
      // ).subscribe((data)=>{

      //   if(data.validate!=null && data.validate!=undefined){
      //   base_data.component.progress="Terminé 100";

      //   }else{
      //     base_data.component.progress=data.message;

      //   }

      // });
    }
  }


}

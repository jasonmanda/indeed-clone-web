import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';import { DomSanitizer } from '@angular/platform-browser';import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';import { DialogResponse } from 'src/app/model/DialogResponse';

@Component({
  selector: 'app-shared-view-pdf',
  templateUrl: './shared-view-pdf.component.html',
  styleUrls: ['./shared-view-pdf.component.scss']
})
export class SharedViewPdfComponent implements OnInit {
  mssg: string = "";
  url_title: string = "";
  url_title1: string = "";
  url_pdf: string = "";
  type_file: string = "";
  url_pdf1: string = "";
  url;
  url1;

  @ViewChild("bindDownloadPdf", { static: false }) bindDownloadPdf: ElementRef;
  @ViewChild("bindDownloadPdf1", { static: false }) bindDownloadPdf1: ElementRef;
  constructor(public sanitizer: DomSanitizer, public dialogRef: MatDialogRef<SharedViewPdfComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mssg = data.mssg;
    this.url_pdf = data.url_pdf;
    this.type_file=data.type_file;
    let temp: string[] = this.url_pdf.split("/");
    this.url_title = temp[temp.length - 1];

    this.url_pdf1 = data.url_pdf1;
    if (this.url_pdf1 != null && this.url_pdf1 != undefined) {
      temp = this.url_pdf1.split("/");
      this.url_title1 = temp[temp.length - 1];
    }


  }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url_pdf);
    if (this.url_pdf1 != null && this.url_pdf1 != undefined)this.url1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.url_pdf1);
  }


  action(option: string) {
    if (option == "url") (this.bindDownloadPdf.nativeElement as HTMLElement).click();
    if (option == "url1") (this.bindDownloadPdf1.nativeElement as HTMLElement).click();
  }

  ///Close modal popup
  close() {
    let response: DialogResponse = {};

    this.dialogRef.close(response);
  }
}

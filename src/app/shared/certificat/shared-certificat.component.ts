import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
@Component({
  selector: 'app-shared-certificat',
  templateUrl: './shared-certificat.component.html',
  styleUrls: ['./shared-certificat.component.scss']
}) 
export class SharedCertificatComponent implements OnInit {
  @Input() filteredOptions: Observable<string[]>[];
  @Input() form_step_one: FormGroup;
  @Input() listCertificatGroup: FormArray;
  @Input() maxDate:Date; 

  @Output() bindRemoveCertificat=new EventEmitter();
  @Output() bindReadCertificatDocument=new EventEmitter();
  @Output() bindRemoveCertificatDocument=new EventEmitter();
  @Output() bindImportCertificatFile=new EventEmitter();
  
 
  constructor() { }

  ngOnInit() {
 
  }
  removeCertificat(i:number){
    this.bindRemoveCertificat.emit({index:i});
  }
  readCertificatDocument(i:number){ 
    this.bindReadCertificatDocument.emit({index:i,option:"certificat"});
  }
  removeCertificatDocument(i:number){
    this.bindRemoveCertificatDocument.emit({index:i,option:"certificat"});
  }
  importCertificatFile($event,index){
     try {
   
   this.bindImportCertificatFile.emit({file:($event.target.files as FileList)[0],index:index});
       
     } catch (error) {
      console.log(error); 
     }
  }
}
 
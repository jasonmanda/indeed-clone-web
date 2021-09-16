import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
@Component({
  selector: 'app-shared-formation',
  templateUrl: './shared-formation.component.html',
  styleUrls: ['./shared-formation.component.scss']
}) 
export class SharedFormationComponent implements OnInit {
  @Input() filteredOptions: Observable<string[]>[];
  @Input() form_step_one: FormGroup;
  @Input() listFormationGroup: FormArray;
  @Input() maxDate:Date; 

  @Output() bindRemoveFormation=new EventEmitter();
  @Output() bindReadFormationDocument=new EventEmitter();
  @Output() bindRemoveFormationDocument=new EventEmitter();
  @Output() bindImportFormationFile=new EventEmitter();
  
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
  constructor() { }

  ngOnInit() {
 
  }
  removeFormation(i:number){
    this.bindRemoveFormation.emit({index:i});
  }
  readFormationDocument(i:number){ 
    this.bindReadFormationDocument.emit({index:i,option:"formation"});
  }
  removeFormationDocument(i:number){
    this.bindRemoveFormationDocument.emit({index:i,option:"formation"});
  }
  importFormationFile($event,index){
     try {
   
   this.bindImportFormationFile.emit({file:($event.target.files as FileList)[0],index:index});
       
     } catch (error) {
      console.log(error); 
     }
  }
}
 
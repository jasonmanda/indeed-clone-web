import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
@Component({
  selector: 'app-shared-competence',
  templateUrl: './shared-competence.component.html',
  styleUrls: ['./shared-competence.component.scss']
}) 
export class SharedCompetenceComponent implements OnInit {
  @Input() form_step_one: FormGroup;
  @Input() listCompetenceGroup: FormArray;
  @Output() bindRemoveCompetence= new EventEmitter();
  listMois:number[]=[];
  listSemaine:number[]=[];
  listJour:number[]=[];
 
  constructor() { 
    for(let i=0;i<=30;i++){
      if(this.listMois.length!=13){
        this.listMois.push(i);
      }if(this.listSemaine.length!=5){
        this.listSemaine.push(i);
      }if(this.listJour.length!=31){
        this.listJour.push(i);
      } 
    }

  }

  ngOnInit() {
 
  }
  removeCompetence(i:number){
    this.bindRemoveCompetence.emit({index:i});
  }
}
 
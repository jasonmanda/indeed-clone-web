import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shared-experience-professionnelle',
  templateUrl: './shared-experience-professionnelle.component.html',
  styleUrls: ['./shared-experience-professionnelle.component.scss']
}) 
export class SharedExperienceProfessionnelleComponent implements OnInit {
  @Input() filteredOptions: Observable<string[]>[];
  @Input() form_step_one: FormGroup;
  @Input() listExpProfessionnelleGroup: FormArray;
  @Input() maxDate:Date; 

  @Output() bindRemoveExpPo=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  removeExpPo(i:number){
    this.bindRemoveExpPo.emit({index:i});
  }
}

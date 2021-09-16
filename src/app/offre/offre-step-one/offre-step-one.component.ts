import { Component, OnInit, Input } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-offre-step-one',
  templateUrl: './offre-step-one.component.html',
  styleUrls: ['./offre-step-one.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }],
})
export class OffreStepOneComponent implements OnInit {
  @Input() form_step_one:FormGroup
  @Input() nom_ent:FormControl;
  @Input() cab_recrutement:FormControl;
  @Input() poste:FormControl;
  @Input() where:FormControl;

  @Input() filteredOptions: Observable<string[]>;
  @Input() listVilles:string[];
  @Input() progress_upload: boolean;
  @Input() progress_upload_real: boolean;
  constructor(public dialog: MatDialog,private authService:AuthService) { 


  }

  ngOnInit(): void {
    

    
  }

 
    

 

}

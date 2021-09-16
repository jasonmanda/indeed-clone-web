import { Component, OnInit, Input } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

@Component({
  selector: 'app-offre-step-three',
  templateUrl: './offre-step-three.component.html',
  styleUrls: ['./offre-step-three.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },{
    provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }],
})
export class OffreStepThreeComponent implements OnInit {
  ///Form declaration
  @Input() form_step_one: FormGroup;
  @Input() type_contrat:FormControl;
  @Input() type_emp:FormControl;
  @Input() salaire:FormControl;
  @Input() salaire_type:FormControl;
  @Input() salaire_min:FormControl;
  @Input() salaire_max:FormControl;
  @Input() salaire_model:FormControl;
  @Input() no_salaire:FormControl;
  @Input() avantages:FormControl;
  @Input() cv_require:FormControl;
  @Input() test_compet:FormControl;
  @Input() date_debut:FormControl;
  @Input() date_limit:FormControl;
  @Input() description:FormControl;
  @Input() date_immediat:FormControl;
  constructor() { 


  }

  ngOnInit(): void {
    
 
    
  }

 
    
   
 

}

import { Component, OnInit, Input } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormGroup, FormControl } from '@angular/forms';
import { Image } from 'src/app/model/Image';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { VilleDatabase } from 'src/app/model/VilleDatabase';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-offre-step-two',
  templateUrl: './offre-step-two.component.html',
  styleUrls: ['./offre-step-two.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }],
})
export class OffreStepTwoComponent implements OnInit {
  ///Form declaration
  @Input() form_step_one: FormGroup;
  @Input() taille: FormControl;
  @Input()  size: { key: string, value: string }[];

  constructor() { 


  }

  ngOnInit(): void {
    

    
  }

 
 

}

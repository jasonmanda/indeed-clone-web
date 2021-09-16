import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { Moment } from 'moment';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
@Component({
  selector: 'app-offre-step-finish',
  templateUrl: './offre-step-finish.component.html',
  styleUrls: ['./offre-step-finish.component.scss'],
  providers: [],
})
export class OffreStepFinishComponent implements OnInit,OnChanges {
  ///Form declaration

  @Input() is_recap: boolean;
  @Input() opt: string;
  @Input() cab_recrutement: boolean;
  @Input() nom_ent: string;
  @Input() poste: string;
  @Input() localite: string;//Ville;
  @Input() taille: string;
  @Input() type_emp: string;
  @Input() type_contrat: string;//here
  @Input() salaire: number;
  @Input() salaire_type: string;
  @Input() salaire_min: number;
  @Input() salaire_max: number;
  @Input() salaire_model: boolean;
  @Input() no_salaire: boolean;
  @Input() avantages: string[];//here
  @Input() cv_require: boolean;
  @Input() test_compet: boolean;
  @Input() description: string;
  @Input() date_limit: Moment|Date;
  @Input() date_debut: Moment|Date;
  @Input() date_immediat: boolean;
 

  constructor() {
    
registerLocaleData(fr);


  }

  ngOnInit(): void {

   
    
    
    

 
    
    
  }
  ngOnChanges(changes){
    // console.log(changes);
    // console.log(this.date_debut);
  }






}

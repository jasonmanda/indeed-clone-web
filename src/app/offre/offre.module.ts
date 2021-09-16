import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { OffreHomeComponent } from './offre-home/offre-home.component';
import { OffreStepOneComponent } from './offre-step-one/offre-step-one.component';
import { OffreStepTwoComponent } from './offre-step-two/offre-step-two.component';
import { OffreStepThreeComponent } from './offre-step-three/offre-step-three.component';
import { OffreStepFinishComponent } from './offre-step-finish/offre-step-finish.component';
import { OffreListeComponent } from './offre-list/offre-list.component';
import { OffreDetailComponent } from './layouts/offre-detail/offre-detail.component';
import { OffreSearchResultComponent } from './offre-search-result/offre-search-result.component';
import { OffreFullDetailComponent } from './offre-full-detail/offre-full-detail.component';
import { OffreListPostulerDetailComponent } from './offre-list-postuler-detail/offre-list-postuler-detail.component';
import { OffrePostulerDetailComponent } from './layouts/offre-postuler-detail/offre-postuler-detail.component';
import { OffrePostulerSmsComponent } from './layouts/offre-postuler-sms/offre-postuler-sms.component';
import { OffreFavorisComponent } from './offre-favoris/offre-favoris.component';
import { OffreSoumissionComponent } from './offre-soumission/offre-soumission.component';


@NgModule({
    imports: [
  
  
  
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      SharedModule,
      
  
  
  
    ],
    declarations: [
    OffreHomeComponent,
    OffreListPostulerDetailComponent,
    OffreListeComponent,
    OffreFavorisComponent,
    OffreSoumissionComponent,
    OffreStepOneComponent,
    OffreStepTwoComponent,
    OffreStepThreeComponent,
    OffreStepFinishComponent,
    OffreDetailComponent,
    OffrePostulerDetailComponent,
    OffrePostulerSmsComponent,
    OffreFullDetailComponent,
    OffreSearchResultComponent,
  ],
    providers: [],
    entryComponents: [
    OffreDetailComponent,
    OffrePostulerDetailComponent,
    OffrePostulerSmsComponent

    ],
    schemas: [
  
    ],
    exports:[
    ]
  })
  export class OffreModule { }
   
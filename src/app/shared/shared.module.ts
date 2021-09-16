import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedLoginComponent } from './login/shared-login.component';
import { SharedResetPasswordComponent } from './reset-password/shared-reset-password.component';
import { SharedSpinnerComponent } from './spinner/shared-spinner.component';
import { SharedCustomAlertComponent } from './custom-alert/shared-custom-alert.component';
import { SharedViewPdfComponent } from './view-pdf/shared-view-pdf.component';
import { SharedExperienceProfessionnelleComponent } from './experience-professionnelle/shared-experience-professionnelle.component';
import { SharedFormationComponent } from './formation/shared-formation.component';
import { SharedCertificatComponent } from './certificat/shared-certificat.component';
import { SharedContactComponent } from './contact/shared-contact.component';
import { SharedCompetenceComponent } from './competence/shared-competence.component';
import { SharedLangueComponent } from './langue/shared-langue.component';
import { SharedOffreComponent } from './offre/shared-offre.component';
import { SharedSearchHomeComponent } from './search-home/shared-search-home.component';
import { SharedResumeViewComponent } from './resume-view/shared-resume-view.component';

 
 
@NgModule({
  imports: [

    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
   ],
  declarations: [
    SharedViewPdfComponent,
    SharedLoginComponent,
    SharedContactComponent,
    SharedLangueComponent,
    SharedOffreComponent, 
    // SharedOffreDetailComponent, 
    SharedResetPasswordComponent,
    SharedSpinnerComponent, 
    SharedExperienceProfessionnelleComponent, 
    SharedFormationComponent, 
    SharedCertificatComponent, 
    SharedCompetenceComponent, 
    SharedCustomAlertComponent,
    SharedSearchHomeComponent,
    SharedResumeViewComponent,
   ],
   providers:[],
 
 
  entryComponents:[
    SharedViewPdfComponent,
    SharedCustomAlertComponent
 
  ],
  exports:[
    SharedContactComponent,
    SharedLangueComponent,
    SharedOffreComponent,
    // SharedOffreDetailComponent, 
    SharedLoginComponent,
    SharedResetPasswordComponent,
    SharedSpinnerComponent,
    SharedExperienceProfessionnelleComponent,
    SharedFormationComponent,
    SharedCertificatComponent,
    SharedCompetenceComponent, 
    SharedSearchHomeComponent,
    SharedResumeViewComponent,
 
  ],
  schemas:[


   
  ]
})
export class SharedModule {}
 
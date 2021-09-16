import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { FooterBarComponent } from '../layouts/footer-bar/footer-bar.component';
import { HeaderBarComponent } from '../layouts/header-bar/header-bar.component';
import { LeftBarComponent } from '../layouts/left-bar/left-bar.component';
import { HomeComponent } from './home/home.component';

import { ResumeModule } from '../resume/resume.module';
import { SharedModule } from '../shared/shared.module';
import { OffreModule } from '../offre/offre.module';
import { ParametreModule } from '../parametre/parametre.module';
@NgModule({
    imports: [
  
  
  
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      SharedModule,
      ResumeModule,
      OffreModule,
      ParametreModule,
      WelcomeRoutingModule,
  
  
  
  
    ],
    declarations: [
  
      MainNavComponent,
      FooterBarComponent,
      LeftBarComponent,
      HeaderBarComponent,
      HomeComponent,
  
  
    ],
    providers: [],
    entryComponents: [],
    schemas: [
  
    ],
    exports:[

    ]
  })
  export class WelcomeModule { }
   
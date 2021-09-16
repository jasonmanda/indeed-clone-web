import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ResumeHomeComponent } from './resume-home/resume-home.component';
import { ResumeVirtualComponent } from './resume-virtual/resume-virtual.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
  
  
  
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      SharedModule,
  
  
  
  
    ],
    declarations: [
  ResumeHomeComponent,
  ResumeVirtualComponent,
  
  
    ],
    providers: [],
    entryComponents: [],
    schemas: [
  
    ],
    exports:[
 
    ]
  })
  export class ResumeModule { }
   
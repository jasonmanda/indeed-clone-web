import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ParametreHomeComponent } from './parametre-home/parametre-home.component';


@NgModule({
  imports: [



    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,




  ],
  declarations: [
    ParametreHomeComponent,
  ],
  providers: [],
  entryComponents: [

  ],
  schemas: [

  ],
  exports: [
  ]
})
export class ParametreModule { }

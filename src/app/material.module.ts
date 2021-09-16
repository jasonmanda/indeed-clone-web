import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree'; 
import { MatSliderModule } from '@angular/material/slider'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatListModule } from '@angular/material/list'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatStepperModule } from '@angular/material/stepper'; 
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatChipsModule } from '@angular/material/chips'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { QRCodeModule } from 'angularx-qrcode';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccessPipe } from './pipes/access.pipe';
import { ToHexDecPipe } from './pipes/to-hex-dec.pipe';
import { TextSousPipe } from './pipes/text-sous.pipe';
import { StepPipe } from './pipes/step.pipe';
import { OffrePipe } from './pipes/offre.pipe';
import { ToArrayPipe } from './pipes/to-array.pipe';
 
 
@NgModule({
  declarations: [
    AccessPipe,
    ToHexDecPipe,
    TextSousPipe,
    StepPipe,
    OffrePipe,
    ToArrayPipe,
    
 
  
   
 

  ],
  imports: [


  ],
  
  exports:[
    AccessPipe,
    ToHexDecPipe,
    TextSousPipe,
    StepPipe,
    OffrePipe,
    ToArrayPipe,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTreeModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSliderModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatChipsModule,
    QRCodeModule,            
    RouterModule
  ],
  
  providers:[],
  bootstrap: [],
  entryComponents:[
 
  ]
})
export class MaterialModule { }

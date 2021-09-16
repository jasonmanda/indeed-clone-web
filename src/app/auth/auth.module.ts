import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SubscribeStepOneComponent } from './step-one/step-one.component';
import { SubscribeStepTwoComponent } from './step-two/step-two.component';
import { SubscribeStepThreeOneComponent } from './step-three-one/step-three-one.component';
import { SubscribeStepThreeTwoComponent } from './step-three-two/step-three-two.component';
import { SubscribeStepFourOneComponent } from './step-four-one/step-four-one.component';
import { SubscribeStepFourTwoComponent } from './step-four-two/step-four-two.component';




@NgModule({
  imports: [



    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,

    // AdminModule,
    AuthRoutingModule,
    ///Here
  

  ],
  declarations: [

    LoginComponent,
    SubscribeComponent,
    ResetPasswordComponent,
    SubscribeStepOneComponent,
    SubscribeStepTwoComponent,
    SubscribeStepThreeOneComponent,
    SubscribeStepThreeTwoComponent,
    SubscribeStepFourOneComponent,
    SubscribeStepFourTwoComponent,
    // SubscribeStepThreeTwoComponent,
    // AdminDialogComponent,
 
  ],
  entryComponents: [
    // AdminDialogComponent
  ],
  providers: [],
  schemas: [



  ]
})
export class AuthModule { }

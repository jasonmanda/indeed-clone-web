import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './services/selective-preloading-strategy.service';
import { LoginComponent } from './auth/login/login.component';
import { FooterBarComponent } from './layouts/footer-bar/footer-bar.component';
import { SubscribeComponent } from './auth/subscribe/subscribe.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SubscribeStepOneComponent } from './auth/step-one/step-one.component';
import { SubscribeStepTwoComponent } from './auth/step-two/step-two.component';
import { SubscribeStepThreeOneComponent } from './auth/step-three-one/step-three-one.component';
import { SubscribeStepThreeTwoComponent } from './auth/step-three-two/step-three-two.component';
import { SubscribeStepFourOneComponent } from './auth/step-four-one/step-four-one.component';
import { SubscribeStepFourTwoComponent } from './auth/step-four-two/step-four-two.component';
import { AuthGuard } from './guard/auth.guard';

const appRoutes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[AuthGuard], 
  children:[
 {path: '', component: FooterBarComponent,outlet:"footer",data:{load_status:"no_load",mod_sub_mod:"footer",type:"login"}/*,canActivate:[UpdateInfoGuard]*/},
         
  ]     
}, 
{path:'subscribe',component:SubscribeComponent,canActivate:[AuthGuard],
children:[  

  
  {path: '', component: SubscribeStepOneComponent,data:{load_status:"no_load",type:"add"}/*,canActivate:[UpdateInfoGuard]*/},
  {path: 'type_account', component: SubscribeStepTwoComponent,data:{load_status:"no_load",type:"add"}/*,canActivate:[UpdateInfoGuard]*/},
  {path: 'type_account/ent', component: SubscribeStepThreeOneComponent,data:{load_status:"no_load",type:"add"}/*,canActivate:[UpdateInfoGuard]*/},
  {path: 'type_account/pro', component: SubscribeStepThreeTwoComponent,data:{load_status:"no_load",type:"add"}/*,canActivate:[UpdateInfoGuard]*/},
  {path: 'type_account/ent/finish', component: SubscribeStepFourOneComponent,data:{load_status:"no_load",type:"add"}/*,canActivate:[UpdateInfoGuard]*/},
  {path: 'type_account/pro/finish', component: SubscribeStepFourTwoComponent,data:{load_status:"no_load",type:"add"}/*,canActivate:[UpdateInfoGuard]*/},
  
  {path: '', component: FooterBarComponent,outlet:"footer",data:{load_status:"no_load",mod_sub_mod:"footer"}/*,canActivate:[UpdateInfoGuard]*/},
         
]     
},
{path:'reset-password',component:ResetPasswordComponent,canActivate:[AuthGuard],
children:[
{path: '', component: FooterBarComponent,outlet:"footer",data:{load_status:"no_load",mod_sub_mod:"footer"}/*,canActivate:[UpdateInfoGuard]*/},
       
]    
}, 
  {path:'',loadChildren: ()=>import("./welcome/welcome.module").then(m=>m.WelcomeModule)},
];

@NgModule({
  imports: [   
    RouterModule.forRoot( 
    appRoutes,
    {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService,
    } 
  )
],
  exports: [RouterModule]
})
export class AppRoutingModule { }

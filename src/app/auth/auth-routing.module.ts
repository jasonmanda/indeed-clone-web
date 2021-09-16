import { NgModule } from '@angular/core';
import {  RouterModule,Routes } from '@angular/router';
 
 

const authRoutes: Routes = [

  { path: '', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule)},
   
]; 

@NgModule({
  imports: [
 

    RouterModule.forChild(authRoutes)
  ],
  declarations: [

 
  ]
  ,
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }

import { MainNavComponent } from './main-nav/main-nav.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guard/auth.guard';
import { UpdateInfoGuard } from '../guard/update-info.guard';
import { ResumeHomeComponent } from '../resume/resume-home/resume-home.component';
import { ResumeVirtualComponent } from '../resume/resume-virtual/resume-virtual.component';
import { OffreHomeComponent } from '../offre/offre-home/offre-home.component';
import { OffreListeComponent } from '../offre/offre-list/offre-list.component';
import { OffreSearchResultComponent } from '../offre/offre-search-result/offre-search-result.component';
import { OffreFullDetailComponent } from '../offre/offre-full-detail/offre-full-detail.component';
import { OffreListPostulerDetailComponent } from '../offre/offre-list-postuler-detail/offre-list-postuler-detail.component';
import { AccessGuard } from '../guard/access.guard';
import { OffreFavorisComponent } from '../offre/offre-favoris/offre-favoris.component';
import { OffreSoumissionComponent } from '../offre/offre-soumission/offre-soumission.component';
import { ParametreHomeComponent } from '../parametre/parametre-home/parametre-home.component';
import { SubscribeStepOneComponent } from '../auth/step-one/step-one.component';
import { SubscribeStepTwoComponent } from '../auth/step-two/step-two.component';
import { SubscribeStepThreeOneComponent } from '../auth/step-three-one/step-three-one.component';
import { SubscribeStepThreeTwoComponent } from '../auth/step-three-two/step-three-two.component';
import { SubscribeStepFourOneComponent } from '../auth/step-four-one/step-four-one.component';
import { SubscribeStepFourTwoComponent } from '../auth/step-four-two/step-four-two.component';
import { FooterBarComponent } from '../layouts/footer-bar/footer-bar.component';
 

const authRoutes: Routes = [
  {
    path: '',
    component: MainNavComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        // canActivateChild: [AuthGuard,AccessGuard,UpdateInfoGuard],
      
      },
      { 
        path: 'search/:what/:where', 
        component: OffreSearchResultComponent,
      },
      { 
        path: 'offre/:offre_id/:what/:where', 
        component: OffreFullDetailComponent,
      },
      // { 
      //   path: 'offre/:option/:id', 
      //   component: OffreCreatorDetailComponent,
      // },
    ]
  },  
  {
    path: 'user/:id',
    component: MainNavComponent, 
     canActivate: [AuthGuard,UpdateInfoGuard], 
     data:{load_status:"no_load",mod_sub_mod:"main"},
    // ,AccessGuard,
    children: [
      { 
        path: '', 
        component: HomeComponent,
        canActivate: [AuthGuard,UpdateInfoGuard],
        data:{load_status:"no_load",mod_sub_mod:"main"},
      },
      {   
        path: 'cv_upload', 
        component: ResumeHomeComponent,
        canActivate: [AuthGuard,UpdateInfoGuard,AccessGuard],
        data:{load_status:"no_load",mod_sub_mod:"main",role:'PRO'},
      },
      {  
        path: 'cv_virtual', 
        component: ResumeVirtualComponent,
        canActivate: [AuthGuard,UpdateInfoGuard,AccessGuard],
        data:{load_status:"no_load",mod_sub_mod:"main",role:'PRO'},
   
      },
      {  
        path: 'favoris', 
        component: OffreFavorisComponent,
        canActivate: [AuthGuard,UpdateInfoGuard,AccessGuard],
        data:{load_status:"no_load",mod_sub_mod:"main",role:'PRO'},
       
      },
      {  
        path: 'soumission', 
        component: OffreSoumissionComponent,
        canActivate: [AuthGuard,UpdateInfoGuard,AccessGuard],
        data:{load_status:"no_load",mod_sub_mod:"main",role:'PRO'},
       
      },
      {  
        path: 'announce', 
        component: OffreHomeComponent,
        canActivate: [AuthGuard,UpdateInfoGuard],
        data:{load_status:"no_load",mod_sub_mod:"main"},
      },
      {  
        path: 'mes_offres', 
        component: OffreListeComponent,
        canActivate: [AuthGuard,UpdateInfoGuard],
        data:{load_status:"no_load",mod_sub_mod:"main"},
      
       
      },
      {  
        path: 'mes_offres/:offre_id/detail', 
        component: OffreListPostulerDetailComponent,///permet de voir les cv quii postuler et repondre
        canActivate: [AuthGuard,UpdateInfoGuard],
        data:{load_status:"no_load",mod_sub_mod:"main"},
      },
      { 
        path: 'search/:what/:where', 
        component: OffreSearchResultComponent,
        canActivate: [AuthGuard,UpdateInfoGuard],
        data:{load_status:"no_load",mod_sub_mod:"main"},
      },
      { 
        path: 'offre/:offre_id/:what/:where', 
        component: OffreFullDetailComponent,
        canActivate: [AuthGuard,UpdateInfoGuard],
      }, 
      { 
        path: 'parametre', 
        component: ParametreHomeComponent,
        canActivate: [AuthGuard,UpdateInfoGuard],
        children:[  

  
          {path: '', component: SubscribeStepOneComponent,data:{load_status:"no_load",type:"edit"},canActivate: [AuthGuard,UpdateInfoGuard],},
          {path: 'type_account', component: SubscribeStepTwoComponent,data:{load_status:"no_load",type:"edit"},canActivate: [AuthGuard,UpdateInfoGuard],},
          {path: 'type_account/ent', component: SubscribeStepThreeOneComponent,data:{load_status:"no_load",type:"edit"},canActivate: [AuthGuard,UpdateInfoGuard],},
          {path: 'type_account/pro', component: SubscribeStepThreeTwoComponent,data:{load_status:"no_load",type:"edit"},canActivate: [AuthGuard,UpdateInfoGuard],},
          // {path: 'type_account/ent/finish', component: SubscribeStepFourOneComponent,data:{load_status:"no_load",type:"edit"},canActivate: [AuthGuard,UpdateInfoGuard],},
          // {path: 'type_account/pro/finish', component: SubscribeStepFourTwoComponent,data:{load_status:"no_load",type:"edit"},canActivate: [AuthGuard,UpdateInfoGuard],},
           
          {path: '', component: FooterBarComponent,outlet:"footer",data:{load_status:"no_load",mod_sub_mod:"footer"}/*,canActivate:[UpdateInfoGuard]*/},
                 
        ]     
        },
        
  
      // { 
      //   path: 'offre/:option/:id', 
      //   component: OffreCreatorDetailComponent,
      // },
    
    ]
  },
  

];
 
@NgModule({
  imports: [

    CommonModule,


    RouterModule.forChild(authRoutes)
  ],
  declarations: [


  ]
  ,
  exports: [
    RouterModule
  ]
})
export class WelcomeRoutingModule { }

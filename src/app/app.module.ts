import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebConfigService } from './services/helpers/web-config.service';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
export function setupWebConfigServiceFactory(
  service: WebConfigService): Function {

  return () => service.use();
}
@NgModule({
  declarations: [
 
    AppComponent, 
    PageNotFoundComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,  
    
     // FormsModule,
    // ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatAutocompleteModule,


    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),

   
    AppRoutingModule,
  ],
  providers:[DatePipe,    

    ,CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupWebConfigServiceFactory,
      deps: [
        WebConfigService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports:[
 
    
  ]
})
export class AppModule { }

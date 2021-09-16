import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { AuthService } from 'src/app/services/auth.service';
import { PasseDataService } from 'src/app/services/passe-data.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  title = 'kronos-job';
  publishResumeBlock: boolean = false;
  publishEntAnnounceBlock: boolean = false;
  cv_upload:string="/";
  announce:string="/";
  offres:string="/";
  ///Show or hide Hamburger button
  base_link:string="/";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(public authService: AuthService,private passeDataService:PasseDataService, private breakpointObserver: BreakpointObserver) {
    if(this.authService.getLoginState()){
      this.base_link="/user/"+this.authService.current_user.id_utilisateur;
    }else{
      this.base_link="";

    }
  } 
  ngOnInit() {
   
    this.loadIntels();
    try{
      this.passeDataService.mainNavObservable.subscribe((data:boolean)=>{
        if(data){
        
    
          this.loadIntels();
        }
      });
    }catch(error){
      console.log(error);
    }
  }

  loadIntels(){
    this.publishResumeBlock = JSON.parse(localStorage.getItem("publishResumeBlock")) as boolean;
    if(this.publishResumeBlock){
      this.cv_upload=this.base_link+"/cv_upload";

    }else{
      this.cv_upload="";

    }
    this.publishEntAnnounceBlock = JSON.parse(localStorage.getItem("publishEntAnnounceBlock")) as boolean;
    if(this.publishEntAnnounceBlock||this.publishResumeBlock){
      this.announce=this.base_link+"/announce";

    }else{
      this.announce="";

    }
    this.offres=this.base_link+"/mes_offres";
  }

} 

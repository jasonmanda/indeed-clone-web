import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { VilleDatabase } from 'src/app/model/VilleDatabase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form_step_one:FormGroup;
  what:FormControl=new FormControl(null);
  where:FormControl=new FormControl(null);
 
  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
  listVilles:string[]=[];
  publishResumeBlock:boolean=false;
  publishEntAnnounceBlock:boolean=false;
  cv_upload:string="/";
  announce:string="/";
  ///Show or hide Hamburger button
  base_link:string="/";
  constructor(public authService:AuthService) {

    if(authService.current_user_grants==null || authService.current_user_grants==undefined){
      this.publishResumeBlock=true;
      this.publishEntAnnounceBlock=true;
      localStorage.setItem("publishResumeBlock",this.publishResumeBlock+"");
      localStorage.setItem("publishEntAnnounceBlock",this.publishEntAnnounceBlock+"");
    }else{
          if(authService.current_user_grants.role==null || authService.current_user_grants.role==undefined){
            this.publishResumeBlock=true;
            this.publishEntAnnounceBlock=true;
            localStorage.setItem("publishResumeBlock",this.publishResumeBlock+"");
            localStorage.setItem("publishEntAnnounceBlock",this.publishEntAnnounceBlock+"");
          }else{
            if(authService.current_user_grants.role.role_name=='ROLE_PROFESSIONNEL'){
              this.publishResumeBlock=true;
              this.publishEntAnnounceBlock=false;
              localStorage.setItem("publishResumeBlock",this.publishResumeBlock+"");
              localStorage.setItem("publishEntAnnounceBlock",this.publishEntAnnounceBlock+"");
            }else if(authService.current_user_grants.role.role_name=='ROLE_ENTREPRISE'){
              this.publishResumeBlock=false;
              this.publishEntAnnounceBlock=true;
              localStorage.setItem("publishResumeBlock",this.publishResumeBlock+"");
              localStorage.setItem("publishEntAnnounceBlock",this.publishEntAnnounceBlock+"");
            }else{
              this.publishResumeBlock=false;
              this.publishEntAnnounceBlock=false;
              localStorage.setItem("publishResumeBlock",this.publishResumeBlock+"");
              localStorage.setItem("publishEntAnnounceBlock",this.publishEntAnnounceBlock+"");
            }
          } 
    }
    if(this.authService.getLoginState()){
      this.base_link="/user/"+this.authService.current_user.id_utilisateur;
    }else{
      this.base_link="";

    }
   }

  ngOnInit(): void {
    this.listVilles=VilleDatabase.DATA;
    this.loadStepOneForm();
    this.filteredOptions = this.what.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, []))
    );
    this.filteredOptions1 = this.where.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.listVilles))
    );
    $("main").css("backgroundColor","white");
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

  }
 
  public loadStepOneForm(){
    this.form_step_one=new FormGroup({
      where:this.where,
      what:this.what,
    });
  }
  public _filter(value: string, options: string[]): string[] {
    if (value == null) return [];
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
 
} 

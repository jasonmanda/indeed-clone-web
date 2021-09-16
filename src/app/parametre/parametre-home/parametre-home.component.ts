import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { VilleDatabase } from 'src/app/model/VilleDatabase';
import { startWith, map } from 'rxjs/operators';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { Entreprise } from 'src/app/model/Entreprise';
import { Grants } from 'src/app/model/Grants';
import { Image } from 'src/app/model/Image';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { PasseDataService } from 'src/app/services/passe-data.service';

@Component({
  selector: 'app-parametre-home',
  templateUrl: './parametre-home.component.html',
  styleUrls: ['./parametre-home.component.scss']
})
export class ParametreHomeComponent implements OnInit {
 
  is_ent: boolean = false;
 
 

  businessReglageHelpersService: BusinessReglageHelpersService;
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  base_link:string="/";
  constructor(private passeDataService:PasseDataService,private _snackBar: MatSnackBar, private authService: AuthService, private utilisateurService: UtilisateurService) {

    this.businessReglageHelpersService = new BusinessReglageHelpersService();
    if(this.authService.getLoginState()){
      this.base_link="/user/"+this.authService.current_user.id_utilisateur;
    }else{
      this.base_link="";

    }
  }

  ngOnInit() {
 
    this.loadIsEnt();
    try{
      this.passeDataService.anonymousTypeObservable.subscribe((data:boolean)=>{
  
        if(data){
          this.loadIsEnt();
        }
      });
    }catch(error){
      console.log(error);
    }
 
  }
 
  public loadIsEnt(){
    if (this.authService.getLoginState()) {
      if (this.authService.current_user_info.id_entreprise == null ||
        this.authService.current_user_info.id_entreprise == undefined ||
        this.authService.current_user_info.id_entreprise == 0 ||
        this.authService.current_user_info.id_entreprise == -1) {
        this.is_ent = false;
  
      } else {
        this.is_ent = true;
    

      }
    }
  }
  public _filter(value: string, options: string[]): string[] {
    if (value == null) return [];
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
 
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }
}

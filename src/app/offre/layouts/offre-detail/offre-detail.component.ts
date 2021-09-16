import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BusinessReglageHelpersService } from 'src/app/services/business-helpers/business-reglage-helpers.service';
import { DialogResponse } from 'src/app/model/DialogResponse';
import { Offre } from 'src/app/model/Offre';
import { OffreService } from 'src/app/services/offre.service';
import { BaseQuery } from 'src/app/model/BaseQuery';
import { ToArrayPipe } from 'src/app/pipes/to-array.pipe';


@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },{provide:ToArrayPipe}],
})
export class OffreDetailComponent implements OnInit {
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  current_user_offre:Offre;
  businessReglageHelpersService:BusinessReglageHelpersService;
  nb_depot:number=0;
  message:string="";
  base_link:string="/";
  option:string="";
  constructor(public dialog: MatDialog,public toArrayPipe:ToArrayPipe,private authService:AuthService,private offreService:OffreService,
    public dialogRef: MatDialogRef<OffreDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message=data.message as string; 
      this.base_link=data.base_link as string; 
      this.current_user_offre= data.offre as Offre;
      this.option=data.option as string;
      // 

    
 
    this.businessReglageHelpersService=new BusinessReglageHelpersService();
  }

  ngOnInit(): void {
    
    this.progress_upload_real=false;
    this.offreService.offrePostulerCount("model_2",this.current_user_offre.id_offre,null).subscribe((data:BaseQuery<number>)=>{
      this.progress_upload_real=true;
      if(data.validate){
        if(data.data!=null && data.data!=undefined){
            this.nb_depot=data.data;
        }else{
          this.openMessageDialog("Erreur du chargement du nombre","Erreur serveur","ok");
          this.nb_depot=0;

        }
      }else{
        this.openMessageDialog("Erreur du chargement du nombre",data.erreur_mssg,"ok");
        this.nb_depot=0;

      }
    });
    
  } 


  ///Close modal popup 
  public close(option: string) {

    if (option == "save") {
      // if (this.form_step_one.valid) {
      // } else {
      //   // this.openMessageDialog("Création ou modification en cours","Désirez vous quitter malgré tout");
      // }
    } else {
      // if (this.form_step_one.dirty) {
    
  
      //   this.openMessageDialog("Création ou modification en cours", "Désirez vous quitter malgré tout", "yes,no");
      // } else {
        let response:DialogResponse={};
   
        this.dialogRef.close(response);
      // }
  
    }
  }
    

 
  ///Open Modal  Popup
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }
}

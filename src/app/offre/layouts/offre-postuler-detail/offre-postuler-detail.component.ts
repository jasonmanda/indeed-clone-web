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
import { Resume } from 'src/app/model/Resume';
import { Postuler } from 'src/app/model/Postuler';
import { ResumeService } from 'src/app/services/resume.service';


@Component({
  selector: 'app-offre-postuler-detail',
  templateUrl: './offre-postuler-detail.component.html',
  styleUrls: ['./offre-postuler-detail.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },{provide:ToArrayPipe}],
}) 
export class OffrePostulerDetailComponent implements OnInit {
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  current_user_document:Resume;
  current_user_postuler:Postuler;
  businessReglageHelpersService:BusinessReglageHelpersService;
  nb_depot:number=0;
  base_link:string="/";
  option:string="";
  constructor(public dialog: MatDialog,public toArrayPipe:ToArrayPipe,private authService:AuthService,private resumeService:ResumeService,private offreService:OffreService,
    public dialogRef: MatDialogRef<OffrePostulerDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.base_link=data.base_link as string; 
      this.current_user_postuler= data.postuler as Postuler;
      this.option=data.option as string;
      // 

    
 
    this.businessReglageHelpersService=new BusinessReglageHelpersService();
  }

  ngOnInit(): void {
    
    if(this.option=="postuler"){
      this.progress_upload_real=false;
      this.resumeService.resumeGet(this.current_user_postuler.cv.cv_uid).subscribe((data:BaseQuery<Resume>)=>{
        this.progress_upload_real=true;
        if(data.validate){
          if(data.data!=null && data.data!=undefined){
            setTimeout(()=>{
              this.current_user_document=data.data;

            },150);
              
          }else{
            this.openMessageDialog("Erreur chargement du cv complet","Erreur serveur","ok");
   
  
          }
        }else{
          this.openMessageDialog("Erreur chargement du cv complet",data.erreur_mssg,"ok");
   
        }
      });
    }

    
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

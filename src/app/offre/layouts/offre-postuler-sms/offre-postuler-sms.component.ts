import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-offre-postuler-sms',
  templateUrl: './offre-postuler-sms.component.html',
  styleUrls: ['./offre-postuler-sms.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }, { provide: ToArrayPipe }],
})
export class OffrePostulerSmsComponent implements OnInit {
  form_step_one: FormGroup;
  message: FormControl=new FormControl(null,Validators.compose([Validators.required, Validators.minLength(30)]));
  progress_upload: boolean = false;
  progress_upload_real: boolean = true;
  datas: Postuler[];
  businessReglageHelpersService: BusinessReglageHelpersService;
  base_link: string = "/";
  constructor(public dialog: MatDialog,    private _snackBar: MatSnackBar, public toArrayPipe: ToArrayPipe, private authService: AuthService, private resumeService: ResumeService, private offreService: OffreService,
    public dialogRef: MatDialogRef<OffrePostulerSmsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.base_link = data.base_link as string;
    this.datas = data.data as Postuler[];

    // 



    this.businessReglageHelpersService = new BusinessReglageHelpersService();
  }

  ngOnInit(): void {


    this.loadStepFormOne();

  }

  loadStepFormOne(){
    this.form_step_one=new FormGroup({
      message:this.message,
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
      let response: DialogResponse = {};

      this.dialogRef.close(response);
      // }

    }
  }

  onSubmit(){
    
    this.datas=this.datas.filter(x=>!x.retenue);
    let is_ent:boolean=false;
    if (this.authService.getLoginState()) {
      if (this.authService.current_user_info.id_entreprise == null ||
        this.authService.current_user_info.id_entreprise == undefined ||
        this.authService.current_user_info.id_entreprise==0||
        this.authService.current_user_info.id_entreprise == -1) {
        is_ent = false;
      } else {
        is_ent = true;
  
      }
    }
    for(let i=0;i<this.datas.length;i++){
      this.datas[i].message=this.message.value;
      if(is_ent){
        this.datas[i].entreprise= this.authService.current_user_info;

      }else{
        this.datas[i].personne= this.authService.current_user_info.personne;
      }

    }
 
    this.progress_upload=true;
    this.progress_upload_real=false;
    this.offreService.offrePostulerRetenue(this.datas).subscribe((data:BaseQuery<{status:boolean}>)=>{
      this.progress_upload=true;
      this.progress_upload_real=false;
    
        if (data.validate) { 
          if (data.data != null && data.data != undefined) {
        
            if(data.data.status){
              this._snackBar.open("Message envoyé ",null,{
                duration: 1000
              });
              setTimeout(()=>{
                let response: DialogResponse = {};
                response.response_message="refresh";
                this.dialogRef.close(response);
              },1500);
            }else{
              this.openMessageDialog("Erreur de mise à jour", "Veuille rafraîchir la page", "ok");
 
            }
   
          
          } else {
            this.openMessageDialog("Erreur de mise à jour", "Erreur serveur", "ok");
 
    
          }
        } else {
          this.openMessageDialog("Erreur de mise à jour", data.erreur_mssg, "ok");
        
    
        }
   

    });

  }



  ///Open Modal  Popup
  public openMessageDialog(header: string, message: string, option_button: string): void {
    this.businessReglageHelpersService.openMessageDialog(header, message, option_button, { component: this });
  }
}

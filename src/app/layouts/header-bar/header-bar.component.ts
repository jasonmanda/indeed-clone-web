import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogResponse } from 'src/app/model/DialogResponse';
import { ImageService } from 'src/app/services/helpers/image.service';
import { Image } from 'src/app/model/Image';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PasseDataService } from 'src/app/services/passe-data.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  current_user_image:Image;
  profile_img_path:string="";
  publishResumeBlock: boolean = false;
  publishEntAnnounceBlock: boolean = false;
  base_link:string="/";
  constructor(private passeDataService:PasseDataService,private authService:AuthService,private imageService:ImageService,private router: Router, public dialog: MatDialog, ) { 
    this.profile_img_path=this.authService.base_host+"assets/template/profile.png";
   
    if(this.authService.getLoginState()){
      this.base_link="/user/"+this.authService.current_user.id_utilisateur;
    }else{
      this.base_link="";

    }
  }

  ngOnInit() {
    if(localStorage.getItem('current_user_image')==""
    ||localStorage.getItem('current_user_image')=="null"
    ||localStorage.getItem('current_user_image')=="undefined"){
      this.current_user_image=null;
    }
   else  this.current_user_image= JSON.parse(localStorage.getItem('current_user_image')) as Image;
    if(this.current_user_image!=null && this.current_user_image!=undefined){
      this.profile_img_path = this.imageService.getDocumentPath(this.current_user_image.path_image);
  }else{
    this.profile_img_path = this.authService.base_host+"assets/template/profile.png";


  }
  try{
    this.passeDataService.updateInfoObservable.subscribe((data: boolean) => {
    
  
      if (data) {
    
        setTimeout(()=>{
        
          // this.nestedTreeControl= new NestedTreeControl<AppModuleNode>(node => node.children);
          // this.nestedDataSource= new MatTreeNestedDataSource<AppModuleNode>();
          this.current_user_image= JSON.parse(localStorage.getItem('current_user_image')) as Image;
          this.authService.current_user_image=this.current_user_image;
          if (this.authService.current_user_image != null && this.authService.current_user_image != undefined) {
            this.profile_img_path = this.imageService.getDocumentPath(this.authService.current_user_image.path_image);
          } else {
            this.profile_img_path = this.authService.base_host+"assets/template/profile.png";

          }
           this.passeDataService.myImageSubject(this.current_user_image);
           this.publishResumeBlock = JSON.parse(localStorage.getItem("publishResumeBlock")) as boolean;
 
           this.publishEntAnnounceBlock = JSON.parse(localStorage.getItem("publishEntAnnounceBlock")) as boolean;
        },50);
      }
    });
  }catch(error){
    console.log(error);
  }
  this.publishResumeBlock = JSON.parse(localStorage.getItem("publishResumeBlock")) as boolean;
 
  this.publishEntAnnounceBlock = JSON.parse(localStorage.getItem("publishEntAnnounceBlock")) as boolean;
 

  }
  logOut() {
    localStorage.setItem('current_user', null);//, 1, "/");
    localStorage.setItem('current_user_info', null);//, 1, "/");
    localStorage.setItem('current_user_image', null);//, 1, "/");
    localStorage.setItem('current_user_document', null);//, 1, "/");
    localStorage.setItem('current_user_contact', null);//, 1, "/");
    // this.cookieService.set("current_user_grants", null, 1, "/");
    localStorage.setItem("current_user_grants", null);
    localStorage.setItem("update-info", null);
    this.router.navigate(['/']);
  }
 
 
  ///Open Popup modal
  public openDialog(data: any, component: any, width_type_dimen: string = "px", height_type_dimen: string = "px", width?: number, height?: number): void {

    let lwidth = (width == null ? 'auto' : "" + width + width_type_dimen);
    let lheight = (height == null ? 'auto' : "" + height + height_type_dimen);

    const dialogRef = this.dialog.open(component, {
      autoFocus: false,
      closeOnNavigation: true,
      data: data,
      disableClose: true,
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      height: lheight,
      // position: {
      //   top: '0',
      //   right: '0'
      // },
      width: lwidth
    });

    dialogRef.afterClosed().subscribe((data: DialogResponse) => {




    });


  }
 
}

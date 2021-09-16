 import {Component,OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { AppModuleNode } from 'src/app/model/AppModuleNode';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AuthService } from 'src/app/services/auth.service';
import { PasseDataService } from 'src/app/services/passe-data.service';
import { ImageService } from 'src/app/services/helpers/image.service';
 
@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss'],
  providers: []
})
export class LeftBarComponent implements OnInit {
  // ///Base declaration
  nestedTreeControl: NestedTreeControl<AppModuleNode> = new NestedTreeControl<AppModuleNode>(node => node.children);
  nestedDataSource: MatTreeNestedDataSource<AppModuleNode> = new MatTreeNestedDataSource<AppModuleNode>();


  profile_img_path: string = "";

  // ///Base declaration
  constructor(public authService: AuthService, private passeDataService: PasseDataService, private imageService: ImageService) {

    // this.nestedDataSource.data = AppModuleDatabase.TREE_DATA;
    this.profile_img_path = this.authService.base_host+"assets/template/profile.png";

  }
   ngOnInit() {

  //   // if (this.authService.current_user_image != null && this.authService.current_user_image != undefined) {
  //   //   this.profile_img_path = this.imageService.getDocumentPath(this.authService.current_user_image.path_image);
  //   // } else {
  //   //   this.profile_img_path = this.authService.base_host+"assets/template/profile.png";


  //   // }
  //   // if (this.passeDataService.updateInfoObservable != null && this.passeDataService.updateInfoObservable != undefined) {
  //   //   this.passeDataService.updateInfoObservable.subscribe((data: boolean) => {
  //   //     if (data) {
  //   //       this.nestedDataSource.data=[];
  //   //       setTimeout(()=>{
          
  //   //         // this.nestedTreeControl= new NestedTreeControl<AppModuleNode>(node => node.children);
  //   //         // this.nestedDataSource= new MatTreeNestedDataSource<AppModuleNode>();
  //   //         this.nestedDataSource.data = AppModuleDatabase.TREE_DATA;
  //   //         if (this.authService.current_user_image != null && this.authService.current_user_image != undefined) {
  //   //           this.profile_img_path = this.imageService.getDocumentPath(this.authService.current_user_image.path_image);
  //   //         } else {
  //   //           this.profile_img_path = this.authService.base_host+"assets/template/profile.png";
          
  
  //   //         }

  //   //       },50);
  //   //     }
  //   //   });
  //   // }
   }
  hasChild = (_: number, node: AppModuleNode) => !!node.children && node.children.length > 0;
}

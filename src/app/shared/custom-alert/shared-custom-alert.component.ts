import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogResponse } from 'src/app/model/DialogResponse';

@Component({
  selector: 'app-shared-custom-alert',
  templateUrl: './shared-custom-alert.component.html',
  styleUrls: ['./shared-custom-alert.component.scss']
})
export class SharedCustomAlertComponent implements OnInit {
  @ViewChild("viewMessage",{static:true}) viewMessage:ElementRef;
  //Base declaration
  header:string="";
  message:any;
  option_button:string="";
  yes:boolean=true;
  ok:boolean=true;
  no:boolean=true;
  //Base declaration
  constructor(public dialogRef:MatDialogRef<SharedCustomAlertComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.header=this.data.header;
    this.message=this.data.message;
    this.option_button=this.data.option_button;
    if(this.option_button=="yes,no"){
      this.yes=false;
      this.no=false;
    }
    else if(this.option_button=="ok"){
      this.ok=false;
    }
    else{

    }
  }


  ngOnInit() {
    if(Array.isArray(this.message)){
      for(let i=0;i<this.message.length;i++){
        for(let j=0;j<this.message[i].length;j++){
          let newP:HTMLParagraphElement = document.createElement("p");
          newP.setAttribute("style","color:black;font-weight:bolder");
          newP.setAttribute("class","mb-1");
          let newContent:Text = document.createTextNode(this.message[i][j]); 
          // add the text node to the newly created div
          newP.appendChild(newContent);  
          (this.viewMessage.nativeElement as HTMLElement).append(newP);
    
        } 
      }
    }else{
      let newP:HTMLParagraphElement = document.createElement("p");
      newP.setAttribute("style","color:black;font-weight:bolder");
      let newContent:Text = document.createTextNode(this.message); 
      // add the text node to the newly created div
      newP.appendChild(newContent);  
      (this.viewMessage.nativeElement as HTMLElement).append(newP);
      
    }
  
  }
  
  ///Close modal popup
  close(option){
    let response:DialogResponse={};
    response.response_message=option;
    this.dialogRef.close(response);
  }
}

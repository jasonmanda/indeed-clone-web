import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
 

@Component({
  selector: 'app-shared-login',
  templateUrl: './shared-login.component.html',
  styleUrls: ['./shared-login.component.scss']
})
export class SharedLoginComponent implements OnInit {
 

  ///Form Group
  @Input() form_step_one:FormGroup;
 
  ///Form Control
  @Input() email:FormControl;
  @Input() password:FormControl;
  @Input() oldPassword:FormControl;
  @Input() confirmPassword:FormControl;
  @Input() type:String;
  hide:boolean=true;
  hide1:boolean=true;
  hide2:boolean=true;

 

  constructor() { }

  ngOnInit() {
  }
 
}
 
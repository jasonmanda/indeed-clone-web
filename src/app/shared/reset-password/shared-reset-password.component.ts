import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
 

@Component({
  selector: 'app-shared-reset-password',
  templateUrl: './shared-reset-password.component.html',
  styleUrls: ['./shared-reset-password.component.scss']
})
export class SharedResetPasswordComponent implements OnInit {
 

  ///Form Group
  @Input() form_step_one:FormGroup;
 
  ///Form Control
  @Input() email:FormControl;
 

  hide:boolean=true;

  constructor() { }

  ngOnInit() {
  }
 
}
 
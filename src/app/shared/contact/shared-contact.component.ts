import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateSnTelValidator } from 'src/app/validator/validate-sn-tel-validator';
import { ValidateUrlValidator } from 'src/app/validator/validate-url-validator';
 

@Component({
  selector: 'app-shared-contact',
  templateUrl: './shared-contact.component.html',
  styleUrls: ['./shared-contact.component.scss']
})
export class SharedContactComponent implements OnInit {
 

  ///Form Group
  @Input() form_step_one:FormGroup;
  @Input() facebook: FormControl;
  @Input() linkedin: FormControl;
  @Input() mail: FormControl;
  @Input() numero: FormControl;
  @Input() twitter: FormControl;
  @Input() website: FormControl;

  ///Form Control
 

  constructor() { }

  ngOnInit() {
  }
 
}
 
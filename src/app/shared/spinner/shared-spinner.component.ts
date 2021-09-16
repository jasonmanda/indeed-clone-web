import { Component, OnInit, Input,  OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-shared-spinner',
  templateUrl: './shared-spinner.component.html',
  styleUrls: ['./shared-spinner.component.scss']
})
export class SharedSpinnerComponent implements OnInit,OnChanges {


  @Input() progress_upload_real:boolean;
  
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges){
   this.progress_upload_real=(changes.progress_upload_real as SimpleChange).currentValue as boolean;
  }

}

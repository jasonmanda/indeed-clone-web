import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shared-search-home',
  templateUrl: './shared-search-home.component.html',
  styleUrls: ['./shared-search-home.component.scss']
})
export class SharedSearchHomeComponent implements OnInit {
  @Input() form_step_one:FormGroup;
  @Input() where:FormControl;
  @Input() model:string;
  @Input() what:FormControl;
  @Input() filteredOptions: Observable<string[]>;
  @Input() filteredOptions1: Observable<string[]>;
  base_link:string="/";
  constructor(private authService:AuthService) {

    if(this.authService.getLoginState()){
      this.base_link="/user/"+this.authService.current_user.id_utilisateur;
    }else{
      this.base_link="";

    }
   }

  ngOnInit() {
  }

}

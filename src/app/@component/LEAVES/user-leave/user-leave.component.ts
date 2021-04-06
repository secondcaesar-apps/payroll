import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-user-leave',
  templateUrl: './user-leave.component.html',
  styleUrls: ['./user-leave.component.scss']
})
export class UserLeaveComponent extends BaseComponent implements OnInit {
  constructor(public api: ApiserviceService) {
    super(api);
  }

  ngOnInit() {

   // this.special(APIENUM.LEAVEAVAILABLE);

  }
  onTabChange(event){
    
  }


}


//LEAVEAVAILABLE
//

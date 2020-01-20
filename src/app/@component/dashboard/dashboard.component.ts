import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './../../@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  elements = [];
  element = [];
  Totalemployee: Number = 0; 
  Totalasset: Number = 0; 
  constructor(
    private Api: ApiserviceService,
    ) { }

  ngOnInit() {
    this.Api.Read(APIENUM.EMP)
    .subscribe((res:any)=>{
      this.elements=res.records;
     this.Totalemployee = this.elements.length
    })
    this.Api.Read(APIENUM.ASS)
    .subscribe((res:any)=>{
      this.element=res.records;
     this.Totalasset = this.element.length
    })
  }


}

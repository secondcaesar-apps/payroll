import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-sdepartment',
  templateUrl: './sdepartment.component.html',
  styleUrls: ['./sdepartment.component.scss']
})
export class SdepartmentComponent extends BaseComponent implements OnChanges {
  @Input() dateValue: any =null;
  routePage ="../edit";
  apis=APIENUM.SVP;
  q = ['Q1','Q2','Q3','Q4'];

  dates = new Date().getFullYear();
  year: any= this.dates;
  D = [this.dates-2,this.dates-1,this.dates,this.dates+1,this.dates+2];
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "Question",
      header: "Question",
      routerParams:true,
    },

    {
      primaryKey: "StronglyAgree",
      header: "Strongly Agree",
      percent:true

    },
    {
      primaryKey: "Agree",
      header: "Agree",
      percent:true
    },
    {
      primaryKey: "Disagree",
      header: "Disagree",
      percent:true
    },
    {
      primaryKey: "Neutral",
      header: "Neutral",
      percent:true
    },
    {
      primaryKey: "Totalresponses",
      header: "Total Responses",
      percent:true
    },




    // DepartmentName: "Customer Engagement"
    // Rating: "60.0000"


  ];
  QT: any;
  result: any;



  constructor(private shared: SharedService,public api: ApiserviceService){

    super(api);
  }

  ngOnChanges()  {




    if(this.dateValue!=null){
// let result = this.QT+"-"+this.year;

    let value= {"Period": this.dateValue};
    this.baseItems=null;
    this.getPeriod(value);
    }



    // let result = this.QT+"-"+this.year;

    // let value= {"Period": result};
    // this.baseItems=null;
    // this.getPeriod(value);

  }


  getPeriod(id){


    this.api.Special(APIENUM.SDEPART,id).subscribe((res:any)=>{
      this.result= res.records;
    //  this.baseItems= res.Report;
    });

  }



}

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-sscorebyperiod',
  templateUrl: './sscorebyperiod.component.html',
  styleUrls: ['./sscorebyperiod.component.scss']
})
export class SscorebyperiodComponent extends BaseComponent implements OnChanges {
  @Input() dateValue: any =null;
  routePage ="../edit";
  apis=APIENUM.SSCORE;
  q = ['Q1','Q2','Q3','Q4'];

  dates = new Date().getFullYear();
  year: any= this.dates;
  D = [this.dates-2,this.dates-1,this.dates,this.dates+1,this.dates+2];
  projectSettings: ColumnSetting[] = [

    // {
    //   primaryKey: "DepartmentID",
    //   header: "Department ID",

    // },

    {
      primaryKey: "DepartmentName",
      header: "DepartmentName",
      routerParams:true,

    },
    {
      primaryKey: "Score",
      header: "Score",
      percent:true

    },




    // DepartmentName: "Customer Engagement"5
    // Rating: "60.0000" Score


  ];
  QT: any;



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

    this.shared.getInfo().subscribe((res)=>{

      if(res){
        this.special(APIENUM.SSCORE,id);
      }
    })
    this.special(APIENUM.SSCORE,id);

  }



}

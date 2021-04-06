import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-sdashboard',
  templateUrl: './sdashboard.component.html',
  styleUrls: ['./sdashboard.component.scss']
})
export class SdashboardComponent extends BaseComponent implements OnChanges {
  @Input() dateValue: any =null;
  routePage ="../edit";
  apis=APIENUM.SDASH;
  q = ['Q1','Q2','Q3','Q4'];

  dates = new Date().getFullYear();
  year: any= this.dates;
  D = [this.dates-2,this.dates-1,this.dates,this.dates+1,this.dates+2];
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "DistinctEmployee",
      header: "Distinct Employee",
      routerParams:true,
    },

    {
      primaryKey: "TotalEmployee",
      header: "Total Employee",

    },




    // DepartmentName: "Customer Engagement"5
    // Rating: "60.0000"


  ];
  QT: any;
  list: any;



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

    // this.shared.getInfo().subscribe((res)=>{

    //   if(res){
    //     this.special(APIENUM.SDASH,id);
    //   }
    // })
    this.api.Special(APIENUM.SDASH,id).subscribe((res:any)=>{
 this.list= res.records[0];
    });

  }



}

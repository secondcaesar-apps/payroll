import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';


@Component({
  selector: 'app-leave-tab',
  templateUrl: './leave-tab.component.html',
  styleUrls: ['./leave-tab.component.scss']
})
export class LeaveTabComponent extends BaseComponent implements OnInit {

  routePage ="../display";
  apis='leave'
  projectSettings: ColumnSetting[] = [



    {
      primaryKey: "LeaveID",
      header: "LeaveID",
      routerParams:true

    },
    {
      primaryKey: "LeaveTypeName",
      header: "Leave Type Name",

    },
    {
      primaryKey: "Reason",
      header: "Reason",
    },
    {
      primaryKey: "LeaveDays",
      header: "Leave Days",
    },
    {
      primaryKey: "StartDate",
      header: "Start Date",
      date:true

    },
    {
      primaryKey: "EndDate",
      header: "End Date",
      date:true

    },
    {
      primaryKey: "Status",
      header: "Status",
    }



  ];

  constructor(public api: ApiserviceService,private shared: SharedService,){
    super(api);
  }

  ngOnInit() {
    this.shared.getInfo().subscribe((res)=>{

      if(res){
        this.readonEmp(APIENUM.LEAVE);
      }
    })

    this.readonEmp(APIENUM.LEAVE);
  }

}
// DateCreated: "2021-01-14 17:51:28"
// EmployeeID: "EMP1900007"
// EndDate: "2021-01-22"
// FirstName: "Henry"
// ID: "19"
// LastName: "Idise"
// LeaveID: "LV1900019"
// LeaveType: "LVT1900002"
// LeaveTypeName: "Sicks"
// PostedUser: "IT UNIT TEST ACCOUNT"
// Reason: "nothing"
// StartDate: "2021-01-06"
// Status: "Pending"

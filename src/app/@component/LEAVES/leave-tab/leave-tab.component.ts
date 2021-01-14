import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';


@Component({
  selector: 'app-leave-tab',
  templateUrl: './leave-tab.component.html',
  styleUrls: ['./leave-tab.component.scss']
})
export class LeaveTabComponent extends BaseComponent implements OnInit {

  routePage ="";
  apis='customer'
  projectSettings: ColumnSetting[] = [

    {
      primaryKey: "DateCreated",
      header: "DateCreated",

    },
    {
      primaryKey: "FirstName",
      header: "First Name",

    },
    {
      primaryKey: "LastName",
      header: "Last Name",


    },
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
      primaryKey: "StartDate",
      header: "Start Date",

    },
    {
      primaryKey: "Status",
      header: "Status",
    }



  ];

  constructor(public api: ApiserviceService){
    super(api);
  }

  ngOnInit() {
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

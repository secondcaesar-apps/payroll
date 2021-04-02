import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';


@Component({
  selector: 'app-leave-approval-tab',
  templateUrl: './leave-approval-tab.component.html',
  styleUrls: ['./leave-approval-tab.component.scss']
})
export class LeaveApprovalTabComponent extends BaseComponent implements OnInit {
  routePage ="../process";
  apis='leave'
  projectSettings: ColumnSetting[] = [

    {
      primaryKey: "LastName",
      header: "Surname",

    },
    {
      primaryKey: "FirstName",
      header: "First Name",

    },
    {
      primaryKey: "Gender",
      header: "Gender",

    },
    {
      primaryKey: "EmployeeID",
      header: "EmployeeID",

    },
    {
      primaryKey: "LeaveID",
      header: "LeaveID",
      routerParams:true

    },
    {
      primaryKey: "Email",
      header: "Email",

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
      primaryKey: "DateCreated",
      header: "DateCreated",

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
this.load()
  }
  load(){
    let value = {EmployeeID :  sessionStorage.getItem('EmpID')}
    this.special(APIENUM.LEAVEREPORT,value);
  }
}


// DateCreated: "2021-01-14 00:54:56"
// Department: "DPT1900016"
// Designation: "DSG1900022"
// Email: "Idorenying@gmail.com"
// EmployeeID: "EMP1900048"
// EndDate: "2021-01-07"
// FirstName: "Idorenying"
// Gender: "Female"
// ID: "1"
// JoiningDate: "2018-01-02"
// LastName: "Alaog"
// LeaveID: "LV1900001"
// LeaveType: "LVT1900002"
// Location: "LT1900002"
// MaritalStatus: "Married"
// ProbationEndDate: null
// Reason: "i sick o"
// Role: "RL1900001"
// StartDate: "2021-01-01"
// Status: "Approved"

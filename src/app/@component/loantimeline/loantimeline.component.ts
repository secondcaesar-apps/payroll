import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-loantimeline',
  templateUrl: './loantimeline.component.html',
  styleUrls: ['./loantimeline.component.scss']
})
export class LoantimelineComponent extends BaseComponent implements OnInit {
    data: any;
  routePage = "../timeline";
  apis = 'loan';
  projectSettings: ColumnSetting[] = [

    {
      primaryKey: "EmployeeID",
      header: "Employee ID",

    },
    {
      primaryKey: "DateCreated",
      header: "Date Created",
      date: true

    },
    {
      primaryKey: "LoanTimelineID",
      header: "Loan Timeline ID",
      routerParams: true
      //currency:true

    },

    {
      primaryKey: "LoanID",
      header: "LoanID",


    },
    {
      primaryKey: "PWFName",
      header: "Designation",



    },



    {
      primaryKey: "PostedUser",
      header: "PostedUser",
    },
    {
      primaryKey: "Note",
      header: "Comment",
    },

    {
      primaryKey: "Status",
      header: "Status",
    }



  ];
  id: any;
  value: any;
  constructor(public api: ApiserviceService, public router: Router, public route: ActivatedRoute) {
    super(api);
  }


  ngOnInit() {
    // this.load();
    this.routes()

  }

  load() {
    let value = { [this.value]: this.id }
    this.special(APIENUM.LOANTIMELINE, value);
  }

  routes() {

    this.route.paramMap.forEach((params: any) => {

      let value = params.params;

      console.log(value)

      this.id = value['id'];
      this.apis = value['api'];
      this.value = value['value'];

      this.load()

      // api: "leave"
      // id: "LV1900001"
      // value: "LeaveID"

    });

  }

}
// DateCreated: "2021-01-17 21:13:32"
// EmployeeID: "EMP1900047"
// ID: "54"
// LoanID: "LOAN1900019"
// LoanTimelineID: "LT1900053"
// Note: "Loan Process Initailiazation"
// PWFName: "RegularUser"
// PostedUser: "Ajayi Victor"
// Status: "Generated"
// Typed: "Loan"

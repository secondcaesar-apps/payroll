import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum'
import { MdbTableDirective, ToastService } from 'ng-uikit-pro-standard';
import swal from 'sweetalert2';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-report',
  templateUrl: './loan-approval.component.html',
  styleUrls: ['./loan-approval.component.scss']
})
export class LoanApprovalComponent extends BaseComponent implements OnInit {
  routePage ="../process";
  apis='loan'
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
      primaryKey: "DesignationName",
      header: "Designation Name",

    },
    {
      primaryKey: "SalaryGroupName",
      header: "SalaryGroupName",

    },
    {
      primaryKey: "DepartmentName",
      header: "DepartmentName",


    },
    {
      primaryKey: "LoanID",
      header: "LoanID",
      routerParams:true

    },
    {
      primaryKey: "LoanRequestAmount",
      header: "Loan Amount",
      currency:true


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
  this.special(APIENUM.APPROVELOAN,value);
  }
}


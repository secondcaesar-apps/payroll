import { map } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from '../../@shared/apiservice.service';
import { Component, OnInit} from '@angular/core';

import { SharedService } from 'src/app/@shared/shared/shared.service';
import { Router } from '@angular/router';

import { BaseComponent } from '../base/base.component';
import { ColumnSetting } from 'src/app/models/layout.model';
import { tr } from 'date-fns/locale';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-read-loan',
  templateUrl: './read-loan.component.html',
  styleUrls: ['./read-loan.component.scss']
})


export class ReadLoanComponent extends BaseComponent implements OnInit {  data:any;
  routePage ="../timeline";
  apis='loan';
  projectSettings: ColumnSetting[] = [

    {
      primaryKey: "AccountNumber",
      header: "Account Number",

    },
    {
      primaryKey: "DateCreated",
      header: "Date Created",
      date:true

    },
    {
      primaryKey: "LoanRequestAmount",
      header: "Loan Amount",
      currency:true

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
      primaryKey: "MonthlyDeduction",
      header: "Monthly Deduction",
    },
    {
      primaryKey: "Tenor",
      header: "Tenor",
    },

    {
      primaryKey: "Status",
      header: "Status",
    }



  ];
  constructor(public api: ApiserviceService,public router:Router){
    super(api);
  }


    ngOnInit() {
      this.load();

    }

    load(){
      let value = {EmployeeID :  sessionStorage.getItem('EmpID')}
    this.special(APIENUM.LOANEMPLOYEE,value);
    }

  requestLoan() {
   this.router.navigate(['/main/loan']);
  }



  }
  // AccountNumber: "7241032383" employeeread
  // CurrentAmountOutstanding: null
  // CurrentTenorOutstanding: null
  // DTI: "0"
  // DateCreated: "2021-01-17 12:00:28"
  // DateOfResumption: "2017-07-01"
  // DepartmentHead: "EMP1900089"
  // DepartmentName: "Corporate Services"
  // DesignationName: "Associate 3"
  // EmployeeID: "EMP1900036"
  // FirstName: "David"
  // GuaranteedLoan: "Ok"
  // GuarantorDepartmentName: "Corporate Services"
  // GuarantorDetailsLoanGuaranted: null
  // GuarantorID: "EMP1900001"
  // GuarantorOfficeEmail: "hardecx@yahoo.com"
  // GuarantorOfficeNumber: "8038764390"
  // GuarantorPersonalEmail: null
  // GuarantorSignature: null
  // ID: "13"
  // InfolinkLoanID: null
  // LastName: "Anokwuru"
  // Level: "0"
  // LoanID: "LOAN1900013"
  // LoanRequestAmount: "3000.00"
  // MonthlyDeduction: "0"
  // NetSalary: "200799.00"
  // OutstandingLoanAmount: "0.00"
  // OutstandingTenor: null
  // PostedUser: "IT UNIT TEST ACCOUNT"
  // SalaryGroup: "SG1900018"
  // SalaryGroupName: "Associate III"
  // Status: "Generated"
  // Tenor: "1"

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { ColumnSetting } from 'src/app/models/layout.model';

@Component({
  selector: 'app-mreport',
  templateUrl: './mreport.component.html',
  styleUrls: ['./mreport.component.scss']
})
export class MreportComponent implements OnInit {
  selectedId: any;

  routePage ="../process";
  apis='trial'
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "FirstName",
      header: "First Name",
    },
    {
      primaryKey: "LastName",
      header: "LastName",
    },
    {
      primaryKey: "DesignationName",
      header: "DesignationName",
    },
    {
      primaryKey: "NetSalary",
      header: "NetSalary",
      currency:true

    },

    {
      primaryKey: "GrossPay",
      header: "GrossPay",
      currency:true


    },
    {
      primaryKey: "Account",
      header: "Account Number",
      routerParams:true
    },


    {
      primaryKey: "BasicSalary",
      header: "Basic Salary",
      currency:true

    },
    {
      primaryKey: "Benefitinkind",
      header: "Benefit In kind",
      currency:true

    },
    {
      primaryKey: "EducationAllowance",
      header: "Education Allowance",
      currency:true

    },
    {
      primaryKey: "EntertainmentAllowance",
      header: "Entertainment Allowance",
      currency:true

    },
    {
      primaryKey: "HousingAllowance",
      header: "Housing Allowance",
      currency:true

    },
    {
      primaryKey: "LeaveAllowance",
      header: "Leave Allowance",
      currency:true

    },
    {
      primaryKey: "LocationsName",
      header: "Locations Name",

    },
    {
      primaryKey: "Pension",
      header: "Pension",
      currency:true

    },
    {
      primaryKey: "Tax",
      header: "Tax",
      currency:true

    },
    {
      primaryKey: "TotalAmountDue",
      header: "Total AmountDue",
      currency:true

    },
    {
      primaryKey: "TransportAllowance",
      header: "Transport Allowance",
      currency:true

    },
    {
      primaryKey: "UtilitiesAllowance",
      header: "Utilities Allowance",
      currency:true

    },
    {
      primaryKey: "WardrobeAllowance",
      header: "WardrobeAllowance",
      currency:true

    },



  ];
  baseItems: any;
  loading:boolean=true;

  constructor(private route: ActivatedRoute,  private service: ApiserviceService,) { }

  ngOnInit() {
    this.router();
  }

  router(){
    this.route.paramMap.forEach((params: any) => {
      let value = params.params;

     console.log(value['id'].toString());
     this.getMonth(value['id'].toString())

    });

  }

  getMonth(id){
    this.service.MontlyRead({Month:id},APIENUM.PAYROLLM).subscribe((res:any)=>{
      console.log(res);
      this.baseItems=res.records;
      this.loading=false;
    })

  }

}
// Account: "7240040626"
// BasicSalary: "915416.67"
// Benefitinkind: "258115.06"
// DesignationName: "Chief Executive Officer"
// EducationAllowance: "274625.00"
// EntertainmentAllowance: "258115.06"
// FirstName: "Segun"
// GrossPay: "25448820.00"
// HousingAllowance: "109850.00"
// LastName: "Akintemi"
// LeaveAllowance: "274625.00"
// LocationsName: "HQ"
// NetSalary: "2120735.00"
// Pension: "87880.00"
// Tax: "469310.42"
// TotalAmountDue: "2120735.00"
// TransportAllowance: "73233.33"
// UtilitiesAllowance: "183083.33"
// WardrobeAllowance: "330863.54"

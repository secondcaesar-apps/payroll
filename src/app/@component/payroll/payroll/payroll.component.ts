import { map } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from '../../../@shared/apiservice.service';
import { Component, OnInit, Input, ElementRef, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';


@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];
  dated: string = new Date().toJSON().slice(0, 10)
  error: Boolean = false;
  headElements = ['Employee', 'Net Salary', 'Pay Date', 'Status'];
  searchText: string = '';
  previous: string;
  message: Boolean = false;
  loading: Boolean = true;
  messages: string;
  maxVisibleItems: number = 8;
  loaded: boolean = false
  show: Boolean;
  displaySide: Boolean = false;
  date: string = '';
  myForm1: FormGroup;
  Month: string = '';
  statusValue: string = '';
  NetSalary: string = '';
  SalaryGroup: string = '';
  PaymentMethod: string = '';
  PaymentDate: string = '';
  EmployeeStatus: string = '';
  SalarySlipID: string = '';
  EmployeeID: string = '';
  constructor(
    private router: Router,
    private service: ApiserviceService,
    private fb: FormBuilder,
    private shared: SharedService,
  ) { }

  ngOnInit() {
    this.myForm1 = this.fb.group({
      Month: [this.date, Validators.required]
    });
    // .pipe(
    //   map((values: any) => {
    //     this.date = values;
    //     console.log(values)
    //     this.service.MontlyRead(this.date, APIENUM.PAYROLL)
    // .subscribe((res: any) => {
    //   this.loading = false;
    //   this.elements = res.records;
    //   this.mdbTable.setDataSource(this.elements);
    //   this.elements = this.mdbTable.getDataSource();
    //   this.previous = this.mdbTable.getDataSource();
    // }, (err: any) => {
    //   this.loading = false;
    //   this.messages = err.error.message;
    //   this.message = true;
    // })
    //   })
    // )
    let date = new Date().toJSON().slice(0, 10)
  
    this.service.MontlyRead({
      Month: this.dated
    }, APIENUM.PAYROLLM)
    .subscribe((res: any) => {
      this.loading = false;
      this.error = false;
      this.elements = res.records;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, (err: any) => {
      this.loading = false;
      this.error = true;
      this.messages = err.error.message;
      this.message = true;
      this.elements = [];
    })
  }

  hitApi() {

    this.service.MontlyRead(this.myForm1.value, APIENUM.PAYROLLM)
      .subscribe((res: any) => {
        this.loading = false;
        this.error = false;
        this.elements = res.records;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }, (err: any) => {
        this.loading = false;
        this.error = true;
        this.messages = err.error.message;
        this.message = true;
        this.elements = [];
      })
  }
  view() {
    this.show = !this.show;
  }
  newemployee() {
    this.router.navigate(['/main/create-employer'])
  }
  reademployee() {
    this.router.navigate(['/main/read-employer'])
  }
  openDetails(el) {
    if (this.show) {
      this.displaySide = true;
      this.statusValue = el.Status;
      this.NetSalary = el.NetSalary;
      this.SalaryGroup = el.SalaryGroup;
      this.PaymentMethod = el.PaymentMethod;
      this.PaymentDate = el.PaymentMethod;
      this.EmployeeStatus = el.EmployeeStatus
      this.EmployeeID = el.EmployeeID;
      this.SalarySlipID = el.SalarySlipID;
      this.Month = el.Month;

      let data = {
        "SalaryGroupID": el.SalaryGroupID
      }
      this.service.ReadOne(APIENUM.PAYROLLM,data)
      .subscribe((res:any)=>{
        this.loading = false;
         console.log(res.records)
        //  this.Name = res.records[0].Name;
        //  this.Type = res.records[0].Type;
        //  this.Amount = res.records[0].Amount;
        //  this.SalaryComponentID = res.records[0].SalaryComponentID;
      }, (err: any) => {
        console.log(err.error.message);
      })
    }
  }


  generatePayroll() {
    this.router.navigate(['/main/generate-payroll']);
  }



}
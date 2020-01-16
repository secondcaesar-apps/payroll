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
  headElements = ['Employee','Pay Date', 'Total Amount Due',  'Status'];
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
  Salaryslip:any;
error_message: string="";
errormsg: boolean = false
gen = false;
  constructor(
    private router: Router,
    private service: ApiserviceService,
    private fb: FormBuilder,
    private shared: SharedService,
  ) {
    
    var d = new Date();
 
    var date = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
     
    var dateStr =(year + "-" + month + "-" + date).toString();
    console.log(dateStr);
    service.BLnk(APIENUM.CHECK,{Month:dateStr}).subscribe((res:any)=>{
   
      if( res.records.length>0){
this.gen= true;
      }
    })
   }
  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.myForm1 = this.fb.group({
      Month: [this.date, Validators.required]
    });
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
   searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
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
      this.PaymentDate = el.PaymentDate;
      this.EmployeeStatus = el.EmployeeStatus
      this.EmployeeID = el.EmployeeID;
      this.SalarySlipID = el.SalarySlipID;
      this.Month = el.Month;

      this.service.ReadOne(APIENUM.PAYROLL, {
        SalarySlipID: el.SalarySlipID
      })
      .subscribe((res: any) => {
        console.log(res.records);
        this.Salaryslip =res.records
        this.error_message = "";
        this.errormsg = false;
      },(err: any) => {
        this.Salaryslip =[];
        this.error_message = err.error.message;
        this.errormsg = true;
      })
    } else {
      this.router.navigate(['/main/payslip']);
      this.shared.AddInfo(el)
    }
  }


  generatePayroll() {

    if(this.gen){
      swal.fire({
        title: 'Duplicate payslip?',
        text: "Do you want to override this current payslip?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create new  payslip!'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/main/generate-payroll']);
        
        }
        
      })
    }
    else{
      this.router.navigate(['/main/generate-payroll']);
    }
   // 
  }



}
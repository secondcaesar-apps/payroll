import { map } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from '../../@shared/apiservice.service';
import { Component, OnInit, Input, ElementRef, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-payroll',
  templateUrl: './user-payroll.component.html',
  styleUrls: ['./user-payroll.component.scss']
})
export class UserPayrollComponent implements OnInit {
  data:any;
@ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
elements = [];
dated: string = new Date().toJSON().slice(0, 10)
error: Boolean = false;
headElements = ['Month', 'Net Salary','Total Amount Due','Payment Method', 'Attendance', 'Status'];
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
d = new Date();
dates = this.d.getDate();
month = this.d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
year = this.d.getFullYear();
months = this.d.getMonth()
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
constructor(
  private router: Router,
  private service: ApiserviceService,
  private fb: FormBuilder,
  private shared: SharedService,
) { 
  var dateStr =(this.year + "-" + this.month + "-" + this.dates).toString();

  if(this.months === 0){
    this.months = 12;
    this.year  = this.d.getFullYear() -1;
    var dateSt = (this.year + "-" + this.months + "-" + this.dates).toString();
  } else {
    var dateSt =(this.year + "-" + this.months + "-" + this.dates).toString();
  }
  this.myForm1 = this.fb.group({
    StartDate: [dateSt, Validators.required],
    EndDate: [dateStr, Validators.required]
  });
}
    @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit() {
   this.load();
  }

  load(){

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

    this.service.EmployeeSalaryRead({
      EmployeeID:  sessionStorage.getItem('EmpID'), ...this.myForm1.value
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
  public captureScreen()
  {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
       // Few necessary setting options
        var imgWidth = 200;
        var pageHeight = 255;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4');  // A4 size page of PDF
         var position = 0;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
          pdf.save('pdf.pdf'); // Generated PDF
         });
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

  view() {
    this.show = !this.show;
  }

  newemployee() {
    this.router.navigate(['/main/create-employer'])
  }

  reademployee() {
    this.router.navigate(['/main/read-employer'])
  }
  
}
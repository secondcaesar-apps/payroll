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
myForm1: FormGroup;
myForm2: FormGroup;
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
d = new Date();
dater = this.d.getDate();
month = this.d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
year = this.d.getFullYear();
months = this.d.getMonth()
constructor(
  private router: Router,
  private service: ApiserviceService,
  private fb: FormBuilder,
  private shared: SharedService,
) { 
  var dateStr =(this.year + "-" + this.month + "-" + this.dater).toString();

  if(this.months === 0){
    this.months = 12;
    this.year  = this.d.getFullYear() -1;
    var dateSt = (this.year + "-" + this.months + "-" + this.dater).toString();
  } else {
    var dateSt =(this.year + "-" + this.months + "-" + this.dater).toString();
  }

  this.myForm2 = this.fb.group({
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

    this.service.EmployeeSalaryRead({
      EmployeeID:  sessionStorage.getItem('EmpID'), ...this.myForm2.value
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
    var data = document.getElementById('export')!;
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 200;
      var pageHeight = 298;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL('image/jpeg', 0.3 )
      var doc =  new jspdf('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
         doc.save('report.pdf'); // Generated PDF
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
  this.router.navigate(['/main/generate-payroll']);
}



}
// this.service.ReadOne(APIENUM.PAYROLL, {
//   SalarySlipID: el.SalarySlipID
// })
// .subscribe((res: any) => {
//   console.log(res.records);
//   this.name = res.records[0].Name;
//   this.name1 = res.records[1].Name;
//   this.amount = res.records[0].Amount;
//   this.amount1 = res.records[1].Amount;
// })

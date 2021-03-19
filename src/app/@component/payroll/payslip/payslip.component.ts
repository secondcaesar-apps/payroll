import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { APIENUM } from 'src/app/@shared/enum';
import { Location } from '@angular/common';
@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {
element:any
SalarySlipID: string = '';
EmployeeID: string = '';
Salaryslip:any;
Salaryslipcredit:any =[];
Salaryslipdebit:any =[];
error_message: string="";
errormsg: boolean = false;
deductions: boolean = false;
earnings: boolean = false;
show: boolean = false
amount: boolean = false
TotalDeductions: number = 0;

TotalEarnings: number = 0;
  constructor(
    private shared: SharedService,
    private router: Router,
    private service: ApiserviceService,
    private _loc: Location
  ) { }

  ngOnInit() {

    if (this.shared.getInfo().value === null){
      this.router.navigate(['/main/user-payroll']);
    } else{
      this.element = this.shared.getInfo().value
      this.service.ReadOne(APIENUM.PAYROLL, {
        SalarySlipID: this.element.SalarySlipID
      })
      .subscribe((res: any) => {
        console.log(res.records);
        this.Salaryslip =res.records
        this.Salaryslip.forEach((element:any) => {
          if(element.Type === "Credit"){
            this.earnings = true;
              this.Salaryslipcredit.push(element)
              this.TotalEarnings = parseFloat(element.Amount) + this.TotalEarnings;
              console.log(this.TotalEarnings);
          } else {
            this.deductions = true;
            this.Salaryslipdebit.push(element)
            this.TotalDeductions = parseFloat(element.Amount) + this.TotalDeductions;
          }
        });
        this.error_message = "";
        this.errormsg = false;
      },(err: any) => {
        this.Salaryslip =[];
        this.error_message = err.error.message;
        this.errormsg = true;
      })
    }
  }
  public captureScreen()
  {
    var data = document.getElementById('contentToConvert');
    html2canvas(data,{useCORS: true}).then(canvas => {
       // Few necessary setting options
        var imgWidth = 220;
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
         clculate(amount1, amount2){
          return amount1 - amount2
         }
         back(){
           this._loc.back()
         }
}

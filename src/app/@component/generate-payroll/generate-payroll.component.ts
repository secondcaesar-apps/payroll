import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ConditionalExpr } from '@angular/compiler';
@Component({
  selector: 'app-generate-payroll',
  templateUrl: './generate-payroll.component.html',
  styleUrls: ['./generate-payroll.component.scss']
})
export class GeneratePayrollComponent implements OnInit {
  payrollGenarte: FormGroup;
  error: any;
  success: any;
  constructor(private _fb: FormBuilder, private service: ApiserviceService,private _location: Location) {


    this.payrollGenarte = this._fb.group({
      Item: this._fb.array([this.createItem('', '')])
    })
  }

  ngOnInit() {

    this.service.populatePayRoll().subscribe((res: any) => {
 console.log(res);

      for (let index = 0; index < res.records.length; index++) {
        const element = res.records[index];


        this.addItem(res.records[index], index);
      }

    })


    this.itemArray.removeAt(0);
  }


  createItem(value?: any, index?: any) {


    return this._fb.group({
      SalaryGroup: [value.SalaryGroupID ? value.SalaryGroupID : '', [Validators.required]],
      Month: [this.convert(), [Validators.required]],
      PaymentMethod: ['online', [Validators.required]],
      PaymentDate: [this.convert(), [Validators.required]],
      EmployeeStatus: ['Active', [Validators.required]],
      Attendance: [22, [Validators.required,Validators.min(0),Validators.max(22)]],
      TotalAmountDue: [value.NetPay ? value.NetPay : '', [Validators.required]],
      NetSalary: [value.NetPay ? value.NetPay : '', [Validators.required]],
      EmployeeID: [value.EmployeeID ? value.EmployeeID : '', [Validators.required]],
      Status: ['Generated', [Validators.required]],
      FirstName:[value.FirstName,[Validators.required]],
      LastName:[value.LastName,[Validators.required]]
    });
  }


  get itemArray() {
    return this.payrollGenarte.get('Item') as FormArray;
  }


  addItem(value, id) {
    this.itemArray.push(this.createItem(value, id));
    //this.itemArray.removeAt(0);
  }


  async  changeAttendance(i) {


    const { value: Attendance = this.itemArray.controls[i].value.Attendance } = await swal.fire({
      title: 'Change Attendance ',
      input: 'number',
      showCancelButton: true,
      inputPlaceholder: '0.'
    })

    this.itemArray.controls[i].value.Attendance = Attendance;
    this.itemArray.controls[i].value.TotalAmountDue = Attendance * this.itemArray.controls[i].value.NetSalary / 22;



  }
  back () {
    this._location.back()
  }

  convert() {
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


  CreatePayslip() {
    //console.log(this.itemArray.value);
    let data = this.itemArray.value;
    this.service.createPayslip(data).subscribe((res:any) => {
      this.success=res.message
    }, (err: any) => {
      this.error = err.error.message;
    });
  }

  removeItems(id) {
    this.itemArray.removeAt(id);
   // this.Cart();
  }
}

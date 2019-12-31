import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-generate-payroll',
  templateUrl: './generate-payroll.component.html',
  styleUrls: ['./generate-payroll.component.scss']
})
export class GeneratePayrollComponent implements OnInit {
  payrollGenarte: FormGroup;
  constructor(private _fb: FormBuilder, private service: ApiserviceService) {


    this.payrollGenarte = this._fb.group({
      Item: this._fb.array([this.createItem('', '')])
    })
  }

  ngOnInit() {

    this.service.populatePayRoll().subscribe((res: any) => {


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
      Attendance: [22, [Validators.required]],
      TotalAmountDue: [value.NetPay ? value.NetPay : '', [Validators.required]],
      NetSalary: [value.NetPay ? value.NetPay : '', [Validators.required]],
      EmployeeID: [value.EmployeeID ? value.EmployeeID : '', [Validators.required]],
      Status: ['Paid', [Validators.required]],
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


  convert() {
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


  CreatePayslip() {
    //console.log(this.itemArray.value);
    let data = this.itemArray.value;
    this.service.createPayslip(data).subscribe((res) => {
      console.log(res);
    })
  }


}

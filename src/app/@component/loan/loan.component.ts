import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { ApiserviceService } from './../../@shared/apiservice.service';
import { Router } from '@angular/router';
import { APIENUM,UType } from 'src/app/@shared/enum';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})

export class LoanComponent implements OnInit {
  options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
  ];
  @ViewChild('basicModal', { static: true }) basicModal: ModalDirective;
  show: Boolean;
  constructor(
    private router: Router,
    private Api: ApiserviceService,
    private _fb: FormBuilder
  ) {}
  elements:any = [];
  Guarantor:any = [];
  Guarantors:any = [];
  value: string = '';
  name: string = ''
  error: string = '';
  success: string = ''
  Gname: string = ''
  AccountNo: string = ''
  Guarantordepartment: string = ''
  officeNo: string = ''
  Gradelevel: string = ''
  officeEmail: string = ''
  PersonalEmail: string = ''
  employee:FormGroup;
  location:any;
  role:any;
  department:any;
  employees:any;
  designation:any;
  salarygroup:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  loading: boolean = true;
  ngOnInit() {
      this.value =  sessionStorage.getItem('EmpID')
      let data = {EmployeeID:  sessionStorage.getItem('EmpID')}
      this.Api.ReadOne(APIENUM.EMP, data)
      .subscribe((res:any)=>{
        this.elements=res.records[0];
        this.name= this.elements.FirstName +' '+ this.elements.LastName
        this.AccountNo = this.elements.Acct1AccountNumber
        this.firstFormGroup = this._fb.group({
        EmployeeID:[this.elements.EmployeeID],
        DepartmentName:[this.elements.DepartmentName],
        DepartmentHead:[this.elements.DepartmentHead],
        LoanRequestAmount:['',Validators.required],
        DateOfResumption:[this.elements.JoiningDate],
        GuaranteedLoan:['',Validators.required],
        SalaryGroup:[this.elements.SalaryGroup],
        NetSalary:[this.elements.NetPay],
        Tenor:['',Validators.required],
        AccountNumber:[this.elements.Acct1AccountNumber],
        GuarantorID:['',Validators.required]
      })

    });
    this.Api.populateGuarantor(data, APIENUM.LON)
    .subscribe((res:any)=>{
      this.Guarantors=res.records;
    })


    this.Api.ReadOne(APIENUM.EMP, data)
    .subscribe((res:any)=>{
      this.Guarantor=res.records[0];
      this.Gname= this.Guarantor.FirstName +' '+ this.Guarantor.LastName
      this.Guarantordepartment = this.Guarantor.DepartmentName
      this.officeNo =  this.Guarantor.ContactNumber
      this.officeEmail =  this.Guarantor.Email
      this.secondFormGroup = this._fb.group({
        GuarantorOfficeNumber:[this.Guarantor.ContactNumber],
        GuarantorOfficeEmail:[this.Guarantor.Email],
        GuarantorDepartmentName:[this.Guarantor.DepartmentName],
        // GuarantorPersonalEmail:['',Validators.required],
        // GuarantorDetailsLoanGuaranted:['',Validators.required],
      });

    });


    this.loadEvent();
  }
  async loadEvent(){
    this.Api.Read(APIENUM.EMP).subscribe(( res:any)=>{
      this.employees=res.records;
      this.loading = false
    },err=>{
      this.error=err.error.message;


    },()=>{
      setTimeout(()=>{
        this.error='';
      },800)
    })

  }
  onFileChange(evt:any){
    const target: any = (evt.target);
  var strUser = target.options[target.selectedIndex].value;

  let data = {
    EmployeeID: strUser

}
  this.Api.ReadOne(APIENUM.EMP, data)
  .subscribe((res:any)=>{
    this.Guarantor=res.records[0];
    console.log(this.Guarantor)
    this.Gname= this.Guarantor.FirstName +' '+ this.Guarantor.LastName
    this.Guarantordepartment = this.Guarantor.DepartmentName
    this.officeNo =  this.Guarantor.ContactNumber
    this.officeEmail =  this.Guarantor.Email
    this.secondFormGroup = this._fb.group({
      GuarantorID:[this.Guarantor.EmployeeID],
      GuarantorOfficeNumber:[this.Guarantor.ContactNumber],
      GuarantorOfficeEmail:[this.Guarantor.Email],
      GuarantorDepartmentName:[this.Guarantor.DepartmentName],
      // GuarantorPersonalEmail:['',Validators.required],
      // GuarantorDetailsLoanGuaranted:['',Validators.required],
    });
  })
  }
  onSubmit() {
    this.Api.Create(APIENUM.LON, {...this.firstFormGroup.value, ...this.secondFormGroup.value})
    .subscribe((res:any)=>{
      this.success=res.message
      swal.fire({
        title: res.message,position: "center",
        icon: 'success',
        showConfirmButton: false,
        timer: 3500,
        showCloseButton: true 
       })
       this.router.navigate(['/main/loan-approval']);
    },err=>{
      this.error=err.error.message;
      swal.fire({
        title: err.error.message,position: "center",
        icon: 'error',
        showConfirmButton: false,
        timer: 3500,
        showCloseButton: true 
       })

    },()=>{
      setTimeout(()=>{
        this.success='';
        this.error='';
      },800)
    })
  }


}

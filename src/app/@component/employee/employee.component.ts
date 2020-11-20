import { forkJoin } from 'rxjs';
import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import swal from 'sweetalert2';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import * as XLSX from 'xlsx'; 

import { ToastService } from 'ng-uikit-pro-standard';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = []    
  headElements = ['ID', 'Firstname', 'Lastname', 'Email','Role', 'DepartmentName','LocationsName','DesignationName','Gender','SalaryGroupName','RoleName','MaritalStatus','Status',''];
  error: Boolean = false;
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  location:any;
  role:any;
  department:any;
  employees:any;
  designation:any;
  salarygroup: any;
  isDisabled:Boolean = true;
  maxVisibleItems: number = 8;
  pic: string="";
  show: Boolean; 
  size;
  displaySide: Boolean = false;
  constructor(
    private router: Router,
    private Api: ApiserviceService,
    private _fb:FormBuilder,
    private shared: SharedService
    ,private toastrService: ToastService
    ) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  @Input() title: string;
  employee:FormGroup;

  ngOnInit() {
    this.loadEvent();
    this.initload();
  }

  /*name of the excel-file which will be downloaded. */ 
fileName= 'ExcelSheet.xlsx';  

exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('tableSortExample'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
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
  view(){
    this.show = !this.show ;
  }
  newemployee(){
    this.router.navigate(['/main/create-employer'])
  }
  reademployee(el){

    if(this.show){
      this.displaySide = true;
    } else {
      this.router.navigate(['/main/read-employer'])
      this.shared.AddInfo(el)
      console.log(el)
    }
    this.pic =el.Avatar;   
    this.employee = this._fb.group({
      EmployeeID :[el.EmployeeID],
      FirstName :[el.FirstName, Validators.required],
      LastName:[el.LastName,Validators.required],
      Email:[el.Email,Validators.required],
      Gender:[el.Gender, Validators.required],
      DOB:[el.DOB,Validators.required],
      Department:[el.DepartmentName,Validators.required],
      Designation:[el.DesignationName, Validators.required],
      Location:[el.LocationsName,Validators.required],
      ReportsTO:[el.ReportsTO,Validators.required],
      Status:[el.Status,Validators.required],
      SalaryGroup:[el.SalaryGroupName,Validators.required],
      Role:[el.RoleName,Validators.required],
      ContactNumber:[el.ContactNumber,Validators.required],
      EmergencyContactNumber:[el.EmergencyContactNumber,Validators.required],
      EmergencyContactPerson:[el.EmergencyContactPerson,Validators.required],
      Address:[el.Address,Validators.required],
       });
       setTimeout(() => this.employee.disable(), 2000);
  }
  createemployee(){

    this.employee.disable();
    this.Api.Update(APIENUM.EMP, this.employee.value).subscribe((res:any)=>{
  
    
      swal.fire({
        title: res.message,position: "center",
        icon: 'success',
        showConfirmButton: false,
        timer: 3500,
        showCloseButton: true,
    
       })
      this.employee.reset();
      this.employee.enable();
      this.router.navigate(['/main/payroll'])
    
    },(err=>{
      this.employee.enable();
  
    
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: true,
        timer: 3500,
    
       })
       this.router.navigate(['/main/payroll'])
    }))
  
  }
  loadEvent(){

    let event = [this.Api.Read(APIENUM.LOC),this.Api.Read(APIENUM.DEPT),this.Api.Read(APIENUM.EMP),this.Api.Read(APIENUM.SAG),this.Api.Read(APIENUM.DES),this.Api.Read(APIENUM.ROLE)]
  
    forkJoin(event).subscribe((res:any)=>{
      console.log(res);
  
      this.location= res[0].records;
      this.department = res[1].records;
      this.employees=res[2].records;
       this.salarygroup=res[3].records;
       this.designation=res[4].records;
       this.role=res[5].records;
    })
  }

  removeEmp(id){
    swal.fire({
      title: 'Remove Employee?',
      text: `Are sure you want to remove ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove'
    }).then((result) => {
      if (result.value) {
     
  this.Api.Delete(APIENUM.EMP,id).subscribe((res:any)=>{
    this.toastrService.error(` ${res.message}  `,'',{ opacity: 9 })

   this.loadEvent();
    this.initload();
    
  },(err:any)=>{
    this.toastrService.error(` ${err.message}  `,'',{ opacity: 9 })
  })

 

      }
      
    })


    setTimeout(()=>{
      this.messages='';
    },500)
  }

  initload(){
    this.Api.Read(APIENUM.EMP)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
   
     
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
  
}

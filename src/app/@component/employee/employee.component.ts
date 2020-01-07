import { forkJoin } from 'rxjs';
import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import swal from 'sweetalert2';
import { SharedService } from 'src/app/@shared/shared/shared.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = []    
  headElements = ['ID', 'Firstname', 'Lastname', 'Email','Role', 'Deparment'];
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
  maxVisibleItems: number = 8;
  pic: string="";
  show: Boolean; 
  displaySide: Boolean = false;
  constructor(
    private router: Router,
    private Api: ApiserviceService,
    private _fb:FormBuilder,
    private shared: SharedService,
    ) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  @Input() title: string;
  employee:FormGroup;

  ngOnInit() {
    this.loadEvent();
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
    
    
    },(err=>{
      this.employee.enable();
  
    
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: true,
        timer: 3500,
    
       })
    
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
  
}

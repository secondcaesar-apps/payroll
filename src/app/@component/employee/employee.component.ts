import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import swal from 'sweetalert2';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = []    
  headElements = ['ID', 'Firstname', 'Lastname', 'Email', 'Deparment'];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  maxVisibleItems: number = 8;
  show: Boolean; 
  displaySide: Boolean = false;
  constructor(
    private router: Router,
    private Api: ApiserviceService,
    private _fb:FormBuilder,
    ) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  @Input() title: string;
  employee:FormGroup;

  ngOnInit() {
    this.Api.Read(APIENUM.EMP)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
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
    }
    this.employee = this._fb.group({
      EmployeeID :[el.EmployeeID],
      FirstName :[el.FirstName, Validators.required],
      LastName:[el.LastName,Validators.required],
      Email:[el.Email,Validators.required],
      Gender:[el.Gender, Validators.required],
      DOB:[el.DOB,Validators.required],
      Department:[el.Department,Validators.required],
      Designation:[el.Designation, Validators.required],
      Location:[el.Location,Validators.required],
      ReportsTo:[el.ReportsTO,Validators.required],
      ContactNumber:[el.ContactNumber,Validators.required],
      EmergencyContactNumber:[el.EmergencyContactNumber,Validators.required],
      EmergencyContactPerson:[el.EmergencyContactPerson,Validators.required],
      Address:[el.Address,Validators.required],
      // ReleasedDate:[''],
      // DOB:['',Validators.required],
      // Designation:['',Validators.required],
      // StaffRSAPin:['',Validators.required],
      // NextOfKinName:['',Validators.required],
      // NextOfKinAddress:['',Validators.required],
      // NextOfKinTelephoneNo:['',Validators.required],
    
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
}

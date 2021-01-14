import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-create-leave-tab',
  templateUrl: './create-leave-tab.component.html',
  styleUrls: ['./create-leave-tab.component.scss']
})
export class CreateLeaveTabComponent extends BaseComponent implements OnInit {
  Leave: FormGroup;
  submitted: boolean = false;
  loadings: boolean = false;
  errors: any;

  constructor(private _fb: FormBuilder,public api: ApiserviceService) {
    super(api);
  }

  ngOnInit() {


    this.read(APIENUM.LEAVETYPE)

    this.Leave = this._fb.group({
      LeaveType: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      Reason: ['', [Validators.required]],
    });
  }

  scrollTo(el: any): void {
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector(
      ".ng-invalid[formControlName]"
    );


    this.scrollTo(firstElementWithError);
  }

  get T() {
    return this.Leave.controls;
  }



  validate() {
    this.submitted = true;


    if (this.Leave.invalid) {
      this.scrollToError();
    } else {

      this.submitted = false;
      this.createLeave()


    }

  }

  createLeave(){

    this.loadings=true;

    this.Leave.disable();
    let value = {Status:"Pending",EmployeeID: sessionStorage.getItem('EmpID'),...this.Leave.value};
    this.api.Create(APIENUM.LEAVE,value).subscribe((res:any)=>{
      this.loadings=false;
      this.success=res.message;
      this.Leave.reset();
      this.Leave.enable();
      setTimeout(()=>{
        this.loadings=false;
         this.success='';
         this.errors='';

       },500);


   },err=>{
    this.loadings=false;
     this.errors=err.error.message;
     this.Leave.enable();
     setTimeout(()=>{
      this.loadings=false;
       this.success='';
       this.errors='';

     },500);


   },()=>{



   })

  }


}

import { ApprovalComponent } from './../approval/approval.component';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './../../@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { MdbTableDirective, ToastService } from 'ng-uikit-pro-standard';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  feedback: FormGroup;
  html = '<span class="btn btn-danger waves-light">Your HTML here</span>';
  WHOI = sessionStorage.getItem('EmpID').toString().trim().toUpperCase();
  elements = [];
  element = [];
  train =[]
  Train: Boolean = false;
  Totalemployee: Number = 0; 
  Totalasset: Number = 0; 
  constructor(
    private Api: ApiserviceService,
    private _fb: FormBuilder,
    private toast: ToastService
    ) { }

  ngOnInit() {
    this.feedback = this._fb.group({
      ApprovalComment: ['', [Validators.required]],

    });
    this.Api.Read(APIENUM.EMP)
    .subscribe((res:any)=>{
      this.elements=res.records;
     this.Totalemployee = this.elements.length
    })
    this.Api.Read(APIENUM.ASS)
    .subscribe((res:any)=>{
      this.element=res.records;
     this.Totalasset = this.element.length
    })
    let value = {EmployeeID:this.WHOI}
    this.Api.readbyEmployeeID(APIENUM.train, value)
    .subscribe((res:any)=>{
      this.train=res.records;
     this.Train = true
    })
    
    let values = {
      EmployeeID:this.WHOI

    }
    this.Api.employtrain(APIENUM.train, values)
    .subscribe((res:any)=>{
   
    })  
  }

  openDetails(el, val){
  let values = {
    EmployeeID:this.WHOI,
    TrainingID:el.TrainingID,
    Status:val,
    ApprovalComment: this.feedback.value.ApprovalComment

  }
  this.Api.employtrain(APIENUM.train, values)
  .subscribe((res:any)=>{
    this.toast.success(res.message); 
    this.toast.clear()
  }, (err: any) => {
    this.toast.error(err.error.message); 
  })
}

}

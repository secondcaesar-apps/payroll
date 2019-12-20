import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum'
@Component({
  selector: 'app-user-leave',
  templateUrl: './user-leave.component.html',
  styleUrls: ['./user-leave.component.scss']
})
export class UserLeaveComponent implements OnInit {
  Leave:FormGroup;
  lType:any;
  error:any;
  success:any;
  constructor(
    private _fb:FormBuilder,
    private service:ApiserviceService
  ) { }

  ngOnInit() {
    this.loadEvent()
    this.Leave= this._fb.group({
      LeaveType:['',[Validators.required]],
      StartDate:['',[Validators.required]],
      EndDate:['',[Validators.required]],
      Reason:['',[Validators.required]],
   //   EmployeeID:['',[Validators.required]],
      
     
    });
  }


  get LeaveTypeName(){
    return this.Leave.get('LeaveType');
  }
  get Reason(){
    return this.Leave.get('Reason');
  }


  createLeave(){

    this.Leave.disable();
    let value = {Status:"Pending",EmployeeID:"EMP1900001",...this.Leave.value};
    this.service.Create(APIENUM.LEAVE,value).subscribe((res:any)=>{
      this.success=res.message

   },err=>{
     this.error=err.error.message;
     this.Leave.enable();
   

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Leave.reset();
       this.Leave.enable();
     },500)

 
   })

  }
loadEvent(){
  let event = [];



  this.service.Read(APIENUM.LEAVETYPE).subscribe((res:any)=>{
    console.log(res);
    this.lType=res.records;

  });
}

}

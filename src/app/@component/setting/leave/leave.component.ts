import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
 Leave:FormGroup;
  error:any;
  success:any;
  optionsSelect: { value: string; label: string; }[];
  constructor(
    
    private _fb:FormBuilder,
    private Api:ApiserviceService

  ) { }

  ngOnInit() {

    this.optionsSelect = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      ];
    this.Leave= this._fb.group({
      LeaveTypeName:['',[Validators.required]],
      TotalDays:['',[Validators.required]],
      AllowedDesignations:['',[Validators.required]],
      Paid:['',[Validators.required]],
      Gender:['',[Validators.required]],
     
    });
  }

  get LeaveTypeName(){
    return this.Leave.get('LeaveTypeName');
  }
  get TotalDays(){
    return this.Leave.get('TotalDays');
  }

  get AllowedDesignations(){
    return this.Leave.get('AllowedDesignations');
  }

  get Paid(){
    return this.Leave.get('Paid');
  }

  
  get Gender(){
    return this.Leave.get('Gender');
  }
  createLeave(){

    this.Leave.disable();
    let value = {Status:"Active",...this.Leave.value};
    this.Api.Create(APIENUM.LEAVETYPE,value).subscribe((res:any)=>{
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


}

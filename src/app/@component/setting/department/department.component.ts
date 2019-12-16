import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

Dept:FormGroup;
error:any;
success:any;

  constructor(private _fb:FormBuilder,private Api:ApiserviceService) { }

  ngOnInit() {

    this.Dept= this._fb.group({
      DepartmentName:['',[Validators.required]]
    });

  }

  get DepartmentValue(){
    return this.Dept.get('DepartmentName');
  }

  createDepartment(){
   this.Dept.disable();
    let value = {Status:"Active",...this.Dept.value};

    this.Api.Create(APIENUM.DEPT,value).subscribe((res:any)=>{
       this.success=res.message

    },err=>{
      this.error=err.error.message;
      this.Dept.enable();

    },()=>{
      setTimeout(()=>{
        this.success='';
        this.error='';
        this.Dept.reset();
        this.Dept.enable();
      },500)
    })
  }

}

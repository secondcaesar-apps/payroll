import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  Role:FormGroup;
  error:any;
  success:any;
  constructor(
    private _fb:FormBuilder,
    private Api:ApiserviceService
  ) { }

  ngOnInit() {

    this.Role= this._fb.group({
      RoleName:['',[Validators.required]],
      Description:['',[Validators.required]]
    });
  }
  createRole(){
    this.Role.disable();
     let value = {Status:"Active",...this.Role.value};
 
     this.Api.Create(APIENUM.ROLE,value).subscribe((res:any)=>{
        this.success=res.message
 
     },err=>{
       this.error=err.error.message;
       this.Role.enable();
 
 
     },()=>{
       setTimeout(()=>{
         this.success='';
         this.error='';
         this.Role.reset();
         this.Role.enable();
       },500)
     })
   }

   get RoleName(){
    return this.Role.get('RoleName');
  }
  get Description(){
    return this.Role.get('Description');
  }


}

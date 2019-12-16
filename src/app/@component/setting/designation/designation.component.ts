import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  elements: any = [
    {name: 1, Address: 'Mark'},
    {name: 2, Address: 'Jacob'},
    {name: 3, Address: 'Larry'},
  ];

  headElements = ['Name', 'Address'];
  Designation:FormGroup;
  error:any;
  success:any;
  constructor(private _fb:FormBuilder,private Api:ApiserviceService) { }



  ngOnInit() {

    this.Designation= this._fb.group({
      DesignationName:['',[Validators.required]],
     
    });
  }

  createDesignation(){
    this.Designation.disable();
    let value = {Status:"Active",...this.Designation.value};
    this.Api.Create(APIENUM.DES,value).subscribe((res:any)=>{
      this.success=res.message

   },err=>{
     this.error=err.error.message;
     this.Designation.enable();
     this.error='';

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Designation.reset();
       this.Designation.enable();
     },500)
   })

  }

  get DesignationName(){
    return this.Designation.get('DesignationName');
  }

}

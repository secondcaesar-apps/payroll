import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  elements: any = [
    {name: 1, Address: 'Mark'},
    {name: 2, Address: 'Jacob'},
    {name: 3, Address: 'Larry'},
  ];

  headElements = ['Name', 'Address'];
  Location:FormGroup;
  error:any;
  success:any;
  
  constructor(private _fb:FormBuilder,private Api:ApiserviceService) { }


  ngOnInit() {
    this.Location= this._fb.group({
      LocationsName:['',[Validators.required]],
      Address:['',[Validators.required]],
     
    });
  }


  createLocation(){
    this.Location.disable();
    let value = {Status:"Active",...this.Location.value};
    this.Api.Create(APIENUM.LOC,value).subscribe((res:any)=>{
      this.success=res.message

   },err=>{
     this.error=err.error.message;
     this.Location.enable();
     this.error='';

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Location.reset();
       this.Location.enable();
     },500)
   })

  }

  get LocationsName(){
    return this.Location.get('LocationsName');
  }
  get Address(){
    return this.Location.get('Address');
  }

}

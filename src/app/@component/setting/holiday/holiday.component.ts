import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent extends BaseComponent implements OnInit {
  routePage ="../../edit";
  apis=APIENUM.HOL;
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "HolidayName",
      header: "HolidayName",

    },

    {
      primaryKey: "Description",
      header: "Description",

    },
    {
      primaryKey: "HolidayID",
      header: "HolidayID",
      routerParams:true

    },

    {
      primaryKey: "HolidayDate",
      header: "Holiday Date",
      date:true


    },
    {
      primaryKey: "HolidayYear",
      header: "Holiday Year",


    },






    {
      primaryKey: "Status",
      header: "Status",
    }



  ];
  Holiday: any;
  errors: any;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private Api: ApiserviceService
  ) {
    super(Api);
  }

  ngOnInit() {
    this.load();
  }
  load() {
    this.read(APIENUM.HOL);
    this.Holiday= this._fb.group({
      HolidayName:['',[Validators.required]],
      Description:['',[Validators.required]],
      HolidayDate:['',[Validators.required]],

    });
  }X

  create(){
    this.Holiday.disable();
    let value = {Status:"Active",...this.Holiday.value,HolidayYear:new Date(this.Holiday.value['HolidayDate']).getFullYear()};
    this.Api.Create(APIENUM.HOL,value).subscribe((res:any)=>{
      this.success=res.message;
      this.load();

   },err=>{
     this.errors=err.error.message;
     this.Holiday.enable();


   },()=>{
     setTimeout(()=>{
       this.success='';
       this.errors='';
       this.Holiday.reset();
       this.Holiday.enable();
     },500);

   })

  }
  get HolidayName(){
    return this.Holiday.get('HolidayName') as FormControl;
  }
  get Description(){
    return this.Holiday.get('Description')as FormControl;
  }
  get HolidayDate(){
    return this.Holiday.get('HolidayDate')as FormControl;
  }

}

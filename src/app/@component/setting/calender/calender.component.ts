import {  Component, OnInit,  ViewChild, HostListener  } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { BaseComponent } from '../../base/base.component';
import { ColumnSetting } from 'src/app/models/layout.model';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent extends BaseComponent implements OnInit  {
  messages: string;
  previous: string;
  message: Boolean=false;

  elements: any = [];
  Cal:FormGroup;
  error:any;
  success:any;
  public myDatePickerOptions: IMyOptions = {
    // Your options
  };
  routePage = "../../edit";
  apis = APIENUM.EVENT;
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "Color",
      header: "Color",

    },

    {
      primaryKey: "EventID",
      header: "Event ID",
      routerParams: true

    },
    {
      primaryKey: "EndDate",
      header: "EndDate",


    },
    {
      primaryKey: "StartDate",
      header: "StartDate",


    },
    {
      primaryKey: "EventTitle",
      header: "Event Title",


    },




    {
      primaryKey: "Status",
      header: "Status",
    }



  ];
  constructor(   private _fb:FormBuilder,private Api:ApiserviceService) {
    super(Api)
  }

  ngOnInit() {
    this.loadevent();
  }
  loadevent(){
    this.read(APIENUM.EVENT);

    this.Cal= this._fb.group({
      EventTitle:['',[Validators.required]],

      StartDate:['',[Validators.required]],
      EndDate:['',[Validators.required]],

    });
  }

  get EventTitle(){
    return this.Cal.get('EventTitle') as FormControl;
  }

  get Color(){
    return this.Cal.get('Color') as FormControl;
  }

  get StartDate(){
    return this.Cal.get('StartDate') as FormControl;
  }
  get EndDate(){
    return this.Cal.get('EndDate')as FormControl;
  }


  createEvent(){

    var colors= ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
'silver', 'teal', 'white', 'yellow'];

this.getRandom(colors);

console.log(startOfDay(this.Cal.value.StartDate));
    this.Cal.disable();
     let value = {Status:"Active",StartDate:this.Cal.value.StartDate,EndDate:this.Cal.value.EndDate, Color:'red',EventTitle:this.Cal.value.EventTitle,};

     this.Api.Create(APIENUM.EVENT,value).subscribe((res:any)=>{
        this.success=res.message;
        this.loadevent();

     },err=>{
       this.error=err.error.message;
       this.Cal.enable();


     },()=>{
       setTimeout(()=>{
         this.success='';
         this.error='';
         this.Cal.reset();
         this.Cal.enable();
       },500)
     })
   }


 _getRandom = function (cut) {
    var i = Math.floor(Math.random() * this.length);
    if (cut && i in this) {
      return this.splice(i, 1)[0];
    }
    return this[i];
  };
  public get getRandom() {
    return this._getRandom;
  }
  public set getRandom(value) {
    this._getRandom = value;
  }

}
// Color: "yellow"
// DateCreated: "2020-03-22 23:37:42"
// EndDate: "1968-07-23 00:00:00"
// EventID: "EV1900001"
// EventTitle: "Segun Akintemi Birthday"
// ID: "1"
// PostedUser: "Admin"
// StartDate: "1968-07-23 00:00:00"
// Status: "Active"

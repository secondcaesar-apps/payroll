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
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  messages: string;
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  elements: any = [];
  Cal:FormGroup;
  error:any;
  success:any;
  public myDatePickerOptions: IMyOptions = {
    // Your options
  };
  constructor(   private _fb:FormBuilder,private Api:ApiserviceService) { }

  ngOnInit() {
    this.loadevent();
  }
  loadevent(){
    this.Api.Read(APIENUM.EVENT)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
    }, (err: any) => {
      this.loading = false;
      this.messages = err.error.message;
      this.message = true;
    })
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { BaseComponent } from '../../base/base.component';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/@shared/shared/shared.service';
@Component({
  selector: 'app-create-leave-tab',
  templateUrl: './create-leave-tab.component.html',
  styleUrls: ['./create-leave-tab.component.scss']
})
export class CreateLeaveTabComponent extends BaseComponent implements OnInit {
  Leave: FormGroup;
  submitted: boolean = false;
  loadings: boolean = false;
  errors: any;
  availabledays: Object;
  leavetypedate:any=0;
  bdays:any;
  presentdate= new Date().toISOString().toString().split('T')[0];
  holiday_array: any=[];

  constructor(private _fb: FormBuilder,public api: ApiserviceService,public router:Router,private shared: SharedService,) {
    super(api);

  }

  ngOnInit() {



   // this.read(APIENUM.LEAVETYPE)
    this.read(APIENUM.USERLEAVETYPE)
    this.Leave = this._fb.group({
      LeaveType: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      Reason: ['', [Validators.required]],
    });
    this.onChanges();
  }

  scrollTo(el: any): void {
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector(
      ".ng-invalid[formControlName]"
    );


    this.scrollTo(firstElementWithError);
  }

  get T() {
    return this.Leave.controls;
  }



  validate() {
    this.submitted = true;


    if (this.Leave.invalid) {
      this.scrollToError();
    } else {

      this.submitted = false;

      this.api.Special(APIENUM.LEAVEAVAILABLE,{Date:this.Leave.value.StartDate}).subscribe((res)=>{

    this.availabledays=res;

 this.bdays=this.calcBusinessDays(this.Leave.value.StartDate,this.Leave.value.EndDate);
 //this.onTabChange()
 swal.fire({
  title: 'Leave Calculator',

  html:
    `Total Leave Day Available:<strong>${ Number(this.availabledays) * -1}</strong> <br/>` +
    `Total Leave Day Requested:<strong>${this.bdays}</strong> <br/>`  ,

    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Request Leave'
}).then((res:any)=>{

  if (res.isConfirmed==true){


    this.createLeave();

  }else{

    return false;
  }
})

  })

    //


    }

  }

  createLeave(){

    this.loadings=true;

    this.Leave.disable();
    let value = {Status:"Pending",EmployeeID: sessionStorage.getItem('EmpID'),...this.Leave.value};
    this.api.Create(APIENUM.LEAVE,value).subscribe((res:any)=>{
      this.loadings=false;
      this.success=res.message;
      this.shared.AddInfo('true');
      this.Leave.reset();
      this.Leave.enable();
      setTimeout(()=>{
        this.loadings=false;
         this.success='';
         this.errors='';

       },500);


   },err=>{
    this.loadings=false;
     this.errors=err.error.message;
     this.Leave.enable();
     setTimeout(()=>{
      this.loadings=false;
       this.success='';
       this.errors='';

     },500);


   },()=>{



   })

  }

  onChanges(): void {
    this.availabledays=null;
    this.Leave.valueChanges.subscribe(val => {

      if(val){


        if(val.StartDate!=""){

          this.checkWeekends(val.StartDate,"StartDate")

         }
         if(val.EndDate!=""){
          this.checkWeekends(val.EndDate,"EndDate")

         }

        // if(this.checkSevendays(val)){


        // }else{
        //   swal.fire('Leave can\'t be fixed for next seven days')
        // }

      }else{

      }

    });
  }


  checkSevendays(value,p){
    var today = new Date();
    var nextWeek =Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toDateString()) ;

    //If nextWeek is smaller (earlier) than the value of the input date, alert...
    if (nextWeek <  Date.parse(new Date(value).toDateString())){

      return false;
    }else{
      this.Leave.patchValue({
        [p]:""
      });


        return true;

    }

  }


checkWeekends(value,paramter){
  if(value){

    var day = new Date(value).getUTCDay();
    if([6,0].includes(day)){


      this.availabledays=null;
      this.Leave.patchValue({
        [paramter]:""
      });




      swal.fire('Weekends not allowed')

}

else if(this.checkSevendays(value,paramter)){
  swal.fire('Give seven days notice');
}

else{


  this.api.Read(APIENUM.HOL).subscribe((res:any)=>{
res.records.forEach(element => {

if(element.HolidayDate.toString()==value.toString()){

  if(paramter=='StartDate'){
    this.holiday_array.push(element.HolidayDate)
  }

this.availabledays=null;
this.Leave.patchValue({
  [paramter]:""
});
swal.fire('Public Holiday not allowed')

return false;
}

});

  });



  // this.api.Special(APIENUM.LEAVEAVAILABLE,{Date:val.StartDate}).subscribe((res)=>{
  //
  //   this.availabledays=res;


  // })

}
  }else{

  }


}


calcBusinessDays(start, end) {
  // This makes no effort to account for holidays
  // Counts end day, does not count start day

  // make copies we can normalize without changing passed in objects
  var starts = new Date(start);
  var ends = new Date(end);

  // initial total
  var totalBusinessDays = 0;

  // normalize both start and end to beginning of the day
  starts.setHours(0,0,0,0);
  ends.setHours(0,0,0,0);

  // Prepare loop's variables
  var current = new Date(starts);
  current.setDate(current.getDate() + 1);
  var day;
  var holidayFound=false;

  // loop through each day, checking
  while (current <= ends) {


      // Check if current is in the holiday array
      var MySQLdate = this.dateToMySQL(current);


      if( this.holiday_array.includes(MySQLdate)){

          holidayFound=true;     // "flag"
      }

      // If current is monday to friday and NOT a holiday
      day = current.getDay();
      if (day >= 1 && day <= 5 && !holidayFound) {
          ++totalBusinessDays;
      }

      // For next iteration
      current.setDate(current.getDate() + 1);
      holidayFound=false;
  }
  return totalBusinessDays ;
}
dateToMySQL (x){
  var MySQL_day = x.getDate();
  if(MySQL_day<10){
      MySQL_day = "0"+MySQL_day;      // Leading zero on day...
  }
  var MySQL_month = x.getMonth()+1;   // Months are zero-based.
  if(MySQL_month<10){
      MySQL_month = "0"+MySQL_month;  // Leading zero on month...
  }
  var MySQL_year = x.getYear()+1900;  // Years are 1900 based.
  var MySQL_date = MySQL_year+"-"+MySQL_month+"-"+MySQL_day;
  return MySQL_date;
}

ChangingValue(event){


 this.baseItems.find(o => {

  if(o.LeaveTypeID==event.target.value.split(":")[1]){


    this.leavetypedate=o.TotalDays;
  }

 });


}
onTabChange() {
  //loan-flow
  this.router.navigateByUrl('main/loan-flow');
 // this.router.navigateByUrl('main/user-leave');
}

}

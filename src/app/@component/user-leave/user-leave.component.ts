import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum'
import { MdbTableDirective } from 'ng-uikit-pro-standard';
@Component({
  selector: 'app-user-leave',
  templateUrl: './user-leave.component.html',
  styleUrls: ['./user-leave.component.scss']
})
export class UserLeaveComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = []    
  headElements = ['LeaveID', 'Email', 'Status', 'DateCreated',];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  maxVisibleItems: number = 8;
  show: Boolean; 
  displaySide: Boolean = false;
  Leave:FormGroup;
  lType:any;
  error:any;
  leave:any=null;
  leaveHistory:any;
  @Input() title: string;
  success:any;
  constructor(
    private _fb:FormBuilder,
    private service:ApiserviceService
  ) { }

  ngOnInit() {
    this.loadEvent();
    this.getAllLeave();
    this.readLeave();
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
  view(){
    this.show = !this.show ;
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
     },900)

 
   })

  }
loadEvent(){
  let event = [];



  this.service.Read(APIENUM.LEAVETYPE).subscribe((res:any)=>{

    this.lType=res.records;

  },err=>{
    this.error=err.error.message;
    this.Leave.enable();
  

  },()=>{
    setTimeout(()=>{
      this.success='';
      this.error='';
      this.Leave.reset();
      this.Leave.enable();
    },900)


  });
}

getAllLeave(){

  //login user
  let value = {EmployeeID : "EMP1900002"
   
}
  this.service.Create(APIENUM.REPORT,value).subscribe((res:any)=>{
  
    this.loading = false;
    this.elements=res.records;
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  })
}

searchItems() {
  const prev = this.mdbTable.getDataSource();

  if (!this.searchText) {
    this.mdbTable.setDataSource(this.previous);
    this.elements = this.mdbTable.getDataSource();
  }

  if (this.searchText) {
    this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
    this.mdbTable.setDataSource(prev);
  }
}

reademployee(el){
 this.leave=el;
 this.displaySide=true;
 
}
 updateSalary(){
   let value={LeaveID:this.leave.LeaveID};
   this.service.Approve(APIENUM.LEAVEAPPROVE,value).subscribe((res:any)=>{

    this.success=res.message;

   },err=>{
    this.error=err.error.message;
    this.Leave.enable();
  

  },()=>{
    setTimeout(()=>{
      this.success='';
      this.error='';
      this.Leave.reset();
      this.Leave.enable();
    },900)


  })


  this.loadEvent();

 }

 readLeave(){
   this.service.Read(APIENUM.LEAVE).subscribe((res:any)=>{
     console.log(res);
   })
 }


}



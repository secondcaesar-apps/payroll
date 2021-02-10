import { Component, OnInit,  ViewChild, HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent extends BaseComponent implements OnInit {

  routePage ="../../edit";
  apis=APIENUM.LEAVETYPE
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "AllowedDesignations",
      header: "AllowedDesignations",

    },

    {
      primaryKey: "Gender",
      header: "Gender",

    },
    {
      primaryKey: "LeaveTypeID",
      header: "LeaveTypeID",
      routerParams:true

    },

    {
      primaryKey: "LeaveTypeName",
      header: "LeaveTypeName",


    },
    {
      primaryKey: "PostedUser",
      header: "PostedUser",


    },


    {

      primaryKey:"DateCreated",
      header:"Date",
      date:true

    },
    {

      primaryKey:"Paid",
      header:"Paid",


    },


    {

      primaryKey:"PaiTotalDaysd",
      header:"Total Days",


    },
    {
      primaryKey: "Status",
      header: "Status",
    }



  ];



 Leave:FormGroup;
 loading2:boolean=false;
  error:any;
  success:any;
  elements = [];
  searchText: string = '';
  previous: string;
  message: Boolean=false;

  messages: string;
  maxVisibleItems: number = 8;
  optionsSelect=[];
  degisnator: any;
  constructor(

    private _fb:FormBuilder,
    private Api:ApiserviceService

  ) {
    super(Api);
  }

  ngOnInit() {
    this.reload();
   this.load();
  }
  load(){
    this.optionsSelect = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Female,Male', label: 'Female,Male' },
      ];
    this.Leave= this._fb.group({
      LeaveTypeName:['',[Validators.required]],
      TotalDays:['',[Validators.required]],
      AllowedDesignations:['',[Validators.required]],
      Paid:['',[Validators.required]],
      Gender:['',[Validators.required]],

    });
    this.read(APIENUM.LEAVETYPE);

  }

  get LeaveTypeName(){
    return this.Leave.get('LeaveTypeName')as FormControl;
  }
  get TotalDays(){
    return this.Leave.get('TotalDays')as FormControl;
  }

  get AllowedDesignations(){
    return this.Leave.get('AllowedDesignations')as FormControl;
  }

  get Paid(){
    return this.Leave.get('Paid')as FormControl;
  }


  get Gender(){
    return this.Leave.get('Gender')as FormControl;
  }
  createLeave(){
    this.loading2=true;

    this.Leave.disable();
    let value = {Status:"Active",...this.Leave.value};
    this.Api.Create(APIENUM.LEAVETYPE,value).subscribe((res:any)=>{
      this.loading2=false;
      this.success=res.message;
      this.load();

   },err=>{
    this.loading2=false;
     this.error=err.error.message;
     this.Leave.enable();


   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Leave.reset();
       this.Leave.enable();
     },500);
     this.load();


   })

  }


  reload(){
    this.Api.Read(APIENUM.DES)
    .subscribe((res:any)=>{
      this.loading = false;
      this.degisnator=res.records;

    },(err:any)=>{
      this.loading= false;
      this.messages = err.error.message;

    })
  }


}


// AllowedDesignations: "DSG1900002,DSG1900001"
// DateCreated: "2021-01-14 00:51:19"
// Gender: "Female,Male"
// ID: "1"
// LeaveTypeID: "LVT1900001"
// LeaveTypeName: "Sick"
// Paid: "YES"
// PostedUser: "IT UNIT TEST ACCOUNT"
// Status: "Active"
// TotalDays: "7"

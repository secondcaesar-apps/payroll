import { Component, OnInit,  ViewChild, HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
 Leave:FormGroup;
 loading2:boolean=false;
  error:any;
  success:any;
  elements = [];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  maxVisibleItems: number = 8;
  optionsSelect=[];
  degisnator: any;
  constructor(

    private _fb:FormBuilder,
    private Api:ApiserviceService

  ) { }

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
    this.Api.Read(APIENUM.LEAVETYPE)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
    }, (err: any) => {
      this.loading = false;
      this.messages = err.error.message;
      this.message = true;
    })
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

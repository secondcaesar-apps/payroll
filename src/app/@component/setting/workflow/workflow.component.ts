import { Component, OnInit,  ViewChild, HostListener  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  WorkFlow:FormGroup;
  error:any;
  success:any;
  emp:any;
  constructor(
    private _fb:FormBuilder,
    private Api:ApiserviceService
  ) { }

  ngOnInit() {
    this.Api.Read(APIENUM.WORKFLOWSETUP)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, (err: any) => {
      this.loading = false;
      this.messages = err.error.message;
      this.message = true;
    })
    this.Api.Read(APIENUM.EMP)
    .pipe(
      map((res:any)=>res.records)
    )
    .subscribe((res:any)=>{
      console.log(res);
      this.emp=res;
    });

    this.WorkFlow= this._fb.group({
      PWFName:['',[Validators.required]],
      EmployeeID:['',[Validators.required]],
      level:['',[Validators.required]],
    
    });
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
  get PWFName(){
    return this.WorkFlow.get('PWFName');
  }

  
  get EmployeeID(){
    return this.WorkFlow.get('EmployeeID');
  }
///testinng
  
  get level(){
    return this.WorkFlow.get('level');
  }

  createWorkflow(){
    this.WorkFlow.disable();
    let value = {Status:"Active",...this.WorkFlow.value};
    this.Api.Create(APIENUM.WORKFLOWSETUP,value).subscribe((res:any)=>{
      this.success=res.message

   },err=>{
     this.error=err.error.message;
     this.WorkFlow.enable();
   

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.WorkFlow.reset();
       this.WorkFlow.enable();
     },500)

 
   })

  }

}

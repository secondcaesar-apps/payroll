import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum'
import { MdbTableDirective, ToastService } from 'ng-uikit-pro-standard';
import swal from 'sweetalert2';


@Component({
  selector: 'app-training-approval',
  templateUrl: './training-approval.component.html',
  styleUrls: ['./training-approval.component.scss']
})
export class TrainingApprovalComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = []    
  headElements = ['Training Name', 'Description','Start Date', 'End Date','Employees', 'Status'];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  maxVisibleItems: number = 8;
  show: Boolean; 
  displaySide: Boolean = false;
  Training:FormGroup;
  approve:FormGroup;
  error:any;
  training:any=null;
  trainingstaffs:any=[];
  statusValue: string = '';
  trainingHistory:any;
  @Input() title: string;
  success:any;
  constructor(
    private _fb:FormBuilder,
    private service:ApiserviceService,
    private toastrService: ToastService
  ) { }

  ngOnInit() {
    this.loadEvent();
    // this.getAlltraining();
    // this.readtraining();
    this.training= this._fb.group({
      trainingType:['',[Validators.required]],
      StartDate:['',[Validators.required]],
      EndDate:['',[Validators.required]],
      Descriprtion:['',[Validators.required]],
    });
    this.approve= this._fb.group({
      comment:[' ',[Validators.required]]
    });
  }


  get trainingTypeName(){
    return this.training.get('trainingType');
  }
  get Reason(){
    return this.training.get('Reason');
  }
  view(){
    this.show = !this.show ;
  }

  // createtraining(){

  //   this.training.disable();
  //   let value = {Status:"Pending",EmployeeID: sessionStorage.getItem('EmpID'),...this.training.value};
  //   this.service.Create(APIENUM.training,value).subscribe((res:any)=>{
  //     this.success=res.message

  //  },err=>{
  //    this.error=err.error.message;
  //    this.training.enable();
   

  //  },()=>{
  //    setTimeout(()=>{
  //      this.success='';
  //      this.error='';
  //      this.training.reset();
  //      this.training.enable();
  //    },900)

 
  //  })

  // }
loadEvent(){
    let value = {EmployeeID :  sessionStorage.getItem('EmpID')
   
}
this.service.Read(APIENUM.trainpending).subscribe((res:any)=>{
        this.loading = false;
        this.error = false;
        this.elements = res.records;
        console.log(this.elements);
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
  },err=>{
    this.error=err.error.message;
    this.training.enable();
          this.loading = false;
        this.error = true;
        this.messages = err.error.message;
        this.message = true;
        this.elements = [];

  },()=>{
    setTimeout(()=>{
      this.success='';
      this.error='';
      this.training.reset();
      this.training.enable();
    },900)


  });
}

// getAlltraining(){

//   //login user
//   let value = {EmployeeID :  sessionStorage.getItem('EmpID')
   
// }
//     this.service.Create(APIENUM.REPORT,value).subscribe((res:any)=>{
//     this.loading = false;
//     this.elements=res.records;
//     this.mdbTable.setDataSource(this.elements);
//     this.elements = this.mdbTable.getDataSource();
//     this.previous = this.mdbTable.getDataSource();

//     console.log(this.elements);
//   })
// }

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
  this.displaySide=true;
 this.training=el;
 this.trainingstaffs=el.Employees.split(',')
 console
 
}
 updateSalary(el){
    let value = {
      TrainingID:this.training.TrainingID,
      Status: el,
      ApprovalComment : this.approve.value.comment,
    }
   this.service.approvetrain(APIENUM.TRAINAPPROVE,value).subscribe((res:any)=>{

    this.success=res.message;
    swal.fire({
      title: res.message,position: "center",
      icon: 'success',
      showConfirmButton: false,
      timer: 3500,
      showCloseButton: true,
  
     })

   },err=>{
    this.error=err.error.message;
    swal.fire({
      position: 'center',
      icon: 'error',
      title: err.error.message,
      showConfirmButton: true,
      timer: 3500,
  
     })

  })


//   this.loadEvent();

//  }

//  readtraining(){
//    this.service.Read(APIENUM.training).subscribe((res:any)=>{
//      console.log(res);
//     //  this.elements=res.records;
//     //  this.mdbTable.setDataSource(this.elements);
//     //  this.elements = this.mdbTable.getDataSource();
//     //  this.previous = this.mdbTable.getDataSource();
 
//    })
//  }


}
}


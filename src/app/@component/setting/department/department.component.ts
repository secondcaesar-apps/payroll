import { ApiserviceService } from './../../../@shared/apiservice.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseComponent } from '../../base/base.component';
import { ColumnSetting } from 'src/app/models/layout.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent extends BaseComponent implements OnInit {
  routePage ="../../edit";
  apis=APIENUM.DEPT
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "DepartmentName",
      header: "Department Name",

    },

    {
      primaryKey: "DepartmentHead",
      header: "Department Head",

    },
    {
      primaryKey: "DepartmentID",
      header: "Department ID",
      routerParams:true

    },

    {
      primaryKey: "DepartmentName",
      header: "DepartmentName",


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
      primaryKey: "Status",
      header: "Status",
    }



  ];
  Dept: FormGroup;
  emp: any;
  constructor(public api: ApiserviceService, public fb:FormBuilder){
    super(api);
  }

  ngOnInit() {
this.load();
this.api.Read(APIENUM.EMP)
.pipe(
  map((res: any) => res.records)
)
.subscribe((res: any) => {

  this.emp = res;
});
  }
  load(){
 //   let value = {EmployeeID :  sessionStorage.getItem('EmpID')}
  this.read(APIENUM.DEPT);
  this.Dept= this.fb.group({
    DepartmentName:['',[Validators.required]],
    DepartmentHead:['',[Validators.required]]
  });
  }

   get DepartmentValue(){
    return this.Dept.get('DepartmentName') as FormControl;
  }
  get DepartmentHead(){
    return this.Dept.get('DepartmentHead') as FormControl;
  }
  createDepartment(){
   this.Dept.disable();
    let value = {Status:"Active",...this.Dept.value};


    this.api.Create(APIENUM.DEPT,value).subscribe((res:any)=>{
       this.success=res.message;
       this.load();

    },err=>{
      this.error=err.error.message;
      this.Dept.enable();


    },()=>{
      setTimeout(()=>{
        this.success='';
        this.error='';
        this.Dept.reset();
        this.Dept.enable();
      },500);
      this.load();
    })
  }






// implements OnInit {
//   @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
//   @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
//   @ViewChild('row', { static: true }) row: ElementRef;

//   searchText: string = '';
//   previous: string;
//   message: Boolean=false;
//   loading:Boolean=true;
//   messages: string;
//   elements: any = [];
//   Dept:FormGroup;
//   error:any;
//   success:any;
//   constructor(
//     private _fb:FormBuilder,
//     private Api:ApiserviceService
//   ) { }

//   @HostListener('input') oninput() {
//     this.mdbTablePagination.searchText = this.searchText;
//   }

//   ngOnInit() {
//     this.load();
//   }

//   load(){
//     this.Api.Read(APIENUM.DEPT)
//     .subscribe((res:any)=>{
//       this.loading = false;
//       this.elements=res.records;
//       this.mdbTable.setDataSource(this.elements);
//       this.elements = this.mdbTable.getDataSource();
//       this.previous = this.mdbTable.getDataSource();
//     },(err:any)=>{
//       this.loading= false;
//       this.messages = err.error.message;
//       this.message = true;
//     })
//       this.Dept= this._fb.group({
//     DepartmentName:['',[Validators.required]]
//   });
//   }
//   get DepartmentValue(){
//     return this.Dept.get('DepartmentName') as FormControl;
//   }
//   createDepartment(){
//    this.Dept.disable();
//     let value = {Status:"Active",...this.Dept.value};

//     this.Api.Create(APIENUM.DEPT,value).subscribe((res:any)=>{
//        this.success=res.message;
//        this.load();

//     },err=>{
//       this.error=err.error.message;
//       this.Dept.enable();


//     },()=>{
//       setTimeout(()=>{
//         this.success='';
//         this.error='';
//         this.Dept.reset();
//         this.Dept.enable();
//       },500);
//       this.load();
//     })
//   }
//   searchItems() {
//     const prev = this.mdbTable.getDataSource();

//     if (!this.searchText) {
//       this.mdbTable.setDataSource(this.previous);
//       this.elements = this.mdbTable.getDataSource();
//     }

//     if (this.searchText) {
//       this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
//       this.mdbTable.setDataSource(prev);
//     }


//   }

// }





}

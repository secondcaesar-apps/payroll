import { ApiserviceService } from './../../../@shared/apiservice.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  elements: any = [];
  Dept:FormGroup;
  error:any;
  success:any;
  constructor(
    private _fb:FormBuilder,
    private Api:ApiserviceService
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.load();
  }

  load(){
    this.Api.Read(APIENUM.DEPT)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    },(err:any)=>{
      this.loading= false;
      this.messages = err.error.message;
      this.message = true;
    })
      this.Dept= this._fb.group({
    DepartmentName:['',[Validators.required]]
  });
  }
  get DepartmentValue(){
    return this.Dept.get('DepartmentName') as FormControl;
  }
  createDepartment(){
   this.Dept.disable();
    let value = {Status:"Active",...this.Dept.value};

    this.Api.Create(APIENUM.DEPT,value).subscribe((res:any)=>{
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

}

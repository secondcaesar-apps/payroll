import { ApiserviceService } from './../../../@shared/apiservice.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  headElements = ["ID",'Name'];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  elements: any = [];
  Designation:FormGroup;
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
    this.Api.Read(APIENUM.DES)
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
        this.Designation= this._fb.group({
      DesignationName:['',[Validators.required]],
     
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
  createDesignation(){
    this.Designation.disable();
    let value = {Status:"Active",...this.Designation.value};
    this.Api.Create(APIENUM.DES,value).subscribe((res:any)=>{
      this.success=res.message

   },err=>{
     this.error=err.error.message;
     this.Designation.enable();
   

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Designation.reset();
       this.Designation.enable();
     },500)
   })

  }

  get DesignationName(){
    return this.Designation.get('DesignationName');
  }

}

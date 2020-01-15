import { ApiserviceService } from './../../../@shared/apiservice.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})

export class ExpenseComponent implements OnInit {
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
    Category:FormGroup;
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

      this.Api.Read(APIENUM.CAT)
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
        this.Category= this._fb.group({
    CategoryName:['',[Validators.required]],
    CategoryDescription:['',[Validators.required]],
   
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

  createCategory(){
    this.Category.disable();
    let value = {Status:"Active",...this.Category.value};
    this.Api.Create(APIENUM.CAT,value).subscribe((res:any)=>{
      this.success=res.message;
      this.load();

   },err=>{
     this.error=err.error.message;
     this.Category.enable();
   

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Category.reset();
       this.Category.enable();
     },500);
     this.load();
   })

  }

  get CategoryName(){
    return this.Category.get('CategoryName');
  }
  get CategoryDescription(){
    return this.Category.get('CategoryDescription');
  }
}
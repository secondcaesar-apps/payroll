import { ApiserviceService } from './../../../@shared/apiservice.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})

export class ExpenseComponent extends BaseComponent implements OnInit {
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
    @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
    @ViewChild('row', { static: true }) row: ElementRef;
    headElements = ["ID",'Name'];
    searchText: string = '';
    previous: string;
    message: Boolean=false;

    messages: string;
    elements: any = [];
    Category:FormGroup;
    error:any;
    success:any;

    routePage = "../../edit";
  apis = APIENUM.CAT;
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "CategoryDescription",
      header: "CategoryDescription",

    },

    {
      primaryKey: "CategoryID",
      header: "CategoryID",
      routerParams:true

    },
    {
      primaryKey: "CategoryName",
      header: "CategoryName",
      // routerParams:true

    },




    {

      primaryKey: "DateCreated",
      header: "Date",
      date: true

    },



    {
      primaryKey: "Status",
      header: "Status",
    }



  ];

    constructor(
      private _fb:FormBuilder,
      private Api:ApiserviceService
    ) {
      super(Api);
     }



    ngOnInit() {
      this.load();
    }

    load(){

      this.read(APIENUM.CAT);

        this.Category= this._fb.group({
    CategoryName:['',[Validators.required]],
    CategoryDescription:['',[Validators.required]],

  });

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
    return this.Category.get('CategoryName') as FormControl;
  }
  get CategoryDescription(){
    return this.Category.get('CategoryDescription')as FormControl;
  }
}



// CategoryDescription: "das"
// CategoryID: "CAT1900001"
// CategoryName: "Dddf"
// DateCreated: "2021-02-02 11:46:33"
// ID: "1"
// PostedUser: "IT UNIT TEST ACCOUNT"
// Status: "Active"

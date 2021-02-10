import { ApiserviceService } from './../../../@shared/apiservice.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { APIENUM } from 'src/app/@shared/enum';
import { BaseComponent } from '../../base/base.component';
import { ColumnSetting } from 'src/app/models/layout.model';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent extends BaseComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  headElements = ["ID",'Name'];
  searchText: string = '';
  previous: string;
  message: Boolean=false;

  messages: string;
  elements: any = [];
  Designation:FormGroup;
  error:any;
  success:any;
  routePage = "../../edit";
  apis = APIENUM.DES;
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "DesignationName",
      header: "DesignationName",

    },

    {
      primaryKey: "DesignationID",
      header: "DesignationID",
      routerParams: true

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
    this.reload()
        this.Designation= this._fb.group({
      DesignationName:['',[Validators.required]],

    });
  }


  createDesignation(){
    this.Designation.disable();
    let value = {Status:"Active",...this.Designation.value};
    this.Api.Create(APIENUM.DES,value).subscribe((res:any)=>{
      this.success=res.message;
      this.reload();

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
   this.reload();
  }

  get DesignationName(){
    return this.Designation.get('DesignationName')as FormControl;
  }

  reload(){
    this.read(APIENUM.DES)

  }

}

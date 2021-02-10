import { ApiserviceService } from './../../../@shared/apiservice.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends BaseComponent implements OnInit {
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
    @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
    @ViewChild('row', { static: true }) row: ElementRef;
    headElements = ['Name',"Address"];
    searchText: string = '';
    previous: string;
    message: Boolean=false;
    messages: string;
    elements: any = [];
    Location:FormGroup;
    error:any;
    success:any;
    routePage = "../../edit";
  apis = APIENUM.LOC;
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "Address",
      header: "Address",

    },

    {
      primaryKey: "LocationsID",
      header: "LocationsID",
      routerParams: true

    },
    {
      primaryKey: "LocationsName",
      header: "LocationsName",
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
      this.read(APIENUM.LOC)

          this.Location= this._fb.group({
      LocationsName:['',[Validators.required]],
      Address:['',[Validators.required]],

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


  createLocation(){
    this.Location.disable();
    let value = {Status:"Active",...this.Location.value};
    this.Api.Create(APIENUM.LOC,value).subscribe((res:any)=>{
      this.success=res.message;
      this.load();

   },err=>{
     this.error=err.error.message;
     this.Location.enable();


   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Location.reset();
       this.Location.enable();
     },500);

   })

  }

  get LocationsName(){
    return this.Location.get('LocationsName')as FormControl;
  }
  get Address(){
    return this.Location.get('Address') as FormControl;
  }
}

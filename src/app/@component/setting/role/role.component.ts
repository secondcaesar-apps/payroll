import { Component, OnInit,  ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends BaseComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];
  searchText: string = '';
  previous: string;
  message: Boolean=false;

  messages: string;
  maxVisibleItems: number = 8;
  Role:FormGroup;
  error:any;
  success:any;
  routePage = "../../edit";
  apis = APIENUM.MROLE;
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "Description",
      header: "Description",

    },

    {
      primaryKey: "Grade",
      header: "Grade",

    },
    {
      primaryKey: "RoleName",
      header: "RoleName",
      // routerParams:true

    },

    {
      primaryKey: "RoleID",
      header: "RoleID",
      routerParams: true


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
    this.read(APIENUM.MROLE);

    this.Role= this._fb.group({
      RoleName:['',[Validators.required]],
      Description:['',[Validators.required]]
    });
  }

  createRole(){
    this.Role.disable();
     let value = {Status:"Active",...this.Role.value};

     this.Api.Create(APIENUM.ROLE,value).subscribe((res:any)=>{
        this.success=res.message;
        this.load();

     },err=>{
       this.error=err.error.message;
       this.Role.enable();


     },()=>{
       setTimeout(()=>{
         this.success='';
         this.error='';
         this.Role.reset();
         this.Role.enable();
       },500);
       this.load();
     })
   }

   get RoleName(){
    return this.Role.get('RoleName')as FormControl;
  }
  get Description(){
    return this.Role.get('Description')as FormControl;
  }


}


// DateCreated: "2020-11-19 14:16:08"
// Description: "Normal Users"
// Grade: "0"
// ID: "1"
// PostedUser: "Developer"
// RoleID: "MRL1900001"
// RoleName: "General"
// Status: "Active"

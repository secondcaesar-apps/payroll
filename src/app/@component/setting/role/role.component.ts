import { Component, OnInit,  ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  maxVisibleItems: number = 8;
  Role:FormGroup;
  error:any;
  success:any;
  constructor(
    private _fb:FormBuilder,
    private Api:ApiserviceService
  ) { }
  @HostListener('input') oninput() {
    this.searchItems();
}
  ngOnInit() {
    this.Api.Read(APIENUM.ROLE)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    })
    this.Role= this._fb.group({
      RoleName:['',[Validators.required]],
      Description:['',[Validators.required]]
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
  createRole(){
    this.Role.disable();
     let value = {Status:"Active",...this.Role.value};
 
     this.Api.Create(APIENUM.ROLE,value).subscribe((res:any)=>{
        this.success=res.message
 
     },err=>{
       this.error=err.error.message;
       this.Role.enable();
 
 
     },()=>{
       setTimeout(()=>{
         this.success='';
         this.error='';
         this.Role.reset();
         this.Role.enable();
       },500)
     })
   }

   get RoleName(){
    return this.Role.get('RoleName');
  }
  get Description(){
    return this.Role.get('Description');
  }


}

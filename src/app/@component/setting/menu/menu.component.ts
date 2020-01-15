import { Component, OnInit,  ViewChild, HostListener  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  elements = [];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  role:any;
  menu:any;
    Menu:FormGroup;
    MenuG:FormGroup;
  error:any;
  success:any;
  constructor(
    private _fb:FormBuilder,
    private Api:ApiserviceService
  ) { }

  ngOnInit() {
    this.load();
  }
load(){
  this.Api.Read(APIENUM.MENU)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
    }, (err: any) => {
      this.loading = false;
      this.messages = err.error.message;
      this.message = true;
    })
this.menuGroupApi()
    this.MenuG = this._fb.group({
      MenuID:['',[Validators.required]],
      RoleID:['',[Validators.required]],
    })
    this.Menu= this._fb.group({
      MenuName:['',[Validators.required]],
      MenuURL:['',[Validators.required]],
      MenuOrder:['',[Validators.required]],
      MenuLevel:['',[Validators.required]],
      ParentID:['',[Validators.required]],
      ParentID2:['',[Validators.required]],
      Description:['',[Validators.required]],
    });
}

  get MenuName(){
    return this.Menu.get('MenuName');
  }
  get MenuURL(){
    return this.Menu.get('MenuURL');
  }
  get MenuOrder(){
    return this.Menu.get('MenuOrder');
  }
  get MenuLevel(){
    return this.Menu.get('MenuLevel');
  }
  get ParentID(){
    return this.Menu.get('ParentID');
  }
  get ParentID2(){
    return this.Menu.get('ParentID2');
  }
  get Description(){
    return this.Menu.get('Description');
  }

  createMenu(){
    this.Menu.disable();
    let value = {Status:"Active",...this.Menu.value};
    this.Api.Create(APIENUM.MENU,value).subscribe((res:any)=>{
      this.success=res.message;
      this.load();

   },err=>{
     this.error=err.error.message;
     this.Menu.enable();
   

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Menu.reset();
       this.Menu.enable();
     },500);
     this.load();

 
   })

  }

  menuGroupApi(){
 var list =   [this.Api.Read(APIENUM.ROLE),this.Api.Read(APIENUM.MENU)];

 forkJoin(list).subscribe((res:any)=>{
   console.log(res);
   this.role = res[0].records;
   this.menu = res[1].records;
 })
  }

  createMenuG(){
    this.MenuG.disable();
    this.Api.Create(APIENUM.MENUG,this.MenuG.value).subscribe((res:any)=>{
      this.success=res.message

   },err=>{
     this.error=err.error.message;
     this.MenuG.enable();
   

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.MenuG.reset();
       this.MenuG.enable();
     },500)

 
   })
  }
}

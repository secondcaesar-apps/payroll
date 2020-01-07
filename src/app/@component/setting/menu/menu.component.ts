import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    Menu:FormGroup;
  error:any;
  success:any;
  constructor(
    private _fb:FormBuilder,
    private Api:ApiserviceService
  ) { }

  ngOnInit() {
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
      this.success=res.message

   },err=>{
     this.error=err.error.message;
     this.Menu.enable();
   

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Menu.reset();
       this.Menu.enable();
     },500)

 
   })

  }
}

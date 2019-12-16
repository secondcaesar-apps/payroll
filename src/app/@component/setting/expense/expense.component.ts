import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  elements: any = [
    {name: 1, Address: 'Mark'},
    {name: 2, Address: 'Jacob'},
    {name: 3, Address: 'Larry'},
  ];

  headElements = ['Name', 'Description'];
  Category:FormGroup;
  error:any;
  success:any;
  
  
  constructor(private _fb:FormBuilder,private Api:ApiserviceService) { }


  ngOnInit() {

    this.Category= this._fb.group({
      CategoryName:['',[Validators.required]],
      CategoryDescription:['',[Validators.required]],
     
    });
  }



  createCategory(){
    this.Category.disable();
    let value = {Status:"Active",...this.Category.value};
    this.Api.Create(APIENUM.CAT,value).subscribe((res:any)=>{
      this.success=res.message

   },err=>{
     this.error=err.error.message;
     this.Category.enable();
     this.error='';

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Category.reset();
       this.Category.enable();
     },500)
   })

  }

  get CategoryName(){
    return this.Category.get('CategoryName');
  }
  get CategoryDescription(){
    return this.Category.get('CategoryDescription');
  }

}

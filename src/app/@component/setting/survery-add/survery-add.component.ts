import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-survery-add',
  templateUrl: './survery-add.component.html',
  styleUrls: ['./survery-add.component.scss']
})
export class SurveryAddComponent extends BaseComponent implements OnInit {
  Survery: any;
  submitted:boolean;
  loadings:boolean;
  errors:any;

  constructor(private shared: SharedService,private _fb: FormBuilder,public api: ApiserviceService,) {
    super(api);
  }

  ngOnInit() {
    this.read(APIENUM.DEPT);
    this.Survery = this._fb.group({
      Title: ['', Validators.required],
      Description: ['', [Validators.required]],
      DepartmentID: ['', [Validators.required]],

    });
  }


  scrollTo(el: any): void {
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector(
      ".ng-invalid[formControlName]"
    );


    this.scrollTo(firstElementWithError);
  }

  get T() {
    return this.Survery.controls;
  }
  validate(){


    this.loadings=true;
    this.submitted = true;


    if (this.Survery.invalid) {
      this.scrollToError();
    } else {
      this.submitted = false;

      this.api.Create(APIENUM.SQ,this.Survery.value).subscribe((res:any)=>{
        this.loadings=false;
        this.success=res.message;

this.Survery.reset();
 this.shared.AddInfo('true');
        setTimeout(()=>{
          this.loadings=false;
           this.success='';
           this.errors='';

         },700);


     },err=>{
      this.loadings=false;
       this.errors=err.error.message;

       setTimeout(()=>{
        this.loadings=false;
         this.success='';
         this.errors='';

       },500);


     },()=>{



     })


    }
  }
}

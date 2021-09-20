import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  show=true;
  admin: FormGroup;
  loading:any;
  submitted: boolean;
  success: any;
  error: string;
  answer: any;
  t: any;
  dept: any;
  did:any
  date: any;
  loadings: boolean;
  dates = new Date().getFullYear();

  q = ['Q1','Q2','Q3','Q4'];
  D= [];
 month = new Date().getMonth();
quarters = ['Q1', 'Q2', 'Q3', 'Q4'].map((_, i, a) => a[Math.floor(this.month / 3 + 1 + i) % 4])[3];
quarter='Q3';
  QT;

  year: any= this.dates;
  constructor(private _fb: FormBuilder, private api: ApiserviceService) {
 this.D = [this.dates-2,this.dates-1,this.dates,this.dates+1,this.dates+2];

  }

  setForm(){
    this.admin = this._fb.group({

      Feedback:[null,[Validators.required]],

      Item: this._fb.array([this.Admin('', '')]),

    });
  }

  ngOnInit() {
 this.dept=null;
    this.  setForm();
    this.getDepartment();

    this.getAnswer();


  }


  getAnswer(){
    this.api.Read(APIENUM.RT).subscribe((res:any)=>{
     this.answer=res.records;
    })
  }

  getQuestion(id) {
    this.  setForm();
    this.loadings=true;
    this.api.ReadOne(APIENUM.SQ,{
      DepartmentID: id
  }).subscribe((res: any) => {
    this.loadings=false;
      this.t = res.records;


      for (let index = 0; index < res.records.length; index++) {
      //  const element = res.records[index];


        this. addItem23(res.records[index], index);
      }



      this.itemArray.removeAt(0);

    },err=>{
      this.loadings=false;
      if (err.status === 0 && err.error instanceof ProgressEvent) {
        // A client-side or network error occurred. Handle it accordingly.

        this.error='Client side error:Please check your internet';
      }else{
        this.error=err.error.Error;
      }



       setTimeout(()=>{

        this.error='';


      },900)
    })
  }


  get itemArray() {
    return this.admin.get('Item') as FormArray;
}

addItem23(value:any, id:any) {
  this.itemArray.push(this.Admin(value, id));
  //this.itemArray.removeAt(0);
}
saverange(event){
  this.admin.reset();
  this.t=null;

  this.date=event.target.value;

  if(this.date!=null && this.did!=null){

    this.getQuestion(this.did);
  }
}

  Admin(value?: any, index?: any) {
    return this._fb.group({


      EmployeeID: [sessionStorage.getItem('EmpID'), [Validators.required]],
      Period: [this.date, [Validators.required]],
      QuestionID: [value.ID, [Validators.required]],
      Title:[value.Title, [Validators.required]],
      RatingID: [value.RatingID, [Validators.required]],
      DepartmentID: [this.did, [Validators.required]],

      // "EmployeeID": "EMP1900004",
      // "Period": "2021_01",
      // "QuestionID": "11",
      // "RatingID": "3",
      // "DepartmentID": "DPT1900011"



    });
  };

  changeGender(e) {

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
  MakeBili() {
    this.submitted = true;




    if ( this.admin.invalid) {
      this.submitted = true;

     this.scrollToError();
    } else {

      this.submitted = false;
 this.validate();


    }
  }

  get T() {
    return this.admin.controls;
  }

  getDepartment(){
    this.dept=[];
    this.api.Special(APIENUM.SD,{'Period':this.quarters+"-"+this.year}).subscribe((res:any)=>{




      this.dept= res.records;

//       DepartmentID: "DPT1900001"
// DepartmentName: "Technologyp"

    })
  }

  onselectCode(value:any){

this.did=value['value'];


if( this.did!=null){



    let result = this.quarters+"-"+this.year;
    this.date= result;
    this.getQuestion(this.did);

}


    // let resut =this.emp.filter((ress:any)=>ress['EmployeeName']==value['value'])[0];


    // this.itemArray.controls[i].patchValue({
    //   Name:value['value']
    // })
    // this.itemArray.controls[i].patchValue({
    //   Email:resut['Email']
    // })


      }

      validate(){


        this.loading=true;
        this.submitted = true;


        if (this.admin.invalid) {
          this.scrollToError();
        } else {
          this.submitted = false;

          this.api.Create(APIENUM.SS,{...this.admin.value,DepartmentID:this.did,Period: this.date}).subscribe((res:any)=>{
            this.loading=false;
            this.success=res.message;
            this.t=null;
            let date = this.date;
            this.dept=null;
            this.  setForm();
            this.ngOnInit();
            this.getDepartment();
         this.date=date;

    this.admin.reset();
    // this.shared.AddInfo('true');
            setTimeout(()=>{
              this.loading=false;
               this.success='';
               this.error='';

             },900);


         },err=>{
          this.loading=false;
           this.error=err.error.message;

           setTimeout(()=>{
            this.loading=false;
             this.success='';
             this.error='';

           },500);


         },()=>{



         })


        }
      }

      qselect(event,i){
let val= event.target.value;
        if(i=='Q'){

          this.QT=val;


        }else{

           this.year=val;


        }

        if(this.QT!=null && this.year!=null){

          let result = this.QT+"-"+this.year;
          this.date= result;
          this.getQuestion(this.did);
        }




      }
}


import { AbstractControl } from '@angular/forms';
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}
export function noWhitespaceValidator(control: FormControl) {
  const isSpace = (control.value || '').match(/\s/g);
  return isSpace ? {'whitespace': true} : null;
}

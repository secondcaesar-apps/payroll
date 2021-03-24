import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
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

  q = ['Q2','Q3','Q4'];
  D= [];
  QT='Q1';
  year: any= this.dates;
  constructor(private _fb: FormBuilder, private api: ApiserviceService) {
 this.D = [this.dates-2,this.dates-1,this.dates+1,this.dates+2];

  }

  setForm(){
    this.admin = this._fb.group({

      Item: this._fb.array([this.Admin('', '')]),

    });
  }

  ngOnInit() {

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
        console.log('Client side error:', err.error);
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
    console.log(e.target.value);
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

 console.log(this.admin.value);


    if ( this.itemArray.invalid) {
      this.submitted = true;

     this.scrollToError();
    } else {

      this.submitted = false;
 this.validate();


    }
  }

  getDepartment(){
    this.api.Read(APIENUM.EMP).subscribe((res:any)=>{
      console.log(res);

      this.dept= res.records;

//       DepartmentID: "DPT1900001"
// DepartmentName: "Technologyp"

    })
  }

  onselectCode(value:any){

this.did=value['value'];


if( this.did!=null){

  if(this.QT!=null && this.year!=null){

    let result = this.QT+"-"+this.year;
    this.date= result;
    this.getQuestion(this.did);
  }
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

          this.api.Create(APIENUM.SS,this.admin.value['Item']).subscribe((res:any)=>{
            this.loading=false;
            this.success=res.message;
            this.t=null;
            let date = this.date;
            this.dept=null;
            this.  setForm();
            this.ngOnInit();
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


       // console.log(event.target.value);

      }
}

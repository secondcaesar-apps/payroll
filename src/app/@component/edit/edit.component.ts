import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { QuestionControlService } from 'src/app/@shared/control.service';
import { QuestionBase } from 'src/app/models/edit-base';
import { TextboxQuestion } from 'src/app/models/edit-textbox';
import { Location } from '@angular/common';
import { DropdownQuestion } from 'src/app/models/edit-dropdown';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  questions: QuestionBase<string>[] = [];
  form: FormGroup = new FormGroup({});
  id: any;
  apis: any;
  value: any;
  error: string="";
  show:boolean=false;

  success: any;
  loading2: boolean=false;
  loading3: boolean=false;
  ;
  payLoad = '';
  loading:boolean=false;

  status=[
    {key: 'Active',  value: 'Active'},
    {key: 'Inactive',  value: 'Inactive'},
    {key: 'InActive',  value: 'InActive'},
    //

  ]
  gender=[
    {key: 'Male',  value: 'Male'},
    {key: 'Female',  value: 'Female'},
    {key: 'Female,Male',  value: 'Female,Male'},
    //

  ]

  constructor(private location: Location,public router:Router,public route: ActivatedRoute, private qcs: QuestionControlService, private api: ApiserviceService) { }

  ngOnInit() {


    //  this.form = this.qcs.toFormGroup(this.questions);
   this.routes();
  }

  onSubmit() {
    this.loading2=true;
    this.payLoad = JSON.stringify(this.form.getRawValue());

    this.api.Update(this.apis,this.form.getRawValue())
    .subscribe( (res:any)=>{
      this.loading2=false;

      this.getValues()
 this.success = res.message;
      //this._router.navigateByUrl('main');

      setTimeout(()=>{
        this.success="";
      },2000)

    },
    (err:any)=>{
      this.loading2=false;

      if (err.status === 0 && err.error instanceof ProgressEvent) {
        // A client-side or network error occurred. Handle it accordingly.

        this.error='Client side error:Please check your internet';
      }else{
        this.error=err.message;
      }
setTimeout(()=>{
  this.error="";
},2000)


    })
  }

  routes() {

    this.route.paramMap.forEach((params: any) => {

      let value = params.params;



      this.id = value['id'];
      this.apis = value['api'];
      this.value = value['value'];

      this.getValues()

      // api: "leave"
      // id: "LV1900001"
      // value: "LeaveID"

    });

  }

  getValues() {
    let index = 1;
    this.loading=true;
    this.error="";
    let value;
    this.questions=[];
    const questions: QuestionBase<string>[]=[];
    this.api.ReadOne(this.apis, { [this.value]: this.id }).subscribe((res: any) => {

if(res['records'][0]){
  value =res['records'][0];
}else{
  value=res;
}

      for (const key of Object.keys(value)) {

        if(key !== 'DateCreated' && key !='Status' && key!='Gender'){
          this.questions.push(new TextboxQuestion({
            key: key,
            label: key,
            controlType: 'textbox',
            order: index,
            value: value[key]==null?'No value':value[key],
            required: true,
            status:(key.toString()=='PostedUser'|| key.toString()=='ID')?true:null


          }))
          index++;
        }else{
          if(key !== 'DateCreated' && key=='Status' || key=='Gender'){
            this.questions.push(
              new DropdownQuestion({
                key: key,
                label:key== 'Status'?key:'Gender',
                value: value[key],
                options: key=='Status'?this.status:this.gender,
                order: index
              }),

            )
          }
        }

      }
      //this.myform
      this.loading=false;
      this.form = this.qcs.toFormGroup(this.questions);
      if(this.form.value.Status=='Rejected'){
  this.show=false;
      }else{
        this.show=true;
      }

    },err => {


      this.loading = false;

      if (err.status === 0 && err.error instanceof ProgressEvent) {
        // A client-side or network error occurred. Handle it accordingly.

        this.error = 'Client side error:Please check your internet';
      } else {
        this.error = err.error.message;
      }

      setTimeout(()=>{
        this.error ='';
      },2000)




    }
    )

  }




  async updateLeaveStatus(el){







  }


  goBack() {
    //this.location.back();
  }

  processUpate(value){
    this.loading3= true;
    this.api.approvetrain(this.apis,value).subscribe((res:any)=>{

      this.success=res.message;


      setTimeout(()=>{
       this.success="";

       this.goBack();

     },2000)

     },err => {




       this.loading3= false;

       if (err.status === 0 && err.error instanceof ProgressEvent) {
         // A client-side or network error occurred. Handle it accordingly.

         this.error = 'Client side error:Please check your internet';
       } else {
         this.error = err.error.message;
       }
       setTimeout(()=>{
         this.error="";
       },2000)



     }
    )






  }

  remove(){
    this.loading3=true;
    this.api.Delete(this.apis,{[this.value]:this.id}).subscribe((res:any)=>{
      this.loading3=false;
      this.success = res.message;
      this.location.back();
      setTimeout(()=>{
        this.success="";

      },2000)

    },(err:any)=>{
      this.loading3=false;

      if (err.status === 0 && err.error instanceof ProgressEvent) {
        // A client-side or network error occurred. Handle it accordingly.

        this.error='Client side error:Please check your internet';
      }else{
        this.error=err.message;
      }
setTimeout(()=>{
  this.error="";
},2000)


    })

  }

}

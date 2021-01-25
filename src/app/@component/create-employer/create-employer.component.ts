import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIENUM } from 'src/app/@shared/enum';
import { forkJoin } from 'rxjs';
import { IMyOptions } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-create-employer',
  templateUrl: './create-employer.component.html',
  styleUrls: ['./create-employer.component.scss']
})
export class CreateEmployerComponent implements OnInit {
  optionsSelect: Array<any>;
  loading:boolean=false;
  show: Boolean=false;
  image='../../../assets/profile_image.jpg';
  error: any;
  success: any;
  Employee: FormGroup;
  location:any;
  role:any;
  department:any;
  employee:any;
  designation:any;
  public myDatePickerOptions: IMyOptions = {
    // Your options
  };
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  salarygroup: any;
  gender: string[];
  constructor(private _location: Location,
      private _fb: FormBuilder,
       private service: ApiserviceService) {

    this.Employee = this._fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Location: ['', [Validators.required]],
      Department: ['', [Validators.required]],
      Designation: ['', [Validators.required]],
      ReportsTO: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      SalaryGroup: ['', [Validators.required]],
      Role: ['', [Validators.required]],
      Email: ['', [Validators.email,Validators.required]],

    });

   }

  ngOnInit() {



    this.optionsSelect = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      ];
    this.loadEvent()
      this.gender = ['Male','Female']
    }

  back () {
    this._location.back()
  }
  switch(){
    this.show = true;
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {

      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {

      this.uploadFile(file);
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;

    this.service.ImageUpload(file.data)
      .subscribe((event: any) => {
        this.image = event.Path;
      }
      )
  }


loadEvent(){

  let event = [this.service.Read(APIENUM.LOC),this.service.Read(APIENUM.DEPT),this.service.Read(APIENUM.EMP),this.service.Read(APIENUM.SAG),this.service.Read(APIENUM.DES),this.service.Read(APIENUM.ROLE)]

  forkJoin(event).subscribe((res:any)=>{
    console.log(res);

    this.location= res[0].records;
    this.optionsSelect = [
      { value: 'Male', label:'Male' },
      { value: 'Female', label: 'Female' },
      ];
    this.department = res[1].records;
    this.employee=res[2].records;
     this.salarygroup=res[3].records;
     this.designation=res[4].records;
     this.role=res[5].records;
  })
}

createEmployee(){
  this.loading=true;
  this.Employee.disable();
    let value = {Status:"Active",Avatar:this.image,...this.Employee.value};

    this.service.Create(APIENUM.EMP,value).subscribe((res:any)=>{
       this.success=res.message
       this.image='../../../assets/profile_image.jpg';
       this.loading=false;
       setTimeout(()=>{
        this.success='';
        this.error='';
        this.Employee.reset();
        this.Employee.enable();
        this.loading=false;
      },2000)
    },err=>{
      this.error=err.error.message;
      this.Employee.enable();
      this.loading=false;
      setTimeout(()=>{
        this.success='';
        this.error='';
        this.Employee.reset();
        this.Employee.enable();
        this.loading=false;
      },2000)


    }
    )
}

}

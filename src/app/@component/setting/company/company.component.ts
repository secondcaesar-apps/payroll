import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { APIENUM } from 'src/app/@shared/enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent  implements OnInit {
  optionsSelect: Array<any>;
  show: Boolean = false;
  uploadedFiles: any;
  file: File;
  imagePath: File;
  error: any;
  success: any;
  Company: FormGroup;
  country = environment.countryList;
  image = '../../../assets/profile_image.jpg';
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  constructor(
    private _fb: FormBuilder,
    private _location: Location, private service: ApiserviceService) { }

  ngOnInit() {

    this.Company = this._fb.group({
      CompanyName: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      CPName: ['', [Validators.required]],
      CPTelephoneNo: ['', [Validators.required]],
      ContactAddress: ['', [Validators.required]],
      CPEmail: ['', [Validators.email,Validators.required]],
    });
    this.optionsSelect = [
      { value: '1', label: 'Male' },
      { value: '2', label: 'Female' },
    ];
  }


  get CompanyName() {
    return this.Company.get('CompanyName') as FormControl;
  }

  get Country() {
    return this.Company.get('Country') as FormControl;
  }

  get CPName() {
    return this.Company.get('CPName') as FormControl;
  }
  get CPTelephoneNo() {
    return this.Company.get('CPTelephoneNo') as FormControl;
  }

  get ContactAddress() {
    return this.Company.get('ContactAddress') as FormControl;
  }

 get CPEmail() {
    return this.Company.get('CPEmail') as FormControl;
  }






  createCompany(){
    this.Company.disable();
     let value = {Logo:this.image,...this.Company.value};

     this.service.Create(APIENUM.COM,value).subscribe((res:any)=>{
        this.success=res.message

     },err=>{
       this.error=err.error.message;
       this.Company.enable();


     },()=>{
       setTimeout(()=>{
         this.success='';
         this.error='';
         this.image = '../../../assets/profile_image.jpg';
         this.Company.reset();
         this.Company.enable();
       },500)
     })
   }







  back() {
    this._location.back()
  }
  switch() {
    this.show = true;
  }

  fileChange(f) {

    this.uploadedFiles = f.target.files[0];
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.service.ImageUpload(this.uploadedFiles).subscribe((res) => {
      console.log(res);
    });
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
}

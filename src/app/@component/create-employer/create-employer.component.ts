import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-create-employer',
  templateUrl: './create-employer.component.html',
  styleUrls: ['./create-employer.component.scss']
})
export class CreateEmployerComponent implements OnInit {
  optionsSelect: Array<any>;
  show: Boolean=false;
  image='../../../assets/profile_image.jpg';
  error: any;
  success: any;
  Employee: FormGroup;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  constructor(private _location: Location,    private _fb: FormBuilder, private service: ApiserviceService) { }

  ngOnInit() {
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

    this.optionsSelect = [
      { value: '1', label: 'Male' },
      { value: '2', label: 'Female' },
      ];
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

  let event = [this.service.Read(APIENUM.LOC),this.service.Read(APIENUM.DEPT),this.service.Read(APIENUM.EMP),this.service.Read(APIENUM.SAG)]
}

}

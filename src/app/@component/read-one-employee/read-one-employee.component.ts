import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { APIENUM } from 'src/app/@shared/enum';
import swal from 'sweetalert2';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { map, tap  } from 'rxjs/operators';
import {IMAGE} from './enus';
@Component({
  selector: 'app-read-one-employee',
  templateUrl: './read-one-employee.component.html',
  styleUrls: ['./read-one-employee.component.scss']
})
export class ReadOneEmployeeComponent implements OnInit {

  @Input() title: string;
  value:any;
  employee:FormGroup;
  location:any;
  image='../../../assets/profile_image.jpg';
  role:any;
  department:any;
  employees:any;
  designation:any;
  email: string="";
  salarygroup: any;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  optionsSelect: Array<any>;
  accountSelect: Array<any>;
  marriageSelect: Array<any>;
  constructor(
    private shared: SharedService,
    private Api: ApiserviceService,
    private _fb:FormBuilder,
    private route: Router,
    
  ) { }

  ngOnInit() {
    this.optionsSelect = [
      { value: 'Account 1', label: 'Account 1' },
      { value: 'Account 2', label: 'Account 2' }
      ];
      this.accountSelect = [
        { value: 'Salary', label: 'Salary' },
        { value: 'Savings', label: 'Savings' },
        { value: 'Current', label: 'Current' },
        { value: 'Others', label: 'Others' },
        ];
        this.marriageSelect = [
          { value: 'Single', label: 'Single'},
          { value: 'Married', label: 'Married' },
          { value: 'Divoced', label: 'Divoced' },
          ];
    this.value = this.shared.getInfo().value
        if(this.value==null){
          this.route.navigate(['./main/employee'])
          this.value=null;
        }else {
          console.log(this.value)
          this.email = this.value.Email;
          this.employee = this._fb.group({
            EmployeeID :[this.value.EmployeeID],
            FirstName :[this.value.FirstName, Validators.required],
            LastName:[this.value.LastName,Validators.required],
            Email:[this.value.Email,Validators.required],
            Gender:[this.value.Gender, Validators.required],
            DOB:[this.value.DOB,Validators.required],
            Department:[this.value.Department,Validators.required],
            Designation:[this.value.Designation, Validators.required],
            Location:[this.value.Location,Validators.required],
            ReportsTO:[this.value.ReportsTO,Validators.required],
            ProbationEndDate:[this.value.ProbationEndDate,Validators.required],
            JoiningDate:[this.value.JoiningDate,Validators.required],
            MaritalStatus:[this.value.MaritalStatus,Validators.required],
            ExitDate:[this.value.ExitDate,Validators.required],
            Status:[this.value.Status,Validators.required],
            SalaryGroup:[this.value.SalaryGroup,Validators.required],
            Role:[this.value.Role,Validators.required],
            ContactNumber:[this.value.ContactNumber,Validators.required],
            EmergencyContactNumber:[this.value.EmergencyContactNumber,Validators.required],
            EmergencyContactPerson:[this.value.EmergencyContactPerson,Validators.required],
            Address:[this.value.Address,Validators.required],
            DrivingLicenseNumber:[this.value.DrivingLicenseNumber,Validators.required],
            PANNumber:[this.value.PANNumber,Validators.required],
            AadharNumber_SSN:[this.value.AadharNumber_SSN,Validators.required],
            VoterIDNumber:[this.value.VoterIDNumber,Validators.required],
            DrivingLicense:[this.value.DrivingLicense,Validators.required],
            PANCard:[this.value.PANCard,Validators.required],
            Aadhar_SSN:[this.value.Aadhar_SSN,Validators.required],
            VoterID:[this.value.VoterID,Validators.required],
            OfferLetter:[this.value.OfferLetter,Validators.required],
            JoiningLetter:[this.value.JoiningLetter,Validators.required],
            Contract:[this.value.Contract,Validators.required],
            Resume:[this.value.Resume,Validators.required],
            Relievingletter:[this.value.Relievingletter,Validators.required],
            ExperienceLetter:[this.value.ExperienceLetter,Validators.required],
            PrimaryBankAccount:[this.value.PrimaryBankAccount,Validators.required],
            Acct1AccountType:[this.value.Acct1AccountType,Validators.required],
            Acct1AccountHolderName:[this.value.Acct1AccountHolderName,Validators.required],
            Acct1AccountNumber:[this.value.Acct1AccountNumber,Validators.required],
            Acct1BankCode:[this.value.Acct1BankCode,Validators.required],
            Acct1BankName:[this.value.Acct1BankName,Validators.required],
            Acct1BankBranch:[this.value.Acct1BankBranch,Validators.required],
            Acct2AccountType:[this.value.Acct2AccountType,Validators.required],
            Acct2AccountHolderName:[this.value.Acct2AccountHolderName,Validators.required],
            Acct2AccountNumber:[this.value.Acct2AccountNumber,Validators.required],
            Acct2BankCode:[this.value.Acct2BankCode,Validators.required],
            Acct2BankName:[this.value.Acct2BankName,Validators.required],
            Acct2BankBranch:[this.value.Acct1BankBranch,Validators.required],
            GradSchoolUniversity:[this.value.GradSchoolUniversity,Validators.required],
            GradStartDate:[this.value.GradStartDate,Validators.required],
            GradEndDate:[this.value.GradEndDate,Validators.required],
            GradDetails:[this.value.GradDetails,Validators.required],
            PGSchoolUniversity:[this.value.PGSchoolUniversity,Validators.required],
            PGStartDate:[this.value.PGStartDate,Validators.required],
            PGEndDate:[this.value.PGEndDate,Validators.required],
            PGDetails:[this.value.PGDetails,Validators.required],
            DoctorateSchoolUniversity:[this.value.DoctorateSchoolUniversity,Validators.required],
            DoctorateStartDate:[this.value.DoctorateStartDate,Validators.required],
            DoctorateEndDate:[this.value.DoctorateEndDate,Validators.required],
            DoctorateDetails:[this.value.DoctorateDetails,Validators.required],
            CertificationsCoursesDetails:[this.value.CertificationsCoursesDetails,Validators.required],
            WE1CompanyName:[this.value.WE1CompanyName,Validators.required],
            WE1Designation:[this.value.WE1Designation,Validators.required],
            WE1From:[this.value.WE1From,Validators.required],
            WE1To:[this.value.WE1To,Validators.required],
            WE1Details:[this.value.WE1Details,Validators.required],
            WE2CompanyName:[this.value.WE2CompanyName,Validators.required],
            WE2Designation:[this.value.WE2Designation,Validators.required],
            WE2From:[this.value.WE2From,Validators.required],
            WE2To:[this.value.WE2To,Validators.required],
            WE2Details:[this.value.WE2Details,Validators.required],
            WE3CompanyName:[this.value.WE3CompanyName,Validators.required],
            WE3Designation:[this.value.WE3Designation,Validators.required],
            WE3From:[this.value.WE3From,Validators.required],
            WE3To:[this.value.WE3To,Validators.required],
            WE3Details:[this.value.WE3Details,Validators.required],
            OtherWEsDetails:[this.value.OtherWEsDetails,Validators.required],
            PassportNumber:[this.value.PassportNumber,Validators.required],
            PassportIssueDate:[this.value.PassportIssueDate,Validators.required],
            PassportExpiryDate:[this.value.PassportExpiryDate,Validators.required],
            PassportScanCopy:[this.value.PassportScanCopy,Validators.required],
            VisaNumber:[this.value.VisaNumber,Validators.required],
            VisaIssueDate:[this.value.VisaIssueDate,Validators.required],
            VisaExpiryDate:[this.value.VisaExpiryDate,Validators.required],
            VisaScanCopy:[this.value.VisaScanCopy,Validators.required],
            Slackusername:[this.value.Slackusername,Validators.required],
            Facebookusername:[this.value.Facebookusername,Validators.required],
            Twitterusername:[this.value.Twitterusername,Validators.required],
            LinkedInusername:[this.value.LinkedInusername,Validators.required],
             });
        }
        this.loadEvent();
    
  }
  

  loadEvent(){

    let event = [this.Api.Read(APIENUM.LOC),this.Api.Read(APIENUM.DEPT),this.Api.Read(APIENUM.EMP),this.Api.Read(APIENUM.SAG),this.Api.Read(APIENUM.DES),this.Api.Read(APIENUM.ROLE)]
  
    forkJoin(event).subscribe((res:any)=>{
      console.log(res); 
  
      this.location= res[0].records;
      this.department = res[1].records;
      this.employees=res[2].records;
       this.salarygroup=res[3].records;
       this.designation=res[4].records;
       this.role=res[5].records;
    })
  }
  createemployee(){

    this.employee.disable();
    this.Api.Update(APIENUM.EMP, this.employee.value).subscribe((res:any)=>{
  
    
      swal.fire({
        title: res.message,position: "center",
        icon: 'success',
        showConfirmButton: false,
        timer: 3500,
        showCloseButton: true,
    
       })
      this.employee.reset();
      this.employee.enable();
    
    
    },(err=>{
      this.employee.enable();
  
    
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: true,
        timer: 3500,
    
       })
    
    }))
  
  }
  onClick(img:IMAGE) {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {

      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles(img);
    };
    fileUpload.click();
  }

  private uploadFiles(img:IMAGE) {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {

      this.uploadFile(file);
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;

    this.Api.ImageUpload(file.data)
      .subscribe((event: any) => {
        this.image = event.Path;
        this.image = event.Path;
        this.image = event.Path;
        this.image = event.Path;
        this.image = event.Path;
      }
      )
  }

}



import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit, Input, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { APIENUM,UType } from 'src/app/@shared/enum';
import swal from 'sweetalert2';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { map, tap  } from 'rxjs/operators';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  @Input() title: string;
  value: string="";
  elements: any = [];
  image='../../../assets/profile_image.jpg';
  message: Boolean=false;
  edit: Boolean=false;
  loading: Boolean = true;
  profile: Boolean=false;
  messages: string;
  employee:FormGroup;
  location:any;
  role:any;
  department:any;
  employees:any;
  designation:any;
  email: string="";
  Increment: any = [];
  increment: string="";
  previous: string="";
  promo: Boolean=false
  current: string="";
  salarygroup: any;
  pic: string="";

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
    // this.value = this.shared.getInfo().value
    this.value =  sessionStorage.getItem('EmpID')
          let data = {
            EmployeeID:  sessionStorage.getItem('EmpID')
            
      }
          this.Api.ReadOne(APIENUM.EMP, data)
          .subscribe((res:any)=>{
            this.loading = false;
            this.elements=res.records[0];
            this.email = this.elements.Email;
            this.pic=this.elements.Avatar
            this.employee = this._fb.group({
            EmployeeID:[this.elements.EmployeeID],
            FirstName:[this.elements.FirstName, Validators.required],
            LastName:[this.elements.LastName,Validators.required],
            Email:[this.elements.Email,Validators.required],
            Gender:[this.elements.Gender, Validators.required],
            DOB:[this.elements.DOB,Validators.required],
            Department:[{ value: this.elements.Department, disabled: true },Validators.required],
            Designation:[this.elements.Designation, Validators.required],
            Location:[this.elements.Location,Validators.required],
            ReportsTO:[this.elements.ReportsTO,Validators.required],
            ProbationEndDate:[this.elements.ProbationEndDate,Validators.required],
            JoiningDate:[this.elements.JoiningDate,Validators.required],
            MaritalStatus:[this.elements.MaritalStatus,Validators.required],
            ExitDate:[this.elements.ExitDate,Validators.required],
            Status:[this.elements.Status,Validators.required],
            SalaryGroup:[this.elements.SalaryGroup,Validators.required],
            Role:[this.elements.Role,Validators.required],
            ContactNumber:[this.elements.ContactNumber,Validators.required],
            EmergencyContactNumber:[this.elements.EmergencyContactNumber,Validators.required],
            EmergencyContactPerson:[this.elements.EmergencyContactPerson,Validators.required],
            Address:[this.elements.Address,Validators.required],
            DrivingLicenseNumber:[this.elements.DrivingLicenseNumber,Validators.required],
            PANNumber:[this.elements.PANNumber,Validators.required],
            AadharNumber_SSN:[this.elements.AadharNumber_SSN,Validators.required],
            VoterIDNumber:[this.elements.VoterIDNumber,Validators.required],
            DrivingLicense:[this.elements.DrivingLicense,Validators.required],
            PANCard:[this.elements.PANCard,Validators.required],
            Aadhar_SSN:[this.elements.Aadhar_SSN,Validators.required],
            VoterID:[this.elements.VoterID,Validators.required],
            OfferLetter:[this.elements.OfferLetter,Validators.required],
            JoiningLetter:[this.elements.JoiningLetter,Validators.required],
            Contract:[this.elements.Contract,Validators.required],
            Resume:[this.elements.Resume,Validators.required],
            Relievingletter:[this.elements.Relievingletter,Validators.required],
            ExperienceLetter:[this.elements.ExperienceLetter,Validators.required],
            PrimaryBankAccount:[this.elements.PrimaryBankAccount,Validators.required],
            Acct1AccountType:[this.elements.Acct1AccountType,Validators.required],
            Acct1AccountHolderName:[this.elements.Acct1AccountHolderName,Validators.required],
            Acct1AccountNumber:[this.elements.Acct1AccountNumber,Validators.required],
            Acct1BankCode:[this.elements.Acct1BankCode,Validators.required],
            Acct1BankName:[this.elements.Acct1BankName,Validators.required],
            Acct1BankBranch:[this.elements.Acct1BankBranch,Validators.required],
            Acct2AccountType:[this.elements.Acct2AccountType,Validators.required],
            Acct2AccountHolderName:[this.elements.Acct2AccountHolderName,Validators.required],
            Acct2AccountNumber:[this.elements.Acct2AccountNumber,Validators.required],
            Acct2BankCode:[this.elements.Acct2BankCode,Validators.required],
            Acct2BankName:[this.elements.Acct2BankName,Validators.required],
            Acct2BankBranch:[this.elements.Acct1BankBranch,Validators.required],
            GradSchoolUniversity:[this.elements.GradSchoolUniversity,Validators.required],
            GradStartDate:[this.elements.GradStartDate,Validators.required],
            GradEndDate:[this.elements.GradEndDate,Validators.required],
            GradDetails:[this.elements.GradDetails,Validators.required],
            PGSchoolUniversity:[this.elements.PGSchoolUniversity,Validators.required],
            PGStartDate:[this.elements.PGStartDate,Validators.required],
            PGEndDate:[this.elements.PGEndDate,Validators.required],
            PGDetails:[this.elements.PGDetails,Validators.required],
            DoctorateSchoolUniversity:[this.elements.DoctorateSchoolUniversity,Validators.required],
            DoctorateStartDate:[this.elements.DoctorateStartDate,Validators.required],
            DoctorateEndDate:[this.elements.DoctorateEndDate,Validators.required],
            DoctorateDetails:[this.elements.DoctorateDetails,Validators.required],
            CertificationsCoursesDetails:[this.elements.CertificationsCoursesDetails,Validators.required],
            WE1CompanyName:[this.elements.WE1CompanyName,Validators.required],
            WE1Designation:[this.elements.WE1Designation,Validators.required],
            WE1From:[this.elements.WE1From,Validators.required],
            WE1To:[this.elements.WE1To,Validators.required],
            WE1Details:[this.elements.WE1Details,Validators.required],
            WE2CompanyName:[this.elements.WE2CompanyName,Validators.required],
            WE2Designation:[this.elements.WE2Designation,Validators.required],
            WE2From:[this.elements.WE2From,Validators.required],
            WE2To:[this.elements.WE2To,Validators.required],
            WE2Details:[this.elements.WE2Details,Validators.required],
            WE3CompanyName:[this.elements.WE3CompanyName,Validators.required],
            WE3Designation:[this.elements.WE3Designation,Validators.required],
            WE3From:[this.elements.WE3From,Validators.required],
            WE3To:[this.elements.WE3To,Validators.required],
            WE3Details:[this.elements.WE3Details,Validators.required],
            OtherWEsDetails:[this.elements.OtherWEsDetails,Validators.required],
            PassportNumber:[this.elements.PassportNumber,Validators.required],
            PassportIssueDate:[this.elements.PassportIssueDate,Validators.required],
            PassportExpiryDate:[this.elements.PassportExpiryDate,Validators.required],
            PassportScanCopy:[this.elements.PassportScanCopy,Validators.required],
            VisaNumber:[this.elements.VisaNumber,Validators.required],
            VisaIssueDate:[this.elements.VisaIssueDate,Validators.required],
            VisaExpiryDate:[this.elements.VisaExpiryDate,Validators.required],
            VisaScanCopy:[this.elements.VisaScanCopy,Validators.required],
            Slackusername:[this.elements.Slackusername,Validators.required],
            Facebookusername:[this.elements.Facebookusername,Validators.required],
            Twitterusername:[this.elements.Twitterusername,Validators.required],
            LinkedInusername:[this.elements.LinkedInusername,Validators.required],
             }); 
             this.Api.EmployeeRead(APIENUM.INCR, {
              EmployeeID: this.elements.EmployeeID
            })
            .subscribe((res: any) => {
              console.log(res.records);
              this.promo = true
          this.Increment = res.records
          
            },(err: any) => {
              this.increment = err.error.message;
            })
             this.profile = true
            }, (err: any) => {
              this.loading = false;
              this.messages = err.error.message;
              this.message = true;
            })
            this.loadEvent();
// setTimeout(() => this.employee.disable(), 2000);
  }

 
  loadEvent(){

    let event = [this.Api.Read(APIENUM.LOC),this.Api.Read(APIENUM.DEPT),this.Api.Read(APIENUM.EMP),this.Api.Read(APIENUM.SAG),this.Api.Read(APIENUM.DES),this.Api.Read(APIENUM.ROLE)]
  
    forkJoin(event).subscribe((res:any)=>{
      this.location= res[0].records;
      this.department = res[1].records;
      this.employees=res[2].records;
      this.salarygroup=res[3].records
       this.designation=res[4].records;
       this.role=res[5].records;
    })
  }
  onClick2(file:UType){

    console.log(file);

  }
  createemployee(){

    
    let value = {Status:"Active",Avatar:this.image,...this.employee.value};
    this.Api.Update(APIENUM.EMP, value).subscribe((res:any)=>{
  
    
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
        title: err.error.message,
        showConfirmButton: true,
        timer: 3500,
    
       })
    
    }))
  
  }

  CanEdit(){
    this.edit = true
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

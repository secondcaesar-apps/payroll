
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { Form, FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-salary-setup',
  templateUrl: './salary-setup.component.html',
  styleUrls: ['./salary-setup.component.scss']
})
export class SalarySetupComponent extends BaseComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];
  group = [];
  headElements = ['Name', 'Amount', 'Leave Days',];
  headElement = ['Name', 'Amount', 'Type',];
  searchText: string = '';
  previous: string;
  message: Boolean = false;

  displaySide: Boolean = false;
  messages: string;
  maxVisibleItems: number = 8;
  error: any;
  success: any;
  show: boolean;
  Salary: FormGroup;
  Name: string = '';
  Type: string = '';
  Amount: string = '';
  SalaryComponentID: string = '';
  id = null;
  Modal: Boolean = false;
  type = ['Credit', 'Debit']
  optionsSelect = [
    { value: 'Credit', label: 'Credit' },
    { value: 'Debit', label: 'Debit' },
  ];
  // SalarySlipID: string = '';
  // EmployeeID: string = '';
  Total = 0;


  routePage = "../../edit";
  apis = APIENUM.SAG;
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "LeaveDays",
      header: "LeaveDays",

    },

    {
      primaryKey: "LeaveDays",
      header: "Leave Days",

    },
    {
      primaryKey: "NetPay",
      header: "Net Pay",
      // routerParams:true

    },

    {
      primaryKey: "SalaryGroupID",
      header: "Salary GroupID",
      routerParams: true


    },
    {
      primaryKey: "SalaryGroupName",
      header: "Salary Group Name",


    },


    {

      primaryKey: "DateCreated",
      header: "Date",
      date: true

    },



    {
      primaryKey: "Status",
      header: "Status",
    }



  ];





  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private Api: ApiserviceService
  ) {
    super(Api);
  }

  ngOnInit() {
    this.load();
  }
  SalaryCom(el) {
    this.displaySide = true;
    this.itemArray.clear();
    this.Salary.reset();
    this.id = el.SalaryGroupID;

    let data = {
      "SalaryGroupID": this.id
    }
    this.Api.SalaryComponentRead(data, APIENUM.SAG)
      .subscribe((res: any) => {
        this.loading = false;
        console.log(res.records)
        this.group = res.records;

        this.Salary.patchValue(
          {
            SalaryGroupName: el.SalaryGroupName,
            LeaveDays: el.LeaveDays
          }

        )

        for (let index = 0; index < res.records.length; index++) {
          const element = res.records[index];


          this.addItem2(res.records[index], index);
        }


      })
    this.Modal = true;








  }


  clear() {
    this.itemArray.clear();
    this.Salary.reset();
  }
  createSalary(): FormGroup {
    return this._fb.group({
      Name: ['', [Validators.required]],
      Amount: ['', [Validators.required]],
      Type: ['', [Validators.required]],


    });
  }


  get itemArray() {
    return this.Salary.get('SalaryComponent') as FormArray;
  }

  addItem() {
    this.Cart();
    this.itemArray.push(this.createSalary());
  }

  get SalaryGroupName() {
    return this.Salary.get('SalaryGroupName') as FormControl;
  }

  get LeaveDays() {
    return this.Salary.get('LeaveDays') as FormControl;
  }

  removeItems(id) {
    this.itemArray.removeAt(id);
    this.Cart();
  }

  openDetails() {
    this.router.navigate(['/main/settings/salary-create'])
  }
  createSalar() {
    //console.info(this.Salary.value);
    this.Cart();
    this.Salary.disable();
    let value = { Status: "Active", NetPay: this.Total, ...this.Salary.value };
    this.Api.Create(APIENUM.SAG, value).subscribe((res: any) => {
      this.success = res.message;
      this.load();

    }, err => {
      this.error = err.error.message;
      this.Salary.enable();


    }, () => {
      setTimeout(() => {
        this.success = '';
        this.error = '';
        this.Salary.reset();
        this.resetTeamForm()
        this.Salary.enable();
      }, 500);
      this.load();
    })

  }



  Cart() {

    let addtion = 0;
    let reduction = 0;
    let cal = this.itemArray.value;

    for (let index = 0; index < cal.length; index++) {
      if (cal[index].Type == 'Credit') {
        let Amount = parseInt(cal[index].Amount);
        addtion = Amount + addtion;

      }
      else {
        let Amount = parseInt(cal[index].Amount);
        reduction = Amount + reduction;
      }


    }

    this.Total = addtion - reduction;

    console.log(this.Total);



    // let cal = this.itemArray.value;

    // let smallTotal=0;

    // for (let index = 0; index < cal.length; index++) {
    //   let Amount =parseInt(cal[index].Amount);

    //   smallTotal= Amount +  smallTotal;

    // }


    //this.Total = smallTotal;


  }

  resetTeamForm() {
    this.itemArray.reset();
  }




  load() {
    this.read(APIENUM.SAG);
    this.Salary= this._fb.group({
      SalaryGroupName:['',[Validators.required]],
      LeaveDays :['',[Validators.required]],
      SalaryComponent:this._fb.array([this.createSalary()]),


    });
  }
  // load2(){
  //   this.Api.Read(APIENUM.SAG)
  //   .subscribe((res:any)=>{
  //     this.loading = false;
  //     this.elements=res.records;
  //     this.mdbTable.setDataSource(this.elements);
  //     this.elements = this.mdbTable.getDataSource();
  //     this.previous = this.mdbTable.getDataSource();
  //   })


  // }

  addItem2(value, id) {

    this.itemArray.push(this.createSalary2(value, id));

  }


  createSalary2(value?: any, index?: any): FormGroup {
    return this._fb.group({
      Name: [value.Name, [Validators.required]],
      Amount: [value.Amount, [Validators.required]],
      Type: [value.Type, [Validators.required]],


    });
  }

  UpadetSalar() {
    //console.info(this.Salary.value);
    this.Cart();
    this.Salary.disable();
    let value = { Status: "Active", NetPay: this.Total, ...this.Salary.value, SalaryGroupID: this.id };
    console.log(value);
    this.Api.Update(APIENUM.SAG, value).subscribe((res: any) => {
      this.success = res.message + `WITH TOTAL OF : ₦ ${this.Total}`;
      this.reset();

    }, err => {
      this.error = err.error.message;
      this.reset();

    }, () => {


    })


  }

  reset() {
    setTimeout(() => {
      this.success = '';
      this.error = '';

      this.Salary.enable();
    }, 1000);
    this.load();

  }
}
// DateCreated: "2020-03-12 10:02:25"
// ID: "1"
// LeaveDays: "12"
// NetPay: "110000.00"
// PostedUser: "Oluyemi Bamiro"
// SalaryGroupID: "SG1900001"
// SalaryGroupName: "Interns"
// Status: "Deleted"

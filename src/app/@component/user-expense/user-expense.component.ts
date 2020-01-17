import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { APIENUM } from 'src/app/@shared/enum';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-user-expense',
  templateUrl: './user-expense.component.html',
  styleUrls: ['./user-expense.component.scss']
})
export class UserExpenseComponent implements OnInit {
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  headElements = ['Expense ID', 'Category', 'Amount', 'Bill Date','Status'];
  bio=["Daily",
   " Weekly",
   "Bi-Weekly",
  "Monthly",
   "Quarterly",
   "Half Yearly"
  ]
  status=['Paid','Unpaid'];
  types=[ "Expense",
    "ReOccurentExpense",
    "Claim"]
  elements = [];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  show: Boolean; 
  displaySide: Boolean = false;
  statusValue: string  = '';
  Merchant: string  = '';
  Receipt: string  = '';
  PaymentMethod: string  = '';
  Amount: string  = '';
  BillDate: string  = '';
  Category: string  = '';
  Description: string  = '';
  ExpenseID: string  = '';
  Title: string  = '';
  Expense:FormGroup;
  error: any;
  success: any;
  cat :any;
  emp:any;
  constructor(
    private Api:ApiserviceService,
    private _fb:FormBuilder
  ) { }

    @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {


    this.loadEvent();

    this.Expense = this._fb.group({

  
      Merchant:['',[Validators.required]],
      Receipt:['',[Validators.required]],
      PaymentMethod:['',[Validators.required]],
      Amount:['',[Validators.required]],
      BillDate:['',[Validators.required]],
      Category:['',[Validators.required]],
      Description:['',[Validators.required]],
      Status:['',[Validators.required]],
      Title:['',[Validators.required]],
      EmployeeID:['',[Validators.required]],
      Rotation:['',[Validators.required]],
      Day:['',[Validators.required]],
      Type:['',[Validators.required]],
     

    });
    this.Api.Read(APIENUM.EXP)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, (err: any) => {
      this.loading = false;
      this.messages = err.error.message;
      this.message = true;
      this.elements = [];
    })
  }
    searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
  view() {
    this.show = !this.show;
  }
  readExpense(el){
    if(this.show){
      this.displaySide = true;
    } 
    this.statusValue = el.Status;
    this.ExpenseID=el.ExpenseID;
    this.Merchant = el.Merchant;
    this.Amount = el.Amount;
    this.BillDate =el.BillDate;
    this.Category=el.Category;
    this.Description=el.Description;
    this.Title=el.Title;
  }

  get ExpenseIDs() {
    return this.Expense.get('ExpenseID');
  }
  get Merchants() {
    return this.Expense.get('Merchant');
  }
  get Receipts() {
    return this.Expense.get('Receipt');
  }
  get PaymentMethods() {
    return this.Expense.get('PaymentMethod');
  }
  get Amounts() {
    return this.Expense.get('Amount');
    
  }

  get BillDates() {
    return this.Expense.get('BillDate');
    
  }

  get Categorys() {
    return this.Expense.get('Category');
    
  }
  get Descriptions() {
    return this.Expense.get('Description');
    
  }

  get Status() {
    return this.Expense.get('Status');
    
  }
  get Titles() {
    return this.Expense.get('Title');
    
  }

  get EmployeeID() {
    return this.Expense.get('EmployeeID');
    
  }

  get Rotation() {
    return this.Expense.get('Rotation');
    
  }
  get Day() {
    return this.Expense.get('Day');
    
  }
  get Type() {
    return this.Expense.get('Type');
    
  }

  loadEvent(){
    let event =[ this.Api.Read(APIENUM.CAT), this.Api.Read(APIENUM.EMP)];

    forkJoin(event).subscribe((res:any)=>{

      this.cat = res[0].records;
      this.emp= res[1].records;
  
    })
  }

  createExpense(){
    this.Expense.disable();
      let value = this.Expense.value;
  
      this.Api.Create(APIENUM.EXP,value).subscribe((res:any)=>{
         this.success=res.message
  
      },err=>{
        this.error=err.error.message;
        this.Expense.enable();
  
  
      },()=>{
        setTimeout(()=>{
          this.success='';
          this.error='';
          this.Expense.reset();
          this.Expense.enable();
        },800)
      })
  }
}


export enum Status{
  Paid,
  UnPaid
}

export enum Type{
  Expense,
  ReOccurentExpense,
  Claim
}


// ID: "1"
// PostedUser: ""
// CategoryID: "CAT1900001"
// CategoryName: "Salaries"
// CategoryDescription: "Salary of Full time Staffs"
// Status: "Active"
// DateCreated: "2019-12-13 12:40:19"
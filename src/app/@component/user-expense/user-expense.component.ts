import { Component, OnInit } from '@angular/core';
import { APIENUM } from 'src/app/@shared/enum';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
@Component({
  selector: 'app-user-expense',
  templateUrl: './user-expense.component.html',
  styleUrls: ['./user-expense.component.scss']
})
export class UserExpenseComponent implements OnInit {
  headElements = ['ExpenseID', 'Category', 'Amount', 'BillDate','Status'];
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
  constructor(
    private Api:ApiserviceService
  ) { }

  ngOnInit() {
    this.Api.Read(APIENUM.EXP)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
    }, (err: any) => {
      this.loading = false;
      this.messages = err.error.message;
      this.message = true;
    })
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
}

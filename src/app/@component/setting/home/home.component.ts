import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list:any;
//expense-setup roles

  constructor() { }

  ngOnInit() {
    this.list =[
      {name:'Company',route:'company',icon:'fa fa-home fa-2x'},
      {name:'Department',route:'department',icon:'fa fa-laptop fa-2x'},
      {name:'Salary-group',route:'salary-group',icon:'fa fa-list fa-2x'},
      {name:'Expense-setup',route:'expense-setup',icon:'fa fa-list fa-2x'},
      {name:'Leave-setup',route:'leave-setup',icon:'fa fa-laptop fa-2x'},
      {name:'Roles',route:'roles',icon:'fa fa-bus fa-2x'},
  
  ]
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list: { name: string; route: string; icon: string; }[];
  approval: { name: string; route: string; icon: string; }[];

  constructor() { }

  ngOnInit() {
    this.list =[
      {name:'Company',route:'settings/company',icon:'fa fa-home fa-2x'},
      {name:'Department',route:'settings/department',icon:'fa fa-laptop fa-2x'},
      {name:'Salary-group',route:'settings/salary-group',icon:'fa fa-list fa-2x'},
      {name:'Expense-setup',route:'settings/expense-setup',icon:'fa fa-list fa-2x'},
      {name:'Leave-setup',route:'settings/leave-setup',icon:'fa fa-laptop fa-2x'},
      {name:'Increment',route:'settings/increment',icon:'fa fa-bus fa-2x'},
      {name:'Roles',route:'settings/roles',icon:'fa fa-bus fa-2x'},
      {name:'Location',route:'settings/location',icon:'fa fa-map fa-2x'},
      {name:'Designation',route:'settings/designation',icon:'fa fa-map fa-2x'},
      {name:'Calender',route:'settings/calender',icon:'fa fa-book fa-2x'},
      {name:'Workflow',route:'settings/workflow',icon:'fa fa-book fa-2x'},
      {name:'Menu Setup',route:'settings/menu',icon:'fa fa-book fa-2x'},
  
  ]
  this.approval =[  {name:'Leave Approval',route:'report',icon:'fa fa-home fa-2x'},
  {name:'Workflow Approval',route:'Approvals',icon:'fa fa-home fa-2x'},
]

  }

 
}

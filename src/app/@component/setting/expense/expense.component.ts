import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  elements: any = [
    {name: 1, Address: 'Mark'},
    {name: 2, Address: 'Jacob'},
    {name: 3, Address: 'Larry'},
  ];

  headElements = ['Name', 'Description'];
  constructor() { }

  ngOnInit() {
  }

}

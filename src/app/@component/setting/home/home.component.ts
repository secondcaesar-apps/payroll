import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list:any;


  constructor() { }

  ngOnInit() {
    this.list =[
      {name:'Company',route:'company'},
      {name:'Department',route:'department'},
      {name:'Salary-group',route:'salary-group'},
  
  ]
  }

}

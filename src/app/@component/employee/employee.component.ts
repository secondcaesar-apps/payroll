import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  elements: any = [];
  headElements = ['id', 'first', 'last', 'handle'];
  show: Boolean=false;
  constructor(private router: Router,) { }

  ngOnInit() {
    for (let i = 1; i <= 15; i++) {
      this.elements.push({ id: i, first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i });
    }
  }
  view(){
    this.show = !this.show ;
  }
  newemployee(){
    this.router.navigate(['/main/create-employer'])
  }
  reademployee(){
    this.router.navigate(['/main/read-employer'])
  }
}

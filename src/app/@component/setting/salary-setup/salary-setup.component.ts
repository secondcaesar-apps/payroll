import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary-setup',
  templateUrl: './salary-setup.component.html',
  styleUrls: ['./salary-setup.component.scss']
})
export class SalarySetupComponent implements OnInit {
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
  openDetails(){
    this.router.navigate(['/main/create-employer'])
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  elements: any = [
    {name: 1, Address: 'Mark'},
    {name: 2, Address: 'Jacob'},
    {name: 3, Address: 'Larry'},
  ];

  headElements = ['Name', 'Address'];
  constructor() { }

  ngOnInit() {
  }

}

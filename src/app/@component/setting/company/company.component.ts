import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  optionsSelect: Array<any>;
  show: Boolean=false;
  constructor(private _location: Location) { }

  ngOnInit() {
    this.optionsSelect = [
      { value: '1', label: 'Male' },
      { value: '2', label: 'Female' },
      ];
    }

  back () {
    this._location.back()
  }
  switch(){
    this.show = true;
  }
}

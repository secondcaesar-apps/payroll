import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-employer',
  templateUrl: './create-employer.component.html',
  styleUrls: ['./create-employer.component.scss']
})
export class CreateEmployerComponent implements OnInit {
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

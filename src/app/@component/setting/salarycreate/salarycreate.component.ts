import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-salarycreate',
  templateUrl: './salarycreate.component.html',
  styleUrls: ['./salarycreate.component.scss']
})
export class SalarycreateComponent implements OnInit {

  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},

  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];

  constructor(private _location: Location) { }

  ngOnInit() {
  }
  back () {
    this._location.back()
  }

}

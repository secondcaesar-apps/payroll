import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-rolecreate',
  templateUrl: './rolecreate.component.html',
  styleUrls: ['./rolecreate.component.scss']
})
export class RolecreateComponent implements OnInit {

  constructor(private _location: Location){ }

  ngOnInit() {
  }
  back () {
    this._location.back()
  }

}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-createcontact',
  templateUrl: './createcontact.component.html',
  styleUrls: ['./createcontact.component.scss']
})
export class CreatecontactComponent implements OnInit {

 
  constructor(private _location: Location){ }

  ngOnInit() {
  }
  back () {
    this._location.back()
  }

}
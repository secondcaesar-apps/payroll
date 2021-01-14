import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-addassets',
  templateUrl: './addassets.component.html',
  styleUrls: ['./addassets.component.scss']
})
export class AddassetsComponent implements OnInit {
  optionsSelect=[];

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit() {
    this.optionsSelect = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ];
  }

  close(){
    this.modalRef.hide();
  }

}

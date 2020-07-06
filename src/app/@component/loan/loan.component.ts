import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-uikit-pro-standard';
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  @ViewChild('basicModal', { static: true }) basicModal: ModalDirective;
  constructor() { }

  ngOnInit() {
  }
  showAndHideModal() {
    this.basicModal.show();

  }

  hideModal(){
    this.basicModal.hide();
  }
}

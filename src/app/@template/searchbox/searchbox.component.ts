import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  searchText:any="";

  @Output() messageEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {

  }

  @HostListener('input') oninput() {
    this.messageEmitter.emit(this.searchText);
}

}

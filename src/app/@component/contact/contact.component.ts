import { Component, OnInit,  ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];zz6x    
  headElements = ['id', 'first', 'last', 'handle'];
  show: Boolean=false;
  searchText: string = '';
  previous: string;
  constructor(private router: Router,) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit() {
    for (let i = 1; i <= 15; i++) {
      this.elements.push({ id: i, first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i });
    }
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }
  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
  view(){
    this.show = !this.show ;
  }
  
createContact(){
    this.router.navigate(['/main/create-contact'])
  }
}

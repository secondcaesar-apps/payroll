import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit,  ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];    
  headElements = ['id', 'first', 'last', 'handle'];
  show: Boolean=false;
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  maxVisibleItems: number = 8;
  loading:Boolean=true;
  messages: string;
  constructor(
    private router: Router,
    private service: ApiserviceService
    ) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit() {
    this.service.Read(APIENUM.CON)
      .subscribe((res:any)=>{
        this.loading = false;
        this.elements=res.records;
      },(err:any)=>{
        this.loading= false;
        this.messages = err.error.message;
        this.message = true;
      })
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

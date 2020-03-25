import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit, Input, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { AddassetsComponent } from 'src/app/@modal/addassets/addassets.component';
import { APIENUM } from 'src/app/@shared/enum';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-timelinelist',
  templateUrl: './timelinelist.component.html',
  styleUrls: ['./timelinelist.component.scss']
})
export class TimelinelistComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  location:any;
  error: any;
  success: any;
  elements = [];
  myForm1: FormGroup; 
  date: string = '';
  headElements = [ 'Month', 'Total Amount','No of employees', 'Role','Approved By', 'Status'];
  public modalRef: MDBModalRef
  searchText: string = '';
  previous: string;
  message: Boolean = false;
  loading: Boolean = true;
  messages: string;
  maxVisibleItems: number = 8;
  show: Boolean; 
  displaySide: Boolean = false;
  statusValue: string  = '';
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private fb: FormBuilder,
    private service: ApiserviceService,
    private router: Router,
    ) {}
    
    @HostListener('input') oninput() {
      this.searchItems();
  }
  @Input() title: string;
  ngOnInit() {
    var d = new Date();
    var year = d.getFullYear().toString();
    this.myForm1 = this.fb.group({
      Year: ['', Validators.required]
    });
 this.service.Read(APIENUM.LOC).subscribe((res:any)=>{
   console.log(res.records);
  this.location = res.records;

 }, (err: any) => {
  this.loading = false;
  this.messages = err.error.message;
  this.message = true;
})
let value = {
  "Year":year
}
    this.service.Yearlyreport(value,APIENUM.PAYROLL)
      .subscribe((res: any) => {
        this.loading = false;
        this.elements = res.records;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }, (err: any) => {
        this.loading = false;
        this.messages = err.error.message;
        this.message = true;
      })
  }
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    
    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }


  OnPrimaryToggled($event, item){
    console.log('item');
  }

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      first: 'Wpis ' + this.elements.length,
      last: 'Last ' + this.elements.length,
      handle: 'Handle ' + this.elements.length
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, { id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy' });
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(AddassetsComponent, {
      backdrop: true,
      keyboard: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog-top modal-lg',
      containerClass: 'center',
      animated: true,
      data: {
        heading: 'Modal heading',
        content: { heading: 'Content heading', description: 'Content description' }
      }
    });
  }

  view() {
    this.show = !this.show;
  }
openDetails(el){
  if(this.show){
    this.displaySide = true;
  } 
  this.statusValue = el.Status;

     console.log(el);
}
hitApi() {
  let date = this.myForm1.value['Year'].split('-')
  let value ={
    "Year": date[0]
  }
      this.service.Yearlyreport(value, APIENUM.PAYROLLM)
        .subscribe((res: any) => {
          this.loading = false;
          this.error = false;
          this.elements = res.records;
          this.mdbTable.setDataSource(this.elements);
          this.elements = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }, (err: any) => {
          this.loading = false;
          this.error = true;
          this.messages = err.error.message;
          this.message = true;
          this.elements = [];
        })
    }

}

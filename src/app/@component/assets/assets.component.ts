import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { AddassetsComponent } from 'src/app/@modal/addassets/addassets.component';
import { APIENUM } from 'src/app/@shared/enum';
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];
  headElements = ['','id', 'first', 'last', 'handle'];
  public modalRef: MDBModalRef
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  messages: string;
  maxVisibleItems: number = 8;
  show: boolean;
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private service: ApiserviceService
    ) {}
    
    @HostListener('input') oninput() {
      this.searchItems();
  }

  ngOnInit() {
    this.service.Read(APIENUM.ASS)
      .subscribe((res:any)=>{
        this.loading = false;
        this.elements=res.records;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },(err:any)=>{
        this.loading= false;
        this.messages = err.error.message;
        this.message = true;
      })
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
    this.mdbTable.addRowAfter(1, {id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy'});
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
          content: { heading: 'Content heading', description: 'Content description'}
      }
  });
  }

  view(){
    this.show = !this.show ;
  }

}

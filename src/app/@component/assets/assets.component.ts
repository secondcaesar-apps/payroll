import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit, Input, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { AddassetsComponent } from 'src/app/@modal/addassets/addassets.component';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  Asset: FormGroup;
  location:any;
  error: any;
  success: any;
  elements = [];
  headElements = ['AssetName', 'Description', 'AssetType', 'SerailNumber','Location', 'Status'];
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
    private service: ApiserviceService,
    private _fb: FormBuilder,
    private router: Router,
    ) {}
    
    @HostListener('input') oninput() {
      this.searchItems();
  }
  @Input() title: string;
  asset: FormGroup;
  ngOnInit() {
    this.Asset = this._fb.group({
      AssetName: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      AssetType: ['', [Validators.required]],
      SerailNumber: ['', [Validators.required]],
      Location: ['', [Validators.required]],
      Status: [true, [Validators.required]],

    });
 this.service.Read(APIENUM.LOC).subscribe((res:any)=>{
   console.log(res.records);
  this.location = res.records;

 }, (err: any) => {
  this.loading = false;
  this.messages = err.error.message;
  this.message = true;
})

    this.service.Read(APIENUM.ASS)
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
  get AssetName() {
    return this.Asset.get('AssetName');
  }
  get Description() {
    return this.Asset.get('Description');
  }

  get AssetType() {
    return this.Asset.get('AssetType');
  }

  get Location() {
    return this.Asset.get('Location');
  }


  get SerailNumber() {
    return this.Asset.get('SerailNumber');
  }
  getCheckboxesValue() {
    console.log('Checked value:', this.Asset.controls['checked'].value);

  }

  OnPrimaryToggled($event, item){
    console.log('item');
  }
  createAsset() {
    console.info(this.Asset.value);
    this.Asset.disable();
    let value = { Status:  this.Asset.controls['Status'].value? 'NonFunctional' : "Functional", ...this.Asset.value };

    this.service.Create(APIENUM.ASS, value).subscribe((res: any) => {
      this.success = res.message

    }, err => {
      this.error = err.error.message;
      this.Asset.enable();


    }, () => {
      setTimeout(() => {
        this.success = '';
        this.error = '';
        this.Asset.reset();
        this.Asset.enable();
      }, 500)
    })
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
  this.asset = this._fb.group({
    AssetID :[el.AssetID],
    AssetName :[el.AssetName, Validators.required],
    Description:[el.Description,Validators.required],
    AssetType :[el.AssetType, Validators.required],
    SerailNumber:[el.SerailNumber,Validators.required],
    Location:[el.Location, Validators.required],
    Status:[el.Status,Validators.required],
     });
     console.log(el);
}
updateAsset(){

  this.asset.disable();
  this.service.Update(APIENUM.ASS, this.asset.value).subscribe((res:any)=>{

  
    swal.fire({
      title: res.message,position: "center",
      icon: 'success',
      showConfirmButton: false,
      timer: 3500,
      showCloseButton: true,
  
     })
    this.asset.enable();
  
  
  },(err=>{
    this.asset.enable();

  
    swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Something went wrong',
      showConfirmButton: true,
      timer: 3500,
  
     })
  
  }))

}
}

import { ApiserviceService } from './../../@shared/apiservice.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];
  headElements = ['ContactID', 'ContactName', 'Description', 'ContactNumber','Email','Service'];
  show: Boolean = false;
  searchText: string = '';
  previous: string;
  message: Boolean = false;
  maxVisibleItems: number = 8;
  loading: Boolean = true;
  messages: string;
  Contact: FormGroup;
  location: any;
  error: any;
  success: any;
  constructor(
    private router: Router,
    private service: ApiserviceService,
    private _fb: FormBuilder,
  ) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit() {
    this.Contact = this._fb.group({
      ContactName: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      ContactNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      Service: ['', [Validators.required]],


    });
    this.service.Read(APIENUM.CON)
      .subscribe((res: any) => {
        this.loading = false;
        this.elements = res.records;
      }, (err: any) => {
        this.loading = false;
        this.messages = err.error.message;
        this.message = true;
      })
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }


  get ContactName() {
    return this.Contact.get('ContactName');
  }
  get Description() {
    return this.Contact.get('Description');
  }
  get Email() {
    return this.Contact.get('Email');
  }
  get ContactNumber() {
    return this.Contact.get('ContactNumber');
  }
  get Service() {
    return this.Contact.get('Service');
  }
  createContact() {
    console.info(this.Contact.value);
    this.Contact.disable();
    let value = { Status: "Active", ...this.Contact.value };

    this.service.Create(APIENUM.CON, value).subscribe((res: any) => {
      this.success = res.message

    }, err => {
      this.error = err.error.message;
      this.Contact.enable();


    }, () => {
      setTimeout(() => {
        this.success = '';
        this.error = '';
        this.Contact.reset();
        this.Contact.enable();
      }, 500)
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
  view() {
    this.show = !this.show;
  }


}

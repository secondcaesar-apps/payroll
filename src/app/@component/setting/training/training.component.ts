import { element } from 'protractor';
import { ApiserviceService } from '../../../@shared/apiservice.service';
import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective, ToastService } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];
  array= [];
  Employee = [];
  headElements = ['Training Name', 'Description', 'Start Date','End Date'];
  show: Boolean = false;
  searchText: string = '';
  previous: string;
  message: Boolean = false;
  maxVisibleItems: number = 8;
  loading: Boolean = true;
  messages: string;
  Training: FormGroup;
  location: any;
  error: any;
  success: any;
  displaySide: Boolean = false;
  statusValue: string  = '';
  optionsSelect: Array<any>;
  constructor(
    private router: Router,
    private service: ApiserviceService,
    private _fb: FormBuilder,
    private toast: ToastService,
  ) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }
  @Input() title: string;
  training: FormGroup;
  ngOnInit() {
 let arr = JSON.stringify(["EMP1900001", "EMP1900003", "EMP1900004", "EMP1900010", "EMP1900011"].toString()) 
    console.log(arr);
 this.Training = this._fb.group({
      TrainingName: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      Employees: ['', [Validators.required]],
    });
    this.service.Read(APIENUM.EMP)
    .subscribe((res:any)=>{
      this.Employee=res.records;
      for(let i = 0; i < this.Employee.length; i++){
        this.array.push(
          {value: this.Employee[i].EmployeeID,
           label: this.Employee[i].FirstName + ' ' + this.Employee[i].LastName
           })
           this.optionsSelect = this.array;
     } 
     console.log(this.optionsSelect);

    }, (err: any) => {
      this.toast.error(err.error.message);
      
    })
    this.service.Read(APIENUM.train)
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


  get TrainingName() {
    return this.Training.get('TrainingName');
  }
  get Description() {
    return this.Training.get('Description');
  }
  get StartDate() {
    return this.Training.get('StartDate');
  }
  get EndDate() {
    return this.Training.get('EndDate');
  }
  get Employees() {
    return this.Training.get('Employees');
  }
  createTraining() {
 
    this.Training.disable();
    let value = { ...this.Training.value, Employees: this.Training.value.Employees.toString()}
    console.info(value);
    this.service.Create(APIENUM.train, value).subscribe((res: any) => {
      this.success = res.message
      this.toast.clear()
    }, err => {
      this.error = err.error.message;
      this.Training.enable();


    }, () => {
      setTimeout(() => {
        this.success = '';
        this.error = '';
        this.Training.reset();
        this.Training.enable();
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
  openDetails(el){                                                                                                  
    if(this.show){
      this.displaySide = true;
    } 
    console.log(el);
    this.statusValue = el.Status;
    this.training = this._fb.group({
      TrainingID :[el.TrainingID],
    TrainingName :[el.TrainingName, Validators.required],
      Description:[el.Description,Validators.required],
      StartDate :[el.StartDate, Validators.required],
      EndDate:[el.EndDate,Validators.required],
      Employees:[el.Employees, Validators.required],
      Status:[el.Status,Validators.required],
       });
       console.log(el);
  }
  updateContact(){

    this.training.disable();
    this.service.Update(APIENUM.train, this.training.value).subscribe((res:any)=>{
  
    
      swal.fire({
        title: res.message,position: "center",
        icon: 'success',
        showConfirmButton: false,
        timer: 3500,
        showCloseButton: true,
    
       })
      this.training.enable();
    
    
    },(err=>{
      this.training.enable();
  
    
      swal.fire({
        position: 'center',
        icon: 'error',
        title: err.error.message,
        showConfirmButton: true,
        timer: 3500,
    
       })
    
    }))
  
  }
}

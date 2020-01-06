
import { Component, OnInit,  ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { APIENUM } from 'src/app/@shared/enum';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { Form, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-salary-setup',
  templateUrl: './salary-setup.component.html',
  styleUrls: ['./salary-setup.component.scss']
})
export class SalarySetupComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [];
  headElements = ['SalaryGroupID', 'SalaryGroupName', 'Description', 'NetPay'];
  searchText: string = '';
  previous: string;
  message: Boolean=false;
  loading:Boolean=true;
  displaySide: Boolean = false;
  messages: string;
  maxVisibleItems: number = 8;
  error:any;
  success:any;
  show: boolean;
  Salary:FormGroup;
  Name: string = '';
  Type: string = '';
  Amount: string = '';
  SalaryComponentID: string = '';
  // SalarySlipID: string = '';
  // EmployeeID: string = '';
  Total=0;
  constructor(
    private router: Router,
    private _fb:FormBuilder,
    private Api:ApiserviceService
      ) { }

  @HostListener('input') oninput() {
        this.searchItems();
    }
  ngOnInit() {
    this.Api.Read(APIENUM.SAG)
    .subscribe((res:any)=>{
      this.loading = false;
      this.elements=res.records;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    })

    this.Salary= this._fb.group({
      SalaryGroupName:['',[Validators.required]],
      Description:['',[Validators.required]],
      SalaryComponent:this._fb.array([this.createSalary()]),

     
    });
   
  }
SalaryCom(el){
  if (this.show) {
    this.displaySide = true;
    let data = {
      "SalaryGroupID": el.SalaryGroupID
    }
    this.Api.SalaryComponentRead(data, APIENUM.SAG)
    .subscribe((res:any)=>{
      this.loading = false;
       console.log(res.records)
       this.Name = res.records[0].Name;
       this.Type = res.records[0].Type;
       this.Amount = res.records[0].Amount;
       this.SalaryComponentID = res.records[0].SalaryComponentID;
    })
  
  }

}
  createSalary(): FormGroup{
    return this._fb.group({
      Name :['',[Validators.required]],
      Amount:['',[Validators.required]],
      Type:['',[Validators.required]],
     
     
    });
  }

  
  get itemArray() {
    return this.Salary.get('SalaryComponent') as FormArray;
}

  addItem(){
  this.itemArray.push(this.createSalary());
  }

  get SalaryGroupName(){
    return this.Salary.get('SalaryGroupName');
  }

  get Description(){
    return this.Salary.get('Description');
  }
 
  removeItems(id) {
    this.itemArray.removeAt(id);
   // this.Cart();
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
  openDetails(){
    this.router.navigate(['/main/settings/salary-create'])
  }
  createSalar(){
//console.info(this.Salary.value);
this.Cart();
this.Salary.disable();
let value = {Status:"Active",NetPay:this.Total,...this.Salary.value};
this.Api.Create(APIENUM.SAG,value).subscribe((res:any)=>{
  this.success=res.message

},err=>{
 this.error=err.error.message;
 this.Salary.enable();


},()=>{
 setTimeout(()=>{
   this.success='';
   this.error='';
   this.Salary.reset();
   this.resetTeamForm()
   this.Salary.enable();
 },500)
})

  }


  
  Cart(){



    let cal = this.itemArray.value;
    
    let smallTotal=0;
    
    for (let index = 0; index < cal.length; index++) {
      let Amount =parseInt(cal[index].Amount);
     
      smallTotal= Amount +  smallTotal;
    
    }
    
    
    this.Total = smallTotal;
    

      }

      resetTeamForm() {
        this.itemArray.reset();
      }
}

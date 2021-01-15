import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { JoyrideService } from 'ngx-joyride';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list: { name: string; route: string; icon: string; }[];
  approval: { name: string; route: string; icon: string; }[];
  menuArray=[];
  loading=false;

  settAound=false;
  error: string;


  constructor(private service:ApiserviceService,private router:Router ) { }

  ngOnInit() {
  //  this.onClick();
    this.list =[
      {name:'Company',route:'settings/company',icon:'fa fa-home fa-2x'},
      {name:'Department',route:'settings/department',icon:'fa fa-laptop fa-2x'},
      {name:'Salary-group',route:'settings/salary-group',icon:'fa fa-list fa-2x'},
      {name:'Expense-setup',route:'settings/expense-setup',icon:'fa fa-list fa-2x'},
      {name:'Leave-setup',route:'settings/leave-setup',icon:'fa fa-laptop fa-2x'},
      {name:'Increment',route:'settings/increment',icon:'fa fa-bus fa-2x'},
      {name:'Roles',route:'settings/roles',icon:'fa fa-bus fa-2x'},
      {name:'Location',route:'settings/location',icon:'fa fa-map fa-2x'},
      {name:'Designation',route:'settings/designation',icon:'fa fa-map fa-2x'},
      {name:'Calender',route:'settings/calender',icon:'fa fa-book fa-2x'},
      {name:'Workflow',route:'settings/workflow',icon:'fa fa-book fa-2x'},

      {name:'Loan-Workflow',route:'settings/loan-workflow',icon:'fa fa-book fa-2x'},
      {name:'Workflow Approval',route:'Approvals',icon:'fa fa-home fa-2x'},

      {name:'Menu Setup',route:'settings/menu',icon:'fa fa-book fa-2x'},

  ]
  this.approval =[ {name:'Loan Approval',route:'loan-flow',icon:'fa fa-book fa-2x'},

  {name:'Payroll',route:'payroll',icon:'fa fa-home fa-2x'},
  {name:'Training Approval',route:'training-approval',icon:'fa fa-home fa-2x'},
]
 this.LoadMenu();
  }


  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
  // onClick() {
  //   this.joyrideService.startTour(
  //     { steps: ['firstStep','dashboard','user-dahboard','user-expense','user-payroll','user-profile','user-leave','employee','assets','payroll','report']} // Your steps order
  //   );
  // }

  LoadMenu(){
    this.loading=true;
    this.error='';
    let MroleID=   sessionStorage.getItem('MRoleID')

    this.service.ReadOne(APIENUM.MENUG,{'RoleID':MroleID}).subscribe((res)=>{
       this.menuArray=res['records'];
       this.loading=false;
  this.menuArray.filter((e:any)=>{


if( e['MenuName']=='Settings'){
this.settAound= true;
}
  })

    },(err:any)=>{
      this.loading=false;
      if (err.status === 0 && err.error instanceof ProgressEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('Client side error:', err.error);
        this.error='Client side error:Please check your internet';
      }else{
        this.error=err.error.Error;
      }

    })
  }


}




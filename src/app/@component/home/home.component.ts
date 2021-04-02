import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { JoyrideService } from 'ngx-joyride';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { SharedService } from 'src/app/@shared/shared/shared.service';

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
  elements: any;
  firstname: any;
  lastname: any;
  pic: any;
  Email: any;


  constructor(private service:ApiserviceService,private router:Router,public share:SharedService ) {
    this.LoadMenu();
   }

   getUsser(){
    let data = {
      EmployeeID:  sessionStorage.getItem('EmpID')

}
    this.service.ReadOne(APIENUM.EMP, data).subscribe((res:any)=>{
      this.elements=res.records[0];
      console.log(res);
      this.firstname=this.elements.FirstName;
      this.lastname=this.elements.LastName;
      this.pic=this.elements.Avatar
      this.Email=this.elements.Email

    })
   }

  ngOnInit() {

    this.share.getInfo().subscribe((res)=>{

      if(res){
        this. getUsser();
        this.LoadMenu()
      //  this.onClick(); yearlyreport
      'yearlyreport'
        this.list =[
          {name:'Company',route:'settings/company',icon:'las la-home'},
          {name:'Employee',route:'employee',icon:'fa fa-users fa-2x'},
          {name:'Payroll',route:'payroll',icon:'fa fa-list fa-2x'},
          {name:'Payroll Approval',route:'Approvals',icon:'las la-comments-dollar'},
          {name:'Department',route:'settings/department',icon:'fa fa-laptop fa-2x'},
          {name:'Salary-group',route:'settings/salary-group',icon:'las la-file-invoice-dollar'},
          {name:'Expense-setup',route:'settings/expense-setup',icon:'las la-shopping-cart'},
          {name:'Leave-setup',route:'settings/leave-setup',icon:'las la-globe'},
          {name:'Increment',route:'settings/increment',icon:'las la-plus'},
          {name:'Roles',route:'settings/roles',icon:'las la-user-tag'},
          {name:'Location',route:'settings/location',icon:'las la-map'},
          {name:'Designation',route:'settings/designation',icon:'las la-dumbbell'},
          {name:'Calender',route:'settings/calender',icon:'las la-calendar'},
          {name:'Workflow',route:'settings/workflow',icon:'las la-network-wired'},
          {name:'report',route:'yearlyreport',icon:'las la-file-alt'},
          {name:'Loan-workflow',route:'settings/loan-workflow',icon:'las la-wallet'},
          {name:'Trainning setup',route:'training',icon:'las la-random'},

          {name:'holiday',route:'settings/holiday',icon:'las la-plane-arrival'},
          {name:'Menu Setup',route:'settings/menu',icon:'las la-stream'},

         {name:'survey',route:'settings/survery',icon:'las la-poll'},
         {name:'rating',route:'settings/rating',icon:'las la-star'},

      ]
      this.approval =[

      ]
      }
    })

 this. getUsser();
    this.LoadMenu()
  //  this.onClick(); yearlyreport
  'yearlyreport'
    this.list =[
      {name:'Company',route:'settings/company',icon:'las la-home'},
      {name:'Employee',route:'employee',icon:'fa fa-users fa-2x'},
      {name:'Payroll',route:'payroll',icon:'fa fa-list fa-2x'},
      {name:'Payroll Approval',route:'Approvals',icon:'las la-comments-dollar'},
      {name:'Department',route:'settings/department',icon:'fa fa-laptop fa-2x'},
      {name:'Salary-group',route:'settings/salary-group',icon:'las la-file-invoice-dollar'},
      {name:'Expense-setup',route:'settings/expense-setup',icon:'las la-shopping-cart'},
      {name:'Leave-setup',route:'settings/leave-setup',icon:'las la-globe'},
      {name:'Increment',route:'settings/increment',icon:'las la-plus'},
      {name:'Roles',route:'settings/roles',icon:'las la-user-tag'},
      {name:'Location',route:'settings/location',icon:'las la-map'},
      {name:'Designation',route:'settings/designation',icon:'las la-dumbbell'},
      {name:'Calender',route:'settings/calender',icon:'las la-calendar'},
      {name:'Workflow',route:'settings/workflow',icon:'las la-network-wired'},
      {name:'report',route:'yearlyreport',icon:'las la-file-alt'},
      {name:'Loan-workflow',route:'settings/loan-workflow',icon:'las la-wallet'},
      {name:'Trainning setup',route:'training',icon:'las la-random'},

      {name:'holiday',route:'settings/holiday',icon:'las la-plane-arrival'},
      {name:'Menu Setup',route:'settings/menu',icon:'las la-stream'},

     {name:'survey',route:'settings/survery',icon:'las la-poll'},
     {name:'rating',route:'settings/rating',icon:'las la-star'},

  ]
  this.approval =[

  ]

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
    this.settAound=false;
    this.loading=true;
    this.error='';
    let MroleID=   sessionStorage.getItem('MRoleID')

    this.service.ReadOne(APIENUM.MENUG,{'RoleID':MroleID}).subscribe((res)=>{
    // this.menuArray=res['records'];


       this.loading=false;
       res['records'].filter((e:any)=>{



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




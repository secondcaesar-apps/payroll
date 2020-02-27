import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ToastModule, ToastService  } from 'ng-uikit-pro-standard';
import { HomeComponent } from '../@component/home/home.component';
import { DashboardComponent } from '../@component/dashboard/dashboard.component';
import { SharedModule } from '../@shared/shared/shared.module';
import { EmployeeComponent } from '../@component/employee/employee.component';
import { PayrollComponent } from '../@component/payroll/payroll/payroll.component';
import { BasicsalaryComponent } from '../@component/payroll/basicsalary/basicsalary.component';
import { ManagesalaryComponent } from '../@component/payroll/managesalary/managesalary.component';
import { ReportsalaryComponent } from '../@component/payroll/reportsalary/reportsalary.component';
import { AssetsComponent } from '../@component/assets/assets.component';
import { CreateEmployerComponent } from '../@component/create-employer/create-employer.component';
import { AddassetsComponent } from '../@modal/addassets/addassets.component';
import { ReadOneEmployeeComponent } from '../@component/read-one-employee/read-one-employee.component';
import { ContactComponent } from '../@component/contact/contact.component';
import { CreatecontactComponent } from '../@component/createcontact/createcontact.component';
import { ApiserviceService } from '../@shared/apiservice.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorServices } from '../@shared/intercept';
import { UserDashboardComponent } from '../@component/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from '../@component/user-profile/user-profile.component';
import { UserPayrollComponent } from '../@component/user-payroll/user-payroll.component';
import { UserLeaveComponent } from '../@component/user-leave/user-leave.component';
import { UserExpenseComponent } from '../@component/user-expense/user-expense.component';
import { SharedService } from '../@shared/shared/shared.service';
import { GeneratePayrollComponent } from '../@component/generate-payroll/generate-payroll.component';
import { ReportComponent } from '../@component/report/report.component';
import { PayslipComponent } from '../@component/payroll/payslip/payslip.component';
import { ControlComponent } from '../@component/control/control.component';
import { FinanceComponent } from '../@component/finance/finance.component';
import { CeoComponent } from '../@component/ceo/ceo.component';
import { ApprovalComponent } from '../@component/approval/approval.component';
import { TrainingComponent } from '../@component/setting/training/training.component';
import { TrainingApprovalComponent } from '../@component/training-approval/training-approval.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, EmployeeComponent, PayrollComponent, BasicsalaryComponent, ManagesalaryComponent, ReportsalaryComponent, AssetsComponent, CreateEmployerComponent, AddassetsComponent, ReadOneEmployeeComponent, ContactComponent, CreatecontactComponent, UserDashboardComponent, UserProfileComponent, UserPayrollComponent, UserLeaveComponent, UserExpenseComponent, GeneratePayrollComponent, ReportComponent, PayslipComponent, ControlComponent, FinanceComponent, CeoComponent, ApprovalComponent, TrainingComponent, TrainingApprovalComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    ToastModule.forRoot(),
  ],
  entryComponents: [AddassetsComponent],
  providers: [ApiserviceService,ToastService,
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorServices,
      multi: true
    }]
})
export class MainModule { }

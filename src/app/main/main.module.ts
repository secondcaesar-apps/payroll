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
import { TimelineComponent } from '../@component/timeline/timeline.component';
import { TimelinelistComponent } from '../@component/timelinelist/timelinelist.component';
import { LoanComponent } from '../@component/loan/loan.component';
import { ReadLoanComponent } from '../@component/read-loan/read-loan.component';
import { LoanApprovalComponent } from '../@component/loan-approval/loan-approval.component';

import { TableComponent } from '../@template/table/table.component';
import { SearchboxComponent } from '../@template/searchbox/searchbox.component';
import { LoaderComponent } from '../@template/loader/loader.component';
import { SearchPipe } from '../@pipe/search.pipe';
import { ErrorsComponent } from '../@template/errors/errors.component';
import { SuccessComponent } from '../@template/success/success.component';
import { ProcessformComponent } from '../@component/processform/processform.component';
import { QuestionControlService } from '../@shared/control.service';
import { BackComponent } from '../@component/back/back.component';
import { BackDirective } from '../@directive/back.directive';
import { DynamicFormComponent } from '../@component/dynamic-form/dynamic-form.component';
import { UserLeaveComponent } from '../@component/LEAVES/user-leave/user-leave.component';
import { CreateLeaveTabComponent } from '../@component/LEAVES/create-leave-tab/create-leave-tab.component';
import { LeaveTabComponent } from '../@component/LEAVES/leave-tab/leave-tab.component';
import { LeaveApprovalTabComponent } from '../@component/LEAVES/leave-approval-tab/leave-approval-tab.component';
import { MreportComponent } from '../@component/mreport/mreport.component';
//import { BaseComponent } from '../@component/base/base.component';

@NgModule({
  declarations: [DynamicFormComponent,BackDirective,BackComponent,SuccessComponent,ErrorsComponent,SearchPipe,LoaderComponent,SearchboxComponent,TableComponent,HomeComponent,DashboardComponent, EmployeeComponent, PayrollComponent, BasicsalaryComponent, ManagesalaryComponent, ReportsalaryComponent, AssetsComponent, CreateEmployerComponent, AddassetsComponent, ReadOneEmployeeComponent, ContactComponent, CreatecontactComponent, UserDashboardComponent, UserProfileComponent, UserPayrollComponent, UserLeaveComponent, UserExpenseComponent, GeneratePayrollComponent, ReportComponent, PayslipComponent, ControlComponent, FinanceComponent, CeoComponent, ApprovalComponent, TrainingComponent, TrainingApprovalComponent, TimelineComponent, TimelinelistComponent, LoanComponent, ReadLoanComponent, LoanApprovalComponent, LeaveApprovalTabComponent, LeaveTabComponent, CreateLeaveTabComponent, ProcessformComponent, MreportComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    ToastModule.forRoot(),
  ],
  entryComponents: [AddassetsComponent],
  providers: [ApiserviceService,ToastService,
    QuestionControlService,
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorServices,
      multi: true
    }]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
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

@NgModule({
  declarations: [HomeComponent, DashboardComponent, EmployeeComponent, PayrollComponent, BasicsalaryComponent, ManagesalaryComponent, ReportsalaryComponent, AssetsComponent, CreateEmployerComponent, AddassetsComponent, ReadOneEmployeeComponent, ContactComponent, CreatecontactComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  entryComponents: [AddassetsComponent],
  providers:[ApiserviceService,{
    provide:HTTP_INTERCEPTORS,
    useClass:InterceptorServices,
    multi:true
  }]
})
export class MainModule { }

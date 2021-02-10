
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
// import { DayPilotModule } from "daypilot-pro-angular";

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { JoyrideModule } from 'ngx-joyride';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from 'src/app/@pipe/search.pipe';
import { DynamicFormComponent } from 'src/app/@component/dynamic-form/dynamic-form.component';
import { TableComponent } from 'src/app/@template/table/table.component';
import { SearchboxComponent } from 'src/app/@template/searchbox/searchbox.component';
import { LoaderComponent } from 'src/app/@template/loader/loader.component';
import { BackDirective } from 'src/app/@directive/back.directive';
import { BackComponent } from 'src/app/@component/back/back.component';
import { ErrorsComponent } from 'src/app/@template/errors/errors.component';
import { SuccessComponent } from 'src/app/@template/success/success.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [DynamicFormComponent,SearchPipe,TableComponent,SearchboxComponent,LoaderComponent,BackDirective,BackComponent,SuccessComponent, ErrorsComponent],


  imports: [

    RouterModule,

    CommonModule,
    // JoyrideModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // ToastModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    })

  ], exports: [
    MDBBootstrapModulesPro,
    AgmCoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,


    FormsModule,
    NgxSkeletonLoaderModule,
    CalendarModule,
    DynamicFormComponent,SearchPipe,TableComponent,SearchboxComponent,LoaderComponent,BackDirective,BackComponent,SuccessComponent, ErrorsComponent
    //ToastModule
  ]
})
export class SharedModule { }

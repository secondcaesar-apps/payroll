
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { DayPilotModule } from "daypilot-pro-angular";

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { JoyrideModule } from 'ngx-joyride';


@NgModule({

  imports: [
    CommonModule,
    JoyrideModule.forRoot(),
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
    JoyrideModule,
    HttpClientModule,
    ReactiveFormsModule,
 

    FormsModule,
    NgxSkeletonLoaderModule,
    CalendarModule
    //ToastModule
  ]
})
export class SharedModule { }


import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { LoginComponent } from './@component/login/login.component';
import { SharedModule } from './@shared/shared/shared.module';
import { StrengthPipe } from './@pipe/strength.pipe';
import { ApiserviceService } from './@shared/apiservice.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StrengthPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
   SharedModule,
  
  ],
  providers: [MDBSpinningPreloader,ApiserviceService, ],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }


import { Component, OnInit, ɵConsole } from "@angular/core";
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';





@Component({
  selector: "app-base",
  template: ` `,

})
export class BaseComponent implements OnInit {
  baseItems: Array<any> = [];
  loading = false;
  Aoading = false;
  error: string = '';
  p: number = 0;
  a: number = 0;
  r: number = 0;
  err: string = "";
  emptys = "";
  success: any;

  searchText: any;

  constructor(public api: ApiserviceService) {

  }

  ngOnInit() {

  }
  read(item: APIENUM|string, value = {}) {
    this.loading = true;
    this.error = "";
    this.api
      .Read(item)




      .subscribe(
        (res: any) => {
        //  console.log(res);
          this.loading = false;
          this.baseItems = res.records;


        },
        (err: any) => {


          this.loading = false;

          if (err.status === 0 && err.error instanceof ProgressEvent) {
            // A client-side or network error occurred. Handle it accordingly.

            this.error = "Please check your internet";
          } else {
            this.error = err.error.message;
          }

        }
      );
  }

  special(item: APIENUM|string, value = {}) {
    this.loading = true;
    this.error = "";
    this.api
      .Special(item,value)




      .subscribe(
        (res: any) => {
          this.loading = false;
          this.baseItems = res.records;


        },
        (err: any) => {


          this.loading = false;

          if (err.status === 0 && err.error instanceof ProgressEvent) {
            // A client-side or network error occurred. Handle it accordingly.

            this.error = "Please check your internet";
          } else {
            this.error = err.error.message;
          }

        }
      );
  }


  readone(item: APIENUM, value: any) {

    this.loading = true;
    this.error = "";
    this.api
      .ReadOne(item, value)




      .subscribe(
        (res: any) => {

          this.loading = false;
          this.baseItems = res.records;


        },
        (err: any) => {


          this.loading = false;

          if (err.status === 0 && err.error instanceof ProgressEvent) {
            // A client-side or network error occurred. Handle it accordingly.

            this.error = "Please check your internet";
          } else {
            this.error = err.error.message;
          }

        }
      );
  }

  readonEmp(item: APIENUM|string) {
    let value = {EmployeeID : sessionStorage.getItem('EmpID')}

    this.loading = true;
    this.error = "";
    this.api
      .ReadOneEmployee(item, value)




      .subscribe(
        (res: any) => {

          this.loading = false;
          this.baseItems = res.records;


        },
        (err: any) => {


          this.loading = false;

          if (err.status === 0 && err.error instanceof ProgressEvent) {
            // A client-side or network error occurred. Handle it accordingly.

            this.error = "Please check your internet";
          } else {
            this.error = err.error.message;
          }

        }
      );
  }


}

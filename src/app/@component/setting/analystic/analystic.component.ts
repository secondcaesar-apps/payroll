import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { SharedService } from 'src/app/@shared/shared/shared.service';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../../base/base.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-analystic',
  templateUrl: './analystic.component.html',
  styleUrls: ['./analystic.component.scss']
})
export class AnalysticComponent extends BaseComponent implements OnInit {
  passDate: any;
  routePage = "../edit";
  apis = 'readbyperiod';
  q = ['Q1', 'Q2', 'Q3', 'Q4'];

  dates = new Date().getFullYear();
  year: any = this.dates;
  D = [this.dates - 2, this.dates - 1, this.dates, this.dates + 1, this.dates + 2];
  projectSettings: ColumnSetting[] = [

    {
      primaryKey: "DepartmentName",
      header: "Department Name",

    },

    {
      primaryKey: "FullName",
      header: "Full Name",







    },
    {
      primaryKey: "EmployeeID",
      header: "Employee ID",
      routerParams: true,







    }


    // DepartmentName: "Customer Engagement"
    // Rating: "60.0000" DepartmentName: "Personal & Business Lending  "
// Email: "hardecx@yahoo.com"
// EmployeeID: "EMP1900016"
// FullName: "Oluyemi Bamiro"


  ];
  QT: any;
  loadings: boolean;



  constructor(private shared: SharedService, public api: ApiserviceService) {

    super(api);
  }

  ngOnInit() {

  }

  getPeriod(id) {

    this.shared.getInfo().subscribe((res) => {

      if (res) {
        this.special(APIENUM.SQR, id);
      }
    })
    this.special(APIENUM.SQR, id);

  }

  qselect(event, i) {
    let val = event.target.value;
    if (i == 'Q') {

      this.QT = val;


    } else {

      this.year = val;


    }

    if (this.QT != null && this.year != null) {

      let result = this.QT + "-" + this.year;
      this.passDate = result;
      let value = { "Period": result };
      this.baseItems = null;
      this.getPeriod(value);
    }


    // console.log(event.target.value);

  }
  public captureScreen()
  {
     this.loadings = true;
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 200;
      var pageHeight = 298;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL('image/jpeg', 0.3 )
      var doc =  new jspdf('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      this.loadings = false;
         doc.save('report.pdf'); // Generated PDF
        });

}

}
// DateCreated: "2021-03-18 12:16:13"
// DepartmentID: "DPT1900009"
// Description: ""
// ID: "1"
// PostedUser: "Admin"
// Status: "Active"
// Title: "Staff Are Clear In Their Verbal And Written Communication"

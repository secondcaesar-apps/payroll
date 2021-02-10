import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { ColumnSetting } from 'src/app/models/layout.model';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent extends BaseComponent implements OnInit {
  routePage ="../../edit";
  apis=APIENUM.HOL;
  projectSettings: ColumnSetting[] = [
    {
      primaryKey: "HolidayName",
      header: "HolidayName",

    },

    {
      primaryKey: "Description",
      header: "Description",

    },
    {
      primaryKey: "HolidayID",
      header: "HolidayID",
      routerParams:true

    },

    {
      primaryKey: "HolidayDate",
      header: "Holiday Date",
      date:true


    },
    {
      primaryKey: "HolidayYear",
      header: "Holiday Year",


    },






    {
      primaryKey: "Status",
      header: "Status",
    }



  ];
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private Api: ApiserviceService
  ) {
    super(Api);
  }

  ngOnInit() {
    this.load();
  }
  load() {
    this.read(APIENUM.HOL);
  }
}

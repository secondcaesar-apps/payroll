import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  PipeTransform,
} from "@angular/core";
import { Router } from '@angular/router';
import { APIENUM } from 'src/app/@shared/enum';

import { ColumnSetting } from 'src/app/models/layout.model';

//import { ColumnSetting } from "src/app/@base/layout.model";

@Component({
  selector: "eni-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  @HostBinding("attr.class") class = "col-md-9 ml-sm-auto col-lg-10 pt-3 px-4";
  @Input() records: any[] =[];
  @Input() api: string ='';
  @Input() caption: string ='';
  @Input() error: string ='';
  @Input() func: APIENUM ;
  @Input() loading: boolean=false;
  @Input() tableShow: boolean=true;
  @Input() routePage: string ='';
  @Input() settings: ColumnSetting[]=[];
  @Input() searchText: string='';
  columnMaps: ColumnSetting[]=[];
  keys: string[]=[];

  routerId: any='';

  page = 0;
  pageSize = 2;
  collectionSize = this.records.length;

constructor(private router:Router){
  //this.refreshtable();
}

  ngOnChanges() {


    this.routerId=this.settings.findIndex(x=>x.routerParams==true);
//this.settings.find(x=>x.routerParams==true);

    if (this.settings) {
      // when settings provided
      this.columnMaps = this.settings;
    } else {
      // no settings, create column maps with defaults
      this.columnMaps = Object.keys(this.records[0]).map((key) => {
        return {
          primaryKey: key,
          header:
            key.slice(0, 1).toUpperCase() + key.replace(/_/g, " ").slice(1),
        };
      });
    }

  }
  receiveMessage($event:any) {
    this.searchText = $event;


  }

  ngAfterContentChecked() {}

  refreshtable() {
    this.records = this.records
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

 getDateTime(createdOn: any) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day: any = new Date(createdOn).getDate();
    day = day < 10 ? '0' + day : day;
    let month = months[new Date(createdOn).getMonth()];
    let year = new Date(createdOn).getFullYear();

    let hours = new Date(createdOn).getHours();
    let minutes: any = new Date(createdOn).getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;

    return `${day} ${month}, ${year}`;
  }

  search(v1,v2,v3,v4){
   this.router.navigate(['main/'+v1,v2,v3,v4])

  }
  trackByFn(index, item) {
    this.page=index
    return index; // or item.id
  }

}

import { Component, OnInit } from '@angular/core';
import {ChangeDetectionStrategy,ViewChild,TemplateRef} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Subject } from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { map } from 'rxjs/operators';
declare var $: any;
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent implements OnInit {
  events: CalendarEvent[];
  posts: any;
  
  constructor(private service:ApiserviceService) { }
 
  ngOnInit() {
   // this.tests()

this.service.Read(APIENUM.EVENT).
pipe(map((res:any)=>res.records)).subscribe((res)=>{
var array=[];
  for (let index = 0; index < res.length; index++) {
    //const element = array[index];
    array[index]=
      {
        start:  this.convertdate( res[index].StartDate),
    
        title: res[index].EventTitle,
       
      }
    
    
        


    
  }

  this.events= array;

this.tests(this.events);

})

  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();


  activeDayIsOpen: boolean = true;



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  tests(event){

   
    $("#calendar").fullCalendar({  
      header: {
          left   : 'prev,next today',
          center : 'title',
          right  : 'month,agendaWeek,agendaDay'
      },
      navLinks   : true,
      editable   : true,
      eventLimit : true,
      events: event,  // request to load current events
  });

  }

  convertdate(date:Date){
    var i =  new Date(date);
    var j=i.setDate(i.getDate()+1);
    var f=   new Date(j).toJSON().slice(0, 10);
    var t = f.split('-');
    var year = new Date().getFullYear().toString();
    t[0]=year;
    
    
  return t.join("-");


   }
}

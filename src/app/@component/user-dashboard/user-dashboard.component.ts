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
  events: CalendarEvent[]
  constructor(private service:ApiserviceService) { }

  ngOnInit() {
this.service.Read(APIENUM.EVENT).
pipe(map((res:any)=>res.records)).subscribe((res)=>{
var array=[];
  for (let index = 0; index < res.length; index++) {
    //const element = array[index];
    array[index]=
      {
        start:startOfDay( new Date(res[index].StartDate)),
        end: addDays(new Date(res[index].EndDate), 1),
        title: res[index].EventTitle,
        color: colors.red,
        actions: this.actions,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      }
    
    
        


    
  }

  this.events= array;
  console.log(this.events);

// res.forEach((element,i) => {


//   this.events[i]=
//     {
//       start: startOfDay(element.StartDate),
//       end: addDays(element.EndDate, 1),
//       title: element.EventTitle,
//       color: colors.red,
//       actions: this.actions,
//       allDay: true,
//       resizable: {
//         beforeStart: true,
//         afterEnd: true
//       },
//       draggable: true
//     }
  
  
// });

console.log(this.events);
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

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
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
}

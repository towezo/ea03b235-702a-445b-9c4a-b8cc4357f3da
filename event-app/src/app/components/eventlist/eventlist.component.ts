import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit {

//#region Variables
events: Event[] = [];
//#endregion

//#region Lifecycle
constructor( private eventService: EventsService){}

ngOnInit(){
  this.eventService.getEvents().subscribe(data => {
    this.events = data;
    console.log(data);
  });
}

//#endregion

//#region Methods
//#endregion

}

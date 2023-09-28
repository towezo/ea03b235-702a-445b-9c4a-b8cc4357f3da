import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit {

  //#region Variables
  // Variable to store the current event date
  currentEventDate: string | null = null;
  // Array to hold all the event objects fetched from the service
  events: Event[] = [];
  //#endregion

  //#region Lifecycle
  constructor( private eventService: EventsService){}

  ngOnInit(){
    // Fetching and initializing events array when component gets initialized
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }
  //#endregion

  //#region Methods
  // Any additional methods will be added here in this region
  //#endregion
}

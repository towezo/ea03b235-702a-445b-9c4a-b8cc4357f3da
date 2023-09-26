import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
//#region Variables
events: Event[] = [];
//#endregion

//#region Lifecycle
constructor(private eventService: EventsService){ 
}

ngOnInit(){
this.eventService.getEvents().subscribe(data =>{
  this.events = data as Event[];
})
}
//#endregion

//#region Methods
//#endregion

}

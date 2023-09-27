import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event.model';
import { CartService } from 'src/app/services/cart.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
//#region Variables
currentEventDate: string | null = null;
events: Event[] = [];
filteredEvents: Event[] = [];
sortAscending: boolean = true;
//#endregion

//#region Lifecycle
constructor(private eventService: EventsService, private cartService: CartService, private searchService: SearchService){ 
}

ngOnInit(){
  this.eventService.getEvents().subscribe(data => {
    this.events = data as Event[];
    this.filteredEvents = this.events; // Wenn noch nichts gesucht wurde, zeigen Sie alle Events an
    this.sortEvents();
  });

  // Abonnieren Sie den SearchService, um auf Änderungen der Suchbegriffe zu reagieren
  this.searchService.search$.subscribe(searchTerm => {
    if (searchTerm) {
      this.filteredEvents = this.events.filter(event => 
        event.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredEvents = this.events; // Wenn der Suchbegriff leer ist, zeigen Sie alle Events an
    }
  });
}
//#endregion

//#region Methods
sortEvents() {
  this.filteredEvents.sort((a: Event, b: Event) => {
    const aTime = a.startTime ? new Date(a.startTime).getTime() : 0;
    const bTime = b.startTime ? new Date(b.startTime).getTime() : 0;
    
    if (this.sortAscending) {
      return aTime - bTime;
    } else {
      return bTime - aTime;
    }
  });
}

addToCart(event: Event) {
  this.cartService.add(event);
  this.filteredEvents = this.filteredEvents.filter(e => e !== event);
}

toggleSort() {
  this.sortAscending = !this.sortAscending; // Umschalten der Sortierrichtung
  this.sortEvents(); // Erneutes Sortieren der Events
}

setCurrentEventDate(date: string | undefined) {
  console.log("Setting date: ", date); 
  if (date) {
    this.currentEventDate = new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: '2-digit', 
      year: 'numeric'
    }).toUpperCase(); 
    console.log("Set currentEventDate to: ", this.currentEventDate); 
  } else {
    this.currentEventDate = null;
  }
}

//#endregion

}

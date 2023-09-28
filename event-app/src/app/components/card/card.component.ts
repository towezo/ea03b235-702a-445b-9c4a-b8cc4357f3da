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
  // Variable to store the current event date
  currentEventDate: string | null = null;
  // Array to store all the events
  events: Event[] = [];
  // Array to store the filtered events based on search term
  filteredEvents: Event[] = [];
  // Boolean variable to determine the sorting order
  sortAscending: boolean = true;
  //#endregion

  //#region Lifecycle
  constructor(
    private eventService: EventsService, 
    private cartService: CartService, 
    private searchService: SearchService
  ){}

  ngOnInit(){
    // Fetching events and initializing filteredEvents array on component initialization
    this.eventService.getEvents().subscribe(data => {
      this.events = data as Event[];
      this.filteredEvents = this.events; // Show all events if no search has been made
      this.sortEvents();
    });

    // Subscribing to the SearchService to react to changes in the search term
    this.searchService.search$.subscribe(searchTerm => {
      if (searchTerm) {
        // Filter events based on search term
        this.filteredEvents = this.events.filter(event => 
          event.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        this.filteredEvents = this.events; // Show all events if the search term is empty
      }
    });
  }
  //#endregion

  //#region Methods
  sortEvents() {
    // Sort events based on start time in ascending or descending order
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
    // Add the selected event to the cart and filter it out from the available events
    this.cartService.add(event);
    this.filteredEvents = this.filteredEvents.filter(e => e !== event);
  }

  toggleSort() {
    this.sortAscending = !this.sortAscending; // Toggle the sorting direction
    this.sortEvents(); // Re-sort the events
  }

  setCurrentEventDate(date: string | undefined) {
    if (date) {
      // Set the currentEventDate to a formatted string representation of the date
      this.currentEventDate = new Date(date).toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: '2-digit', 
        year: 'numeric'
      }).toUpperCase(); 
    } else {
      this.currentEventDate = null;
    }
  }
  //#endregion
}

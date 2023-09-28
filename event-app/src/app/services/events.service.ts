import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Indicates that this service should be created by the root application injector.
})
export class EventsService {
  //#region Variables
  // The URL from where the events data will be fetched.
  private url= 'https://teclead-ventures.github.io/data/london-events.json ';
  //#endregion 

  //#region Lifecycle
  // Constructor to instantiate the service, injecting HttpClient for making HTTP requests.
  constructor(private httpClient: HttpClient ) { }
  //#endregion

  //#region Methods
  // Method to fetch events from the specified URL.
  // It returns an Observable emitting the array of Event objects fetched from the API.
  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.url);
  }
  //#endregion
}

import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  //#region variables
  private url= 'https://teclead-ventures.github.io/data/london-events.json ';
  //#endregion 

  //#region lifecycle

  constructor(private httpClient: HttpClient ) { }
//#endregion

//#region Methods
getEvents(): Observable<Event[]> {
  return this.httpClient.get<Event[]>(this.url);
}

//#endregion
}

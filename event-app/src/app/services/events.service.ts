import { Injectable } from '@angular/core';

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


//#endregion
}

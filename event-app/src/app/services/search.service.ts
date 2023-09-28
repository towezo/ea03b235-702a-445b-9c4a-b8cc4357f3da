import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // This service is provided in the root level and is available throughout the app.
})
export class SearchService {
  // Initializing searchSubject as a BehaviorSubject with an initial value of an empty string.
  private searchSubject = new BehaviorSubject<string>('');

  // Exposing search$ as an observable for other components or services to subscribe to.
  search$ = this.searchSubject.asObservable();

  // Method to update the search term. It emits the new term to all subscribers of searchSubject.
  setSearchTerm(term: string) {
    this.searchSubject.next(term); // Emits the new search term to the subscribers
  }
}

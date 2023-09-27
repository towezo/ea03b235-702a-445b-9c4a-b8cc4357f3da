import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  private cartItems: Event[] = [];
  private cartSubject = new BehaviorSubject<Event[]>([]);

  cart$ = this.cartSubject.asObservable();

// CartService
add(item: Event) {
  this.cartItems.push(item);
  this.cartSubject.next(this.cartItems);
  this.cartItemCountSubject.next(this.cartItems.length); // Hier aktualisieren Sie den cartItemCountSubject mit der neuen Länge von cartItems.
}


  constructor() { }

  
}

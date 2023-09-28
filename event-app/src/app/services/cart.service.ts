import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // This service will be provided in the root module, meaning it’s a singleton.
})
export class CartService {
  // BehaviorSubject to hold the count of items in the cart. It will emit the initial value of 0 to any new subscribers.
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  
  // Observable created from cartItemCountSubject to expose the cart item count to other components.
  cartItemCount$ = this.cartItemCountSubject.asObservable(); 
  
  // Array to hold the actual cart items.
  private cartItems: Event[] = [];
  
  // BehaviorSubject to hold the array of cart items. It will emit the initial value of an empty array to any new subscribers.
  private cartSubject = new BehaviorSubject<Event[]>([]);
  
  // Observable created from cartSubject to expose the cart items to other components.
  cart$ = this.cartSubject.asObservable();

  // Method to add an item to the cart. It updates both cartItems array and cartItemCountSubject.
  add(item: Event) {
    this.cartItems.push(item); // Adding item to the cartItems array.
    this.cartSubject.next(this.cartItems); // Emitting the new cartItems array to the subscribers.
    this.cartItemCountSubject.next(this.cartItems.length); // Emitting the new length of cartItems array to the subscribers.
  }

  constructor() { } // Standard constructor for the service.
}

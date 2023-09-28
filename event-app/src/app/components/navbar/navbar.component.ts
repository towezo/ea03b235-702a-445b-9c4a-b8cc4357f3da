import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { SearchService } from 'src/app/services/search.service';
import { Event as AppEvent } from 'src/app/models/event.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showCartPopup = false; // State for showing or hiding the cart popup
  cartItems$: Observable<AppEvent[]>; // Observable for cart items
  cartItemCount: number | undefined; // Holds the count of items in the cart

  //#region Lifecycle
  constructor(private searchService: SearchService, private cartService: CartService) {
    this.cartItems$ = this.cartService.cart$; // Initializing cartItems$ with cartService's Observable
    this.cartService.cartItemCount$.subscribe(count => this.cartItemCount = count); // Subscribing to the cart item count and updating the local variable accordingly
  }
  //#endregion

  //#region Methods
  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement; // Grabbing the target input element from the event
    this.searchService.setSearchTerm(target.value); // Setting the search term in search service on input change
  }

  toggleCartPopup() {
    this.showCartPopup = !this.showCartPopup; // Toggling the state of cart popup on function call
  }
  //#endregion
}

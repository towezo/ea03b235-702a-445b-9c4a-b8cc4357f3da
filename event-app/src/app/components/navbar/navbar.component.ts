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
  @Output() toggleSort = new EventEmitter<void>();
  
  showCartPopup = false;
  cartItems$: Observable<AppEvent[]>;
  cartItemCount: number | undefined;

//#region Lifecycle
constructor(private searchService: SearchService, private cartService: CartService) {
  this.cartItems$ = this.cartService.cart$;
  this.cartService.cartItemCount$.subscribe(count => this.cartItemCount = count);
}
//#endregion

//#region Methods
onSearchChange(event: Event) {
  const target = event.target as HTMLInputElement;
  this.searchService.setSearchTerm(target.value);
}

toggleCartPopup() {
  this.showCartPopup = !this.showCartPopup;
}

sortEvents() {
  this.toggleSort.emit(); // Emit Event
}

//#endregion

}

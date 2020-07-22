import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { StorageKey } from 'shared/models/storage.model';
import { AuthService } from 'shared/services/auth.service';
import { StorageService } from 'shared/services/storage.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  cartItemCount: number;
  shoppingCartId: string;
  subscription: Subscription;
  letters = [
    'А',
    'Б',
    'В',
    'Г',
    'Д',
    'Е',
    'Ё',
    'Ж',
    'З',
    'И',
    'Й',
    'К',
    'Л',
    'М',
    'Н',
    'О',
    'П',
    'Р',
    'С',
    'Т',
    'У',
    'Ф',
    'Х',
    'Ц',
    'Ч',
    'Ш',
    'Щ',
    'Ъ',
    'Ы',
    'Ь',
    'Э',
    'Ю',
    'Я',
  ];

  constructor(
    private storageService: StorageService,
    public media: MediaObserver,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    // this.shoppingCartId = this.storageService.read(SHOPPING_CART_ID);

    // if (this.shoppingCartId) {
    //   this.cart = await this.cartService.getCartById(this.shoppingCartId);
    // }

    // if (!this.cart) this.cartItemCount = 0;
    // else this.cartItemCount = this.cart.items.length;

    // this.subscription = this.cartService
    //   .getCartChangeEmitter()
    //   .subscribe((shoppingCart) => {
    //     this.cart = shoppingCart;
    //     this.cartItemCount = this.cart.items.length || 0;
    //   });
  }

  ngOnDestroy() {
  //  this.subscription.unsubscribe();
  }
}

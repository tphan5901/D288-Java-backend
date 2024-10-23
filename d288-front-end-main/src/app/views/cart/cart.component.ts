
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartItem } from 'src/app/model/cart-item';
import { CartCartItemsApiResponse } from 'src/app/model/cart-cart-items-api-response';
import { Vacation } from 'src/app/model/vacation';
import { Excursion } from 'src/app/model/excursion';
import { CartItemExcursionsApiResponse } from 'src/app/model/cart-item-excursions-api-response';
import { PurchaseApiResponse } from 'src/app/model/purchase-api-response';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItemsUrl = "http://localhost:8080/api/carts/2/cartItems";
  checkoutUrl = "http://localhost:8080/api/checkout/purchase";

  cartItems: CartItem[] = [];
  vacations: Set<Vacation> = new Set();
  bag_total: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) { } 

  ngOnInit(): void {
    this.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems
      this.cartItems.forEach(async item => {
        this.http.get<Vacation>(item._links.vacation.href).subscribe(async response => {
          this.http.get<CartItemExcursionsApiResponse>(item._links.excursions.href).subscribe(async response2 => {
            response.excursions = response2._embedded.excursions;
            this.vacations.forEach(vac => {
              if (vac.vacation_title === response.vacation_title) {
                if (vac.excursions != undefined && response.excursions != undefined) {
                  vac.excursions.push(response.excursions[0]);
                  
                }
                response = vac;
              }
            });
            this.vacations.add(response);
            this.bag_total = this.sum(this.vacations);
          });
        });
      });
    });
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartCartItemsApiResponse>(this.cartItemsUrl)
      .pipe(
        map(response => response._embedded.cartItems)
      );
  }

  sum(vacations: Set<Vacation>): number {
    let sum_price = 0;
    vacations.forEach(vacation => {
      sum_price += vacation.travel_price;
      vacation.excursions?.forEach(excursion => {
        sum_price += excursion.excursion_price;
      });
    });
    return sum_price;
  }

  checkout() {

    let splitCartHref = this.cartItems[0]._links.cart.href.split('/');
    console.log(this.cartItems[0]._links.cart.href);
    let cartId = 2
    
    console.log(splitCartHref);

    let purchase = {
      cart: {
          id: cartId,
          orderTrackingNumber: null,
          package_price: null,
          party_size: 0,
          create_date: null,
          last_update: null,
          customer: {
              id: 2,
              firstName: null,
              lastName: null,
              address: null,
              postal_code: "12345",
              phone: null,
              create_date: null,
              last_update: null
          }
      },
      cartItems: [],
      customer: {
          id: 2,
          firstName: null,
          lastName: null,
          address: null,
          postal_code: "12345",
          phone: null,
          create_date: null,
          last_update: null
      }
    }

    this.http.post<PurchaseApiResponse>(this.checkoutUrl, purchase).subscribe(response => {
      let successString = "Checkout complete!\n\nOrder Tracking Number: " + response.orderTrackingNumber;
      alert(successString);
    });

    this.cartItems = [];
    this.vacations = new Set();
    this.bag_total = 0;

  }

}

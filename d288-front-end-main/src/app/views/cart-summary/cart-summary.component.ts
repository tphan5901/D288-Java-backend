import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CartCartItemsApiResponse } from 'src/app/model/cart-cart-items-api-response';
import { CartItem } from 'src/app/model/cart-item';
import { CartItemExcursionsApiResponse } from 'src/app/model/cart-item-excursions-api-response';
import { Customer } from 'src/app/model/customer';
import { PurchaseApiResponse } from 'src/app/model/purchase-api-response';
import { Vacation } from 'src/app/model/vacation';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItemsUrl = "http://localhost:8080/api/carts/2/cartItems";
  checkoutUrl = "http://localhost:8080/api/checkout/purchase";
  customerUrl = "http://localhost:8080/api/customers/2";

  cartItems: CartItem[] = [];
  vacations: Set<Vacation> = new Set();
  bag_total: number = 0;
  customer: Customer = new Customer(1, "123 Easy St", "55555", "John", "Doe", "(555)555-5555")

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
                  this.bag_total = this.sum(this.vacations);
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
    this.getCustomer().subscribe(customer => this.customer = customer);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartCartItemsApiResponse>(this.cartItemsUrl)
      .pipe(
        map(response => response._embedded.cartItems)
      );
  }

  getCustomer(): Observable<Customer> {
    return this.http.get<Customer>(this.customerUrl);
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

}

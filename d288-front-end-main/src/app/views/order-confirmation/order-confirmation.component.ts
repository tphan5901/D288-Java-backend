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

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  cartItemsUrl = "http://localhost:8080/api/carts/2/cartItems";
  checkoutUrl = "http://localhost:8080/api/checkout/purchase";
  customerUrl = "http://localhost:8080/api/customers/2";

  cartItems: CartItem[] = [];
  vacations: Set<Vacation> = new Set();
  bag_total: number = 0;
  customer: Customer = new Customer(2, "123 Easy St", "55555", "John", "Doe", "(555)555-5555")

  orderTrackingNumber: string = ""

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
          });
        });
      });
    });
    this.getCustomer().subscribe(customer => this.customer = customer);
    this.checkout();
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
  
  checkout() {

    console.log(this.cartItems);

    //let splitCartHref = this.cartItems[0]._links.cart.href.split('/');
    //console.log(this.cartItems[0]._links.cart.href);
    let cartId = 2
    
    //console.log(splitCartHref);

    let purchase = {
      cart: {
          id: cartId,
          orderTrackingNumber: null,
          package_price: null,
          party_size: 0,
          create_date: null,
          last_update: null,
          customer: {
            id: this.customer.id,
            firstName: this.customer.firstName,
            lastName: this.customer.lastName,
            address: this.customer.address,
            postal_code: this.customer.postal_code,
            phone: this.customer.phone,
            create_date: null,
            last_update: null
          }
      },
      cartItems: [],
      customer: {
          id: this.customer.id,
          firstName: this.customer.firstName,
          lastName: this.customer.lastName,
          address: this.customer.address,
          postal_code: this.customer.postal_code,
          phone: this.customer.phone,
          create_date: null,
          last_update: null
      }
    }

    this.http.post<PurchaseApiResponse>(this.checkoutUrl, purchase).subscribe(response => {
      this.orderTrackingNumber = response.orderTrackingNumber;
    });

    this.cartItems = [];
    this.vacations = new Set();
    this.bag_total = 0;

    this.deleteAllCartItems(cartId);

  }

  deleteAllCartItems(cartId: number) {
    
    this.http.get<CartCartItemsApiResponse>(this.cartItemsUrl)
    .pipe(
      map(response => response._embedded.cartItems)
    ).subscribe(cartItems => {
      cartItems.forEach(cartItem => {
        this.http.delete(cartItem._links.self.href).subscribe();
      });
    });

  }

}

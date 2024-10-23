
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';

import { Excursion } from 'src/app/model/excursion';
import { CartItemPostApiResponse } from 'src/app/model/cart-item-post-api-response';
import { CartItem } from 'src/app/model/cart-item';

@Component({
  selector: 'app-excursion-detail',
  templateUrl: './excursion-detail.component.html',
  styleUrls: ['./excursion-detail.component.css']
})
export class ExcursionDetailComponent implements OnInit {

  vacationUrl = 'http://localhost:8080/api/vacations';
  cartItemsUrl = 'http://localhost:8080/api/cartItems';
  cartUrl = 'http://localhost:8080/api/carts'

  excursion: Excursion = new Excursion("", 0, "", new Date(), new Date(), { self: { href: "" }});

  vacationId: number = 0;
  excursionId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.vacationId = +this.route.snapshot.paramMap.get('vacationId')!;
    this.excursionId = +this.route.snapshot.paramMap.get('excursionId')!;
    this.getExcursion(this.vacationId, this.excursionId).subscribe(excursion => this.excursion = excursion);
  }

  getExcursion(vacationId: number, excursionId: number): Observable<Excursion> {
    return this.http.get<Excursion>(`${this.vacationUrl}/${vacationId}/excursions/${excursionId}`);
  }

  async addToCart(excursionId: number, vacationId: number) {
    let cartItem = {
      vacation: this.vacationUrl + "/" + vacationId,
      cart: this.cartUrl + "/" + 2
    }

    this.http.post<CartItemPostApiResponse>(this.cartItemsUrl, cartItem).subscribe(async response => {
      let cartItemHref = response._links.self.href;
      this.http.put("http://localhost:8080/api/excursions/" + excursionId + "/cartItems", cartItemHref, {
        headers: {
          "Content-Type": "text/uri-list"
        }
      }).subscribe(response => console.log(response));
    });

  }

}

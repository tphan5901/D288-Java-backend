
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Country } from 'src/app/model/country';
import { CountryApiResponse } from 'src/app/model/country-api-response';

import { Customer } from 'src/app/model/customer';
import { Division } from 'src/app/model/division';
import { DivisionApiResponse } from 'src/app/model/division-api-response';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customerUrl = 'http://localhost:8080/api/customers';
  countryUrl = 'http://localhost:8080/api/countries';
  divisionUrl = 'http://localhost:8080/api/divisions';

  countries: Country[] = [];
  divisions: Division[] = [];

  countryChoice: Country = new Country("", {self: {href: ""}});
  divisionChoice: Division = new Division("", {country: {href: ""}, self: {href: ""}});

  addUserForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    address: '',
    postal_code: '',
    phone: '',
    country: '',
    division: ''
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getCountries().subscribe(countries => this.countries = countries);
    this.getDivisions().subscribe(divisions => this.divisions = divisions);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<CountryApiResponse>(this.countryUrl)
      .pipe(
        map(response => response._embedded.countries)
      )
  }

  getDivisions(): Observable<Division[]> {
    return this.http.get<DivisionApiResponse>(this.divisionUrl)
      .pipe(
        map(response => response._embedded.divisions)
      )
  }

  getDivisionsByCountryId(country: Country): Division[] {
    return this.divisions.filter(d => {
      return parseInt(d._links.country.href.split("/")[5]) === parseInt(country._links.self.href.split("/")[5]);
    });
  }

  onSubmit() {
    let customerObjFromForm = this.addUserForm.value;
    let customer = {
      firstName: customerObjFromForm.firstName,
      lastName: customerObjFromForm.lastName,
      address: customerObjFromForm.address,
      postal_code: customerObjFromForm.postal_code,
      phone: customerObjFromForm.phone,
      country: this.countryChoice._links.self.href,
      division: this.divisionChoice._links.self.href
    }

    this.http.post(this.customerUrl, customer).subscribe();

    this.router.navigate(["/customer"])
  }

}

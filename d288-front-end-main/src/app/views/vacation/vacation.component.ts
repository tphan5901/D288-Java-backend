import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VacationApiResponse } from '../../model/vacation-api-reponse';
import { Vacation } from '../../model/vacation';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {

  vacationUrl = 'http://localhost:8080/api/vacations';

  vacations: Vacation[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getVacations().subscribe(vacations => {
      vacations.forEach(vacation => {
        let parsedId = vacation._links.self.href.split("/")[5];
        vacation.id = parseInt(parsedId);
      }); 
      this.vacations = vacations
    });
  }

  getVacations(): Observable<Vacation[]> {
    return this.http.get<VacationApiResponse>(this.vacationUrl)
      .pipe(
        map(response => response._embedded.vacations)
      )
  }

}

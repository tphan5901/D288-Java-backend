
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Excursion } from '../../model/excursion';
import { ExcursionApiResponse } from 'src/app/model/excursion-api-response';

@Component({
  selector: 'app-excursion',
  templateUrl: './excursion.component.html',
  styleUrls: ['./excursion.component.css']
})
export class ExcursionComponent implements OnInit {

  vacationUrl = 'http://localhost:8080/api/vacations';

  excursions: Excursion[] = [];

  vacationId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.vacationId = +this.route.snapshot.paramMap.get('vacationId')!;
    this.getExcursions(this.vacationId).subscribe(excursions => {
      excursions.forEach(excursion => {
        let parsedId = excursion._links.self.href.split("/")[5];
        excursion.id = parseInt(parsedId);
      });
      this.excursions = excursions;
    });
  }

  getExcursions(vacationId: number): Observable<Excursion[]> {
    return this.http.get<ExcursionApiResponse>(`${this.vacationUrl}/${vacationId}/excursions`)
        .pipe(
          map(response => response._embedded.excursions)
        );
  }

}

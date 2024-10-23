
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { map, Observable } from 'rxjs';

import { Vacation } from '../../model/vacation';

@Component({
  selector: 'app-vacation-detail',
  templateUrl: './vacation-detail.component.html',
  styleUrls: ['./vacation-detail.component.css']
})
export class VacationDetailComponent implements OnInit {

  vacationUrl = 'http://localhost:8080/api/vacations';

  vacation: Vacation = new Vacation("", "", 0, "", new Date(), new Date(), { self: { href: "" }});

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let vacationId = +this.route.snapshot.paramMap.get('vacationId')!;
    this.getVacation(vacationId).subscribe(vacation => this.vacation = vacation);
  }

  getVacation(vacationId: number): Observable<Vacation> {
    return this.http.get<Vacation>(`${this.vacationUrl}/${vacationId}`)
        .pipe(
          map(vacation => {
            let parsedId = vacation._links.self.href.split("/")[5];
            vacation.id = parseInt(parsedId);
            return vacation;
          })
        )
  }

}

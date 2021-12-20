import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private readonly GENERAL = '/match';

  constructor(private http: HttpClient, private router: Router) {
  }

  createMatch(form: FormGroup): Observable<any> {
    return this.http.post(`${this.GENERAL}`, form);
  }
}

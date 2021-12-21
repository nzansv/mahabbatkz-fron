import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {observable, Observable} from 'rxjs';
import {MatchModel} from '../model/Match.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private readonly GENERAL = '/business/match';

  constructor(private http: HttpClient, private router: Router) {
  }

  createMatch(matchModel: { receiverId: number; senderEmail: string }): Observable<any> {
    return this.http.post(`${this.GENERAL}`, matchModel);
  }

  getMyMatchRequests(email: any): Observable<any> {
    return this.http.get(`${this.GENERAL}/waiting-me/${email}`);
  }

  getMyMatches(email: any): Observable<any> {
    return this.http.get(`${this.GENERAL}/myMatches/${email}`);
  }

  answerToMatch(email: any, id: number, status: string): Observable<string> {
    return this.http.get(`${this.GENERAL}/notification-respond?receiverId=${id}&email=${email}&status=${status}`,
        {responseType: 'text'} ).pipe(
            map((response) => {
              console.log(response);
              return response;
            })
    );
  }
}

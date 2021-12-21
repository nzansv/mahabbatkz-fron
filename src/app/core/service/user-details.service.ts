import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private readonly GENERAL = '/business//user-detail';

  constructor(private http: HttpClient, private router: Router) {
  }

  getUserDetailsById(id: number): Observable<any> {
    return this.http.get(`${this.GENERAL}/${id}`);
  }

}

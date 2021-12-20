import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly GENERAL = '/business/user';
  private readonly GENERAL_USER_DETAIL = '/business/user-detail';

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.GENERAL}/all`);
  }

  getUserDetailsById(id: number): Observable<any> {
    return this.http.get(`${this.GENERAL_USER_DETAIL}/${id}`);
  }

  getRecommendList(email: any): Observable<any> {
    return this.http.get(`${this.GENERAL_USER_DETAIL}/recommend-email/${email}`);
  }
}

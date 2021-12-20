import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import {UserModel} from '../model/User.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
    public email: string;

  private readonly GENERAL = '/auth';

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

    public get currentUserValueEmail(): string {
        return this.email;
    }
  public setCrurrentUser(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  register(form: FormGroup): Observable<any> {
    return this.http.post(`${this.GENERAL}/user`, form);
  }

    // const loggedUserObject: any = user;
    // const userData: any = jwt_decode(loggedUserObject.headers.get('authorization'));
    // console.log('header ===>', loggedUserObject.headers.get('authorization'))
    // const loggedUser: UserModel = new UserModel();
    // loggedUser.id = userData.id;
    // loggedUser.email = userData.email;
    // this.currentUserSubject.next(loggedUser);

  public login(username: string, password: string): void {
    const loginData = new FormData();
      this.http
          .get<any>(`${this.GENERAL}/login?username=${username}&password=${password}`, {observe: 'response'})
          .subscribe(resp => {
              const token = resp.headers.get('Authorization');
              const userData: any = jwt_decode(token.substr(7));
              const loggedUser: UserModel = new UserModel();
              loggedUser.email = userData.sub;
              this.email = loggedUser.email;
              loggedUser.token = token.substr(7);
              this.currentUserSubject.next(loggedUser);
          });
  }
    public logout(): void {
      this.setCrurrentUser(null);
      this.email = null;
      this.router.navigateByUrl('/landing')
    }
}

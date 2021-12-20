import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  // checkLogin(url: string): boolean|UrlTree {
  //   // Store the attempted URL for redirecting
  //   this.authService.redirectUrl = url;
  //
  //   if (localStorage.getItem('userId') === null || !localStorage.getItem('userId')) {
  //     this.router.navigateByUrl('/auth/login');
  //     return false;
  //   }
  //   return true;
  // }
}

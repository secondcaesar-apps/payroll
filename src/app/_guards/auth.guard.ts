import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper:JwtHelperService = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate   {
 
  constructor(
    private router: Router,

  ) { }

  canActivate() {

    const helper = new JwtHelperService();
 
  
    const isExpired = helper.isTokenExpired(sessionStorage.getItem('jwt'));

 

    if (isExpired) {
      this.router.navigate(['']);
      sessionStorage.clear();
      return false;
    } else {
      return true;
    }
  }

}

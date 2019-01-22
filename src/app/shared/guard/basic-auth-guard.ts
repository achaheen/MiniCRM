import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../../environments/environment";
import {Permissions} from "../model/permissions";

export abstract class BasicAuthGuard {
  constructor(public router: Router, public jwtHelper: JwtHelperService) {
  }

  abstract canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot);


  protected isLoggedIn(): boolean {
    let token: string = localStorage.getItem(environment.tokenName);
   // console.log(this.jwtHelper.decodeToken(token));
    console.log(this.jwtHelper.getTokenExpirationDate(token));
    //console.log('Checking if current user is logged in using token : '+token);
    let isExpired: boolean = this.jwtHelper.isTokenExpired(token);
    console.log('is token expired? ' + isExpired);
    return !isExpired;
  }

  protected validateRole(role: string): boolean {

    let found: boolean = false;
    if (localStorage.getItem(environment.authorities) != null) {
      let roles: Permissions [] = JSON.parse(localStorage.getItem(environment.authorities));
      return roles.some(value => {
        if (value.permission === role)
          return true;
      });
    }
    //console.log(`Role ${role} is not allowed to user`);
    return found;


  }
}

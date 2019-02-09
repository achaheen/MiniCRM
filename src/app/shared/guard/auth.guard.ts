import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BasicAuthGuard} from './basic-auth-guard';

@Injectable()
export class AuthGuard extends BasicAuthGuard {
  constructor(router: Router, jwtHelper: JwtHelperService) {
    super(router, jwtHelper);
  }

  canActivate() {
    if (this.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

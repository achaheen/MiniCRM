import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {routerTransition} from '../router.animations';
import {AuthenticationService} from "../shared/services/authentication.service";
import {AuthResponse} from "../shared/model/auth-response";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loading: boolean;

  constructor(
    private translate: TranslateService,
    public router: Router, private  authService: AuthenticationService) {

    let lang = localStorage.getItem(environment.language);
    console.log('checking user language');
    if (lang == null || lang === '') {
      console.log('no lang found setting value as default');
      lang = 'en';
      localStorage.setItem(environment.language, lang);
    }
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang(lang);
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|ar/) ? browserLang : lang);
  }

  ngOnInit() {
  }

  login() {
    console.log('Attempting Authentication for username:' + this.username);
    this.authService.authenticate(this.username, this.password).subscribe(data => {
      this.loading = true;
      console.log(`user logged in successfully ${JSON.stringify(data)}`);
      const response = data as AuthResponse;

      localStorage.setItem(environment.tokenName, response.token);
      localStorage.setItem(environment.currentUser, JSON.stringify(response.user));
      localStorage.setItem(environment.authorities, JSON.stringify(response.user.authorities));

      this.router.navigate(['blank-page']);
    }, error1 => {
      this.loading = false;
      // auth failed show some errors to user
    });
  }
}

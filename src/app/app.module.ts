import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';


// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
  /* for development
  return new TranslateHttpLoader(
      http,
      '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
      '.json'
  ); */
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

/**
 * Added by Ahmed Shaheen
 *This function used by the authentication provider to get the access token from local storage
 * @returns {string}
 */
export function tokenGetter() {
  return localStorage.getItem(environment.tokenName);
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        throwNoTokenError: false,
        whitelistedDomains: ['localhost:8080'],
        skipWhenExpired: true

      }
    }),
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username: string, password: string) {
    const authCred = {username: username, password: password};
    const apiURL = environment.apiUrl + 'auth';
    return this.httpClient.post(apiURL, authCred);
  }
}

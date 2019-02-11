import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export abstract class BasicHttpService {
  public baseURL = '';
  public baseURLAuthorized: string = environment.apiUrl + 'authorized/';

  protected constructor(public httpClient: HttpClient) {

  }

  all() {

  }

  authorized(request) {

  }

  edit(request) {

  }

  delete(request) {
  }
}

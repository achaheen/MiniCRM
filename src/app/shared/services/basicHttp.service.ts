 import {HttpClient} from '@angular/common/http';

export abstract class BasicHttpService {
  public baseURL = '';

  protected constructor(public httpClient: HttpClient) {

  }

  all() {

  }

  authorized(parent) {

  }

  edit() {

  }

  delete() {
  }
}

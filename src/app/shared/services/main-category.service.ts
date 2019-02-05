import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MainCategory} from '../model/mainCategory';
import {BasicHttpService} from './basicHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MainCategoryService extends BasicHttpService {


  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.baseURL = environment.apiUrl + 'categories/';
  }

  all() {
    return this.httpClient.get<MainCategory[]>(this.baseURL + 'all');
  }
  active() {

  }
  authorized() {
    return this.httpClient.get<MainCategory[]>(this.baseURL + 'authorized');
  }
}

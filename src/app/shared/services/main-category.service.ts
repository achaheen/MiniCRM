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

  create(request) {
    return this.httpClient.post<MainCategory[]>(this.baseURL + 'create', request);
  }

  edit(request) {
    return this.httpClient.post<MainCategory[]>(this.baseURL + 'edit', request);
  }

  delete(request) {
    return this.httpClient.post<MainCategory[]>(this.baseURL + 'delete', request);
  }

  active() {
    return this.httpClient.get<MainCategory[]>(this.baseURL + 'active');

  }

  authorized() {
    return this.httpClient.get<MainCategory[]>(this.baseURL + 'authorized');
  }

  changeStatus(mainCat, newStatus) {
    return this.httpClient.get<MainCategory[]>(this.baseURL + `change/${mainCat}/${newStatus}`);
  }
}

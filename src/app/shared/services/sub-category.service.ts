import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subcategory} from '../model/subcategory';
import {BasicHttpService} from './basicHttp.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends BasicHttpService {


  constructor(
    httpClient: HttpClient) {
    super(httpClient);
    this.baseURL =
      environment.apiUrl + 'subcategories/';
  }

  all() {
    return this.httpClient.get<Subcategory[]>(this.baseURL + 'all');
  }
  active(mainCat) {
    return this.httpClient.get<Subcategory[]>(this.baseURL + 'active/'+mainCat);
  }

  authorized(parent) {
    if (parent === undefined || parent == null || parent === '') {
      return this.httpClient.get<Subcategory[]>(this.baseURL + `authorized`);
    } else {
      return this.httpClient.get<Subcategory[]>(this.baseURL + `authorized/${parent}`);
    }
  }

}

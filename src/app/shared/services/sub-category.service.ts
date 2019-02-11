import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subcategory} from '../model/subcategory';
import {BasicHttpService} from './basicHttp.service';
import {MainCategory} from '../model/mainCategory';
import {Topic} from '../model/topic';

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
    return this.httpClient.get<Subcategory[]>(this.baseURL + 'active/' + mainCat);
  }

  allByMainCat(mainCat) {
    return this.httpClient.get<Subcategory[]>(this.baseURL + 'all/' + mainCat);
  }

  authorized(request) {
    return this.httpClient.post<Topic[]>(this.baseURLAuthorized + 'subCats', request);
  }

 /* authorized(parent) {
    if (parent === undefined || parent == null || parent === '') {
      return this.httpClient.get<Subcategory[]>(this.baseURL + `authorized`);
    } else {
      return this.httpClient.get<Subcategory[]>(this.baseURL + `authorized/${parent}`);
    }
  }*/

  changeStatus(subCat, newStatus) {
    return this.httpClient.get<Subcategory[]>(this.baseURL + `change/${subCat}/${newStatus}`);
  }
  edit(request) {
    return this.httpClient.post<Subcategory[]>(this.baseURL + `edit`, request);
  }
  create(request) {
    return this.httpClient.post<Subcategory[]>(this.baseURL + `create`, request);
  }

}

import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Topic} from '../model/topic';
import {BasicHttpService} from './basicHttp.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService extends BasicHttpService {


  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.baseURL = environment.apiUrl + 'topics/';

  }

  all() {
    return this.httpClient.get<Topic[]>(this.baseURL + 'all');
  }

  active(subcat) {
    return this.httpClient.get<Topic[]>(this.baseURL + 'active/' + subcat);
  }

  activeByMainCat(mainCat) {
    return this.httpClient.get<Topic[]>(this.baseURL + 'active/mainCat/' + mainCat);
  }


  authorized(request) {
    return this.httpClient.post<Topic[]>(this.baseURLAuthorized + 'topics', request);
  }


  changeStatus(topic, newStatus) {
    return this.httpClient.get<Topic[]>(this.baseURL + `change/${topic}/${newStatus}`);
  }
  edit(request) {
    return this.httpClient.post<Topic[]>(this.baseURL + `edit`, request);
  }
  create(request) {
    return this.httpClient.post<Topic[]>(this.baseURL + `create`, request);
  }
}

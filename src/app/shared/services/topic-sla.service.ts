import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BasicHttpService} from './basicHttp.service';
import {TopicSla} from '../model/topicSla';

@Injectable({
  providedIn: 'root'
})
export class TopicSlaService extends BasicHttpService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.baseURL = environment.apiUrl + 'topicSLA/';
  }

  all() {
    return this.httpClient.get<TopicSla[]>(this.baseURL + 'all');
  }

  getByTopic(topic) {
    return this.httpClient.get<TopicSla[]>(this.baseURL + 'topic/' + topic);
  }

  edit(request) {
    return this.httpClient.post<TopicSla[]>(this.baseURL + `edit`, request);
  }

  create(request) {
    return this.httpClient.post<TopicSla[]>(this.baseURL + `create`, request);
  }
}

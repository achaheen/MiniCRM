import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicPermissionsService {
  baseURL: string = environment.apiUrl + 'topics/permissions/';

  constructor(private httpClient: HttpClient) {

  }

  create(permissions) {
    return this.httpClient.post(this.baseURL + 'create', permissions);
  }

  modify(permissions) {
    return this.httpClient.post(this.baseURL + 'edit', permissions);
  }

  getTopicPermissions(topicID) {
    return this.httpClient.get(this.baseURL + topicID);
  }

  getUserPermissions(id) {
    return this.httpClient.get(this.baseURL + '/users/' + id);
  }
  getGroupPermissions(id) {
    return this.httpClient.get(this.baseURL + '/groups/' + id);
  }
}

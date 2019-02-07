import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TopicsPermissions} from '../model/topicsPermissions';
import {ResponseCode} from '../model/response-code';

@Injectable({
  providedIn: 'root'
})
export class TopicPermissionsService {
  baseURL: string = environment.apiUrl + 'topics/permissions/';

  constructor(private httpClient: HttpClient) {

  }

  create(permissions) {
    return this.httpClient.post<TopicsPermissions[]>(this.baseURL + 'create', permissions);
  }

  prepare(request) {
    return this.httpClient.post<TopicsPermissions[]>(this.baseURL + 'topics/prepareList', request);
  }

  modify(permissions) {
    return this.httpClient.post<TopicsPermissions[]>(this.baseURL + 'edit', permissions);
  }

  delete(permissions) {
    return this.httpClient.post<ResponseCode>(this.baseURL + 'delete', permissions);

  }

  getTopicPermissions(topicID) {
    return this.httpClient.get<TopicsPermissions[]>(this.baseURL + topicID);
  }

  getSubCatPermissions(subcat) {
    return this.httpClient.get<TopicsPermissions[]>(this.baseURL + 'subCat/' + subcat);
  }

  getMainCatPermissions(maincat) {
    return this.httpClient.get<TopicsPermissions[]>(this.baseURL + 'mainCat/' + maincat);
  }

  getUserPermissions(id) {
    return this.httpClient.get<TopicsPermissions[]>(this.baseURL + 'users/' + id);
  }

  getGroupPermissions(id) {
    return this.httpClient.get<TopicsPermissions[]>(this.baseURL + 'groups/' + id);
  }
}

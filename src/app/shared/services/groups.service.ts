import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Group} from '../model/group';

@Injectable({
  providedIn: 'root'
})

export class GroupsService {

  private baseURL: string = environment.apiUrl + 'groups/';

  constructor(private httpClient: HttpClient) {
  }

  all() {
    return this.httpClient.get<Group[]>(this.baseURL + 'all');
  }

  active() {
    return this.httpClient.get<Group[]>(this.baseURL + 'active/true');
  }

}

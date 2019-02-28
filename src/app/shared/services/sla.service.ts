import {Injectable} from '@angular/core';
import {BasicHttpService} from './basicHttp.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Sla} from '../model/sla';
import {SelectItem} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SlaService extends BasicHttpService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.baseURL = environment.apiUrl + 'sla/';

  }

  all() {
    return this.httpClient.get<Sla[]>(this.baseURL + 'all');
  }


  edit(request) {
    return this.httpClient.post<Sla[]>(this.baseURL + `edit`, request);
  }

  create(request) {
    return this.httpClient.post<Sla[]>(this.baseURL + `create`, request);
  }

  getAllAsSelectItem(): SelectItem[] {
    const selectItems: SelectItem[] = [{label: '', value: null}];
    this.all().subscribe(value => {
      if (value != null && value.length > 0) {
        value.forEach(value1 => {
          selectItems.push({label: value1.slaname, value: value1});
        });
      }
    });
    return selectItems;
  }
}

import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CustomerAccounts} from '../model/customerAccounts';

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {
  private baseURL: string = environment.apiUrl + 'accounts/';

  constructor(private httpClient: HttpClient) {
  }

  search(searchValues) {
    return this.httpClient.post<CustomerAccounts[]>(this.baseURL + 'search', searchValues);
  }
}

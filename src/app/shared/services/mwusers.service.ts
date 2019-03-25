import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CustomerProfile} from "../model/customerProfile";

@Injectable({
  providedIn: 'root'
})
export class MWUsersService {

  private baseURL: string = environment.apiUrl + 'ws/users/';

  constructor(private httpClient: HttpClient) {

  }

  //customerProfile/{customerBasic}/{lang}
  getCustomerProfile(customerBasic :String, lang :String)  {
    return this.httpClient.get<CustomerProfile>(this.baseURL + 'customerProfile/' + customerBasic + "/" + lang);
  }

  getCustomerProfileByInput(inputValue :String,inputType :number, lang :String)  {
    return this.httpClient.get<CustomerProfile>(this.baseURL + 'getCustomerProfileByInput/' + inputValue + "/" + inputType +"/" + lang);
  }

}

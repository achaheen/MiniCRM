import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Role} from "../model/role";

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  private baseURL: string = environment.apiUrl + "roles/";

  constructor(private httpClient: HttpClient) {
  }

  all() {
    return this.httpClient.get<Role[]>(this.baseURL + "all");
  }

}

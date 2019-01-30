import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserHolder} from "../model/user-holder";
import {User} from "../model/user";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Group} from "../model/group";
import {Role} from "../model/role";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL: string = environment.apiUrl + "users/";

  constructor(private httpClient: HttpClient) {

  }

   activeUsers()  {
    return this.httpClient.get<User[]>(this.baseURL + "active");
  }

  all() {
    return this.httpClient.get<User[]>(this.baseURL + "all");
  }

  validate(username: string) {
    return this.httpClient.get(this.baseURL + "validate/" + username);
  }

  getUserRoles(userId: number) {
    return this.httpClient.get<Role[]>(this.baseURL + "roles/" + userId);
  }

  getUserPreferences(userId: number) {
    return this.httpClient.get(this.baseURL + "preferences/" + userId);
  }

  getByID(userId: number) {
    return this.httpClient.get(this.baseURL + "id/" + userId);
  }

  getUserGroups(userId: number) {
    return this.httpClient.get<Group[]>(this.baseURL + "groups/" + userId);
  }

  enableUser(userId: number) {
    return this.httpClient.get(this.baseURL + "enable/" + userId);
  }

  disableUser(userId: number) {
    return this.httpClient.get(this.baseURL + "disable/" + userId);
  }

  create(userHolder: UserHolder) {
    return this.httpClient.post<User>(this.baseURL + "create", userHolder);
  }
  edit(userHolder: UserHolder) {
    return this.httpClient.post<User>(this.baseURL + "edit", userHolder);
  }


}

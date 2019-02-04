import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Topic} from "../model/topic";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private baseURL: string = environment.apiUrl + "topics/";

  constructor(private httpClient: HttpClient) {
  }

  all() {
    return this.httpClient.get<Topic[]>(this.baseURL + "all");
  }

}

import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MainCategory} from "../model/mainCategory";

@Injectable({
  providedIn: 'root'
})
export class MainCategoryService {

  private baseURL: string = environment.apiUrl + "categories/";
  constructor(private httpClient: HttpClient) {
  }

  all() {
    return this.httpClient.get<MainCategory[]>(this.baseURL + "all");
  }

}

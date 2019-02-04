import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Subcategory} from "../model/subcategory";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private baseURL: string = environment.apiUrl + "subcategories/";

  constructor(private httpClient: HttpClient) {
  }

  all() {
    return this.httpClient.get<Subcategory[]>(this.baseURL + "all");
  }

}

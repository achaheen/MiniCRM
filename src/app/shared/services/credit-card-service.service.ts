import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CustomerCreditCards} from "../model/CustomerCreditCards";
import {CreditCardTransactionsRequest} from "../model/CreditCardTransactionsRequest";
import {CreditCardTransactionsResponse} from "../model/CreditCardTransactionsResponse";

@Injectable({
  providedIn: 'root'
})
export class CreditCardServiceService {

  private baseURL: string = environment.apiUrl + 'ws/creditcards/';

  constructor(private httpClient: HttpClient) {
  }

  getCreditCardsList(customerBasic: string, status: string, idNumber: string, lang: string) {
    return this.httpClient.get<CustomerCreditCards>(this.baseURL + 'cardsList/' + customerBasic + "/" + status + "/" + idNumber + "/" + lang);
  }

  getCreditCardTransactions(creditCardTransactionsRequest : CreditCardTransactionsRequest){
    return this.httpClient.post<CreditCardTransactionsResponse>(this.baseURL + 'cardTransactions',creditCardTransactionsRequest);

  }

}

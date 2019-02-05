import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Role} from '../model/role';
import {SearchTicketsContainer} from '../model/searchTicketsContainer';
import {SearchTicketsResult} from '../model/searchTicketsResult';
import {Ticket} from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private baseURL: string = environment.apiUrl + 'tickets/';

  constructor(private httpClient: HttpClient) {
  }

  getTicketsByFilter(searchContainer: SearchTicketsContainer) {
    return this.httpClient.post<SearchTicketsResult>(this.baseURL + 'list', searchContainer);
  }

  getTicketByID(ticketID) {
    return this.httpClient.get<Ticket>(this.baseURL + ticketID);
  }

}

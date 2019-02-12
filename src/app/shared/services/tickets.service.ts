import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SearchTicketsContainer} from '../model/searchTicketsContainer';
import {SearchTicketsResult} from '../model/searchTicketsResult';
import {Ticket} from '../model/ticket';
import {TicketHolder} from '../model/ticketHolder';
import {Attachment} from '../model/attachment';


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

  create(ticketHolder: TicketHolder) {
    return this.httpClient.post<Ticket>(this.baseURL + 'create', ticketHolder);
  }

  getAttachmentsInfo(request) {
    return this.httpClient.post<Attachment[]>(this.baseURL + 'attachments/info', request);
  }
  getAttachmentsData(request) {
    return this.httpClient.post<Attachment[]>(this.baseURL + 'attachments/data', request);
  }
}

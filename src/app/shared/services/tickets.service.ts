import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SearchTicketsContainer} from '../model/searchTicketsContainer';
import {SearchTicketsResult} from '../model/searchTicketsResult';
import {Ticket} from '../model/ticket';
import {TicketHolder} from '../model/ticketHolder';
import {Attachment} from '../model/attachment';
import {TicketActions} from '../model/ticketActions';
import {TicketLock} from '../model/ticket-lock';


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

  downloadAttachment(id) {
    return this.httpClient.get<Blob>(this.baseURL + 'attachments/download/' + id, {responseType: 'blob' as 'json'});
  }

  getAttachmentsData(request) {
    return this.httpClient.post<Attachment[]>(this.baseURL + 'attachments/data', request);
  }

  getAuthorizedActionsByTopic(topicID) {
    return this.httpClient.get<TicketActions[]>(this.baseURL + 'authorizedActions/' + topicID);
  }

  getAuthorizedActionsByTicket(ticketID) {
    return this.httpClient.get<TicketActions[]>(this.baseURL + 'authorizedActions/ticket/' + ticketID);
  }

  getLock(ticketID, actionID) {
    return this.httpClient.get<TicketLock>(this.baseURL + 'lock/' + ticketID + '/' + actionID);
  }

  action(holder) {
    return this.httpClient.post<Ticket>(this.baseURL + 'action', holder);
  }
}

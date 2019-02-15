import {Ticket} from './ticket';

export interface TicketLock {
  lockID: number;
  userID: string;
  dateTime: number;
  expiresOn: number;
  ticketID: Ticket;
  expired: boolean;
}

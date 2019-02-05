import {User} from './user';
import {TicketExtras} from './TicketExtras';

export interface AuthResponse {
  token: string;
  user: User;
  ticketExtras?: TicketExtras;
}

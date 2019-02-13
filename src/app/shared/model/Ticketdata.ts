import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Ticket} from './ticket';
import {TicketActions} from './ticketActions';

export interface Ticketdata extends BasicModelWithIDInt {

  actionID?: TicketActions;

  title?: string;
  ticketData?: string;
  notes?: string;
  hidden?: boolean;
  notificationID?: any;
  notify?: any;
  notfiyStatus?: any;
  attachmentsList?: number[];

}

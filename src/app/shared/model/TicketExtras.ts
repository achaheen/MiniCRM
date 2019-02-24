import {Status} from './status';
import {TicketActions} from './ticketActions';
import {TicketType} from './types';
import {TicketPriority} from './TicketPriority';
import {SourceChannel} from './source-channel';

export interface TicketExtras {
  ticketactionsList: TicketActions[];
  ticketStatusList: Status[];
  tickettypesList: TicketType[];
  ticketPriorityList: TicketPriority[];
  channelsList?: SourceChannel[];
}

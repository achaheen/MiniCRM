import {Status} from './status';
import {TicketActions} from './ticketActions';
import {TicketType} from './types';
import {TicketPriority} from './TicketPriority';

export interface TicketExtras {
        ticketactionsList: TicketActions[];
        ticketStatusList: Status[];
        tickettypesList: TicketType[];
        ticketPriorityList: TicketPriority[];
    }

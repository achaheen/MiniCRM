import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Ticket} from "./ticket";
import {TicketActions} from "./ticketActions";

export interface Ticketdata extends BasicModelWithIDInt{

   actionID?:TicketActions;
   title?:string;
   ticketData?:string;
   notes?:string;
   hidden?:boolean;
   oldStatus?:number;
   newStatus?:number;
   oldTopic?:number;
   newTopic?:number;
   notificationID?:number;
   notify?:boolean;
   notfiyStatus?:number;
   ticketID?:Ticket;

}

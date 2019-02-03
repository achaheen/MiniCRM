import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Ticket} from "./ticket";
import {Sla} from "./sla";

export interface Escalationhistory extends BasicModelWithIDInt{

  eSCLevel?:number;
  eSCDateTime?:Date;
  escUsers?:string;
  escEmails?:string;
  sla?:Sla;
  ticketID?:Ticket;


}

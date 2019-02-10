import {Ticket} from "./ticket";
import {CustomerAccounts} from "./customerAccounts";
import {TicketExtData} from "./ticketExtData";
import {Ticketdata} from "./Ticketdata";

export interface TicketHolder {

  ticket?:Ticket;
  customerAccount?:CustomerAccounts;
  extDataList?:TicketExtData[];
  ticketdata?:Ticketdata;
  lockID?:number;
  actionID?:number;
  newTopic?:number;
  ticketList?:number[];
  targetUser?:string[];
  attachments?:number[];

}

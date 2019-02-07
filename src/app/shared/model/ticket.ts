import {Topic} from "./topic";
import {CustomerAccounts} from "./customerAccounts";
import {Ticketdata} from "./Ticketdata";
import {Escalationhistory} from "./escalationhistory";
import {SmsHistory} from "./smsHistory";
import {TicketExtData} from "./ticketExtData";
import {TicketHistroy} from "./ticketHistroy";

export interface Ticket {

 id?: number;

 topic?: Topic;

 originalTopic?:Topic;

 currentStatus?:number;

 crossedMainSLA?:boolean;

 customerAccount?:CustomerAccounts;

 sourceChannel?:number;

 subject?:string;

 ticketType?:number;

 details?:string;

 assignedTo?:string;

 escalationCalDate?:Date;

 lastSLA?:number;

 language?:number;

 priority?:number;

 lastTicketData?:number;

 solved?:boolean;

 closed?:boolean;

 deleted?:boolean;

  createdBy?: string;
  modificationDate?: Date;
  modifiedBy?: string;
  creationDate?: number;

 ticketdataList?:Ticketdata[];

 escalationhistoryList?:Escalationhistory[];

 smsHistoryList?:SmsHistory[];
 
 ticketExtData?:TicketExtData[];
 ticketHistoryList?:TicketHistroy[];


  statusLabel?:string;
  typeLabel?:string;
  chanelLabel?:string;
  priorityLabel?:string;


}

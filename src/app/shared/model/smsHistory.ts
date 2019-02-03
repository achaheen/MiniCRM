import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Ticket} from "./ticket";

export interface SmsHistory extends BasicModelWithIDInt{

  mobile?:string;
  creationDate?:Date;
  message?:string;
  templateID?:number;
  status?:number;
  sendDate?:Date;
  sendingON?:string;
  errorCode?:string;
  backEndID?:string;
  icketID?:Ticket;

}

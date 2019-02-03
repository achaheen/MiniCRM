import {BasicModel} from "./basicModel";
import {Status} from "./status";

export interface TicketActions extends BasicModel{

  actionID?:number;
  arabicLabel?:string;
  englishLabel?:string;
  enabled?:boolean;
  setStatusTo?:Status;

}

import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Ticket} from "./ticket";

export  interface SearchTicketsResult  extends BasicModelWithIDInt{

  content?:Ticket[];
  numberOfElements?:number;
  totalElements?:number;
  totalPages?:number;
  size?:number;
  number?:number;
  last?:boolean;
  first?:boolean;
  
}

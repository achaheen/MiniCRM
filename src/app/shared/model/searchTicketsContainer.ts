import {SearchTicketsSorting} from "./searchTicketsSorting";

export interface SearchTicketsContainer {

  size?:number;
  page?:number;
  searchUser?:string;
  skipValidation?:boolean;
  runningReport?:boolean;
  createdBy?:string[];
  startDate?:Date;
  endDate?:Date;
  topics?:number[];
  originalTopics?:number[];
  subCats?:number[];
  mainCats?:number[];
  originalSubCats?:number[];
  originalMainCats?:number[];
  sourceChannels?:number[];
  types?:number[];
  status?:number[];
  customerAccounts?:number[];
  assignedTo?:string[];
  crossedMainSla?:boolean;
  language?:number[];
  priority?:number[];
  deleted?:boolean;
  solved?:boolean;
  closed?:boolean;
  sorting?:SearchTicketsSorting;

}

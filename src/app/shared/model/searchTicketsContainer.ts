import {SearchTicketsSorting} from './searchTicketsSorting';

export interface SearchTicketsContainer {
  size?: number;
  page?: number;
  searchUser?: string;
  skipValidation?: boolean;
  runningReport?: boolean;
  createdBy?: string[];
  startDate?: Date;
  endDate?: Date;
  topics?: number[];
  originalTopics?: number[];
  subCats?: number[];
  mainCats?: number[];
  originalSubCats?: number[];
  originalMainCats?: number[];
  sourceChannels?: number[];
  types?: number[];
  status?: number[];
  customerAccounts?: number[];
  assignedTo?: string[];
  crossedMainSla?: boolean;
  language?: number[];
  priority?: number[];
  deleted?: boolean;
  solved?: boolean;
  closed?: boolean;
  sorting?: SearchTicketsSorting;
  customerContainer?: CustomerSearchContainer;
}

export interface CustomerSearchContainer {
  customerBasic?: string;
  customerName?: string;
  customerMobile?: string;
  customerEmail?: string;
  customerSegment?: string;
  customerBranch?: string;
  nan?: string;
}

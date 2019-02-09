import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Ticket} from './ticket';

export interface TicketExtData extends BasicModelWithIDInt {

  ticketID?: Ticket;
  branchName?: string;
  transactionCode?: string;
  transactionDesc?: string;
  transactionType?: string;
  customerAccount?: string;
  amount?: string;
  traxDateTime?: Date;
  extDate1?: Date;
  extDate2?: Date;
  extField1?: string;
  extField2?: string;
  extField3?: string;
  extField4?: string;
  extField5?: string;
  extField6?: string;
  extField7?: string;
  extField8?: string;
  extField9?: string;
  extField10?: string;
  extField11?: string;
  extField12?: string;
  extField13?: string;
  extField14?: string;
  extField15?: string;
  extField16?: string;
  extField17?: string;
  extField18?: string;
  extField19?: string;
  extField20?: string;

}

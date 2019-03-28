import {AccountNo} from "./AccountNo";
import {AccountBalanceList} from "./AccountBalanceList";
import {AccountAccessList} from "./AccountAccessList";

export interface Account{

  accountTypeCode?:string;
  accountNo?:AccountNo;
  accountNostring?:string;
  status?:string;
  accountBalanceList?:AccountBalanceList;
  shortName?:string;
  currency?:string;
  iban?:string;
  valuationDate?:Date;
  accountAccessList?:AccountAccessList[];
  notificationId?:string;


}

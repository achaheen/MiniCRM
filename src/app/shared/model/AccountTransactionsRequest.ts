import {AccountNo} from "./AccountNo";

export interface AccountTransactionsRequest{
  customerNo?:string;
  idNumber?:string;
  segment?:string;
  lang?:string;
  accountNo?:AccountNo;
  fromDate?:number;
  toDate?:number;
}

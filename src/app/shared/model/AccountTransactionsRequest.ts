import {AccountNo} from "./AccountNo";

export interface AccountTransactionsRequest{
  customerBasic?:string;
  idnumber?:string;
  segment?:string;
  lang?:string;
  accountNo?:AccountNo;
  fromDate?:number;
  toDate?:number;
}

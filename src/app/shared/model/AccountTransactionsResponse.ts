import {AccountTransactionList} from "./AccountTransactionList";

export interface AccountTransactionsResponse{

  totalRecordCount?:number;
  startingBalance?:number;
  accountTransactionList?:AccountTransactionList;
}

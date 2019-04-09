import {CardTransactionStatus} from "./CardTransactionStatus";

export interface CreditCardTransaction {

  cardRefNo?: string;
  postingDate?: Date;
  description?: string;
  valueDate?: Date;
  orgAmount?: number;
  eqvAmount?: number;
  currency?: string;
  transactionCode?: string;
  status?:CardTransactionStatus;
  authorizationCode?: string;
  transactionType?: string;


}

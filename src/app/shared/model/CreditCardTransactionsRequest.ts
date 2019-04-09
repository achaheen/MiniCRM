export interface CreditCardTransactionsRequest{

  customerBasic?: string;
  cardRefNo?: string;
  fromDate?: number;
  toDate?: number;
  currency?: string;
  logo?: string;
  lang?:string;
}

import {CreditCardClass} from "./CreditCardClass";
import {WalletList} from "./WalletList";

export interface CreditCard {

  creditCardClass?: CreditCardClass;
  maskedCardNo?: string;
  cardRefNo?: string;
  mainCardRefNo?: string;
  cardStatus?: string;
  isPrimary?: string;
  sadadRefNo?: string;
  accountNo?: string;
  cardHolderName?: string;
  address?: string;
  mobile?: string;
  creditLimit?: number;
  cashLimit?: number;
  availableLimit?: number;
  dueAmount?: number;
  dueDate?: Date;
  outstandingBalance?: number;
  expiryDate?: Date;
  statementDate?: Date;
  lastStatementOutstandingBalance?: number;
  cardLastUsed?: string;
  totalAuthorizedAmount?: number;
  allowPay?: boolean;
  redemableBalance?: number;
  lastLoyaltyBalanceUpdate0020?: string;
  idExpiryFlag?: string;
  onlineTransactionStatus?: boolean;
  cardIssueDate?: Date;
  lastPurchaseDate?: Date;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  state?: string;
  postalCode?: string;
  blockCode1?: string;
  blockCode2?: string;
  walletList?: WalletList;


}

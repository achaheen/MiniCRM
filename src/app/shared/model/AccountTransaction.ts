import {AccountNo} from "./AccountNo";
import {TransactionChannel} from "./TransactionChannel";
import {KeyValueList} from "./KeyValueList";

export interface AccountTransaction {

  referenceNo?: string;
  postingDate?: Date;
  valueDate?: Date;
  code?: string;
  accountNo?: AccountNo;
  description?: string;
  amount?: number;
  availableBalance?: number;
  groupId?: number;
  channel?: TransactionChannel;
  category?: string;
  remarks?: string;
  specificFields?: KeyValueList;
}

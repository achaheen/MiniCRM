import {Component, Input, OnInit} from '@angular/core';
import {AccountNo} from "../../../shared/model/AccountNo";
import {AccountTransactionsResponse} from "../../../shared/model/AccountTransactionsResponse";
import {AccountTransactionsRequest} from "../../../shared/model/AccountTransactionsRequest";
import {MWAccountService} from "../../../shared/services/account-service.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {MessageService} from "../../../shared/services/message.service";
import {AccountTransaction} from "../../../shared/model/AccountTransaction";

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.scss']
})
export class AccountTransactionsComponent implements OnInit {

  @Input() accountNo: AccountNo = {};
  @Input() customerBasic: string;
  @Input() idNumber: string;
  @Input() segment:string;
  startDate: Date;
  endDate: Date;

  accountTransactionsReq: AccountTransactionsRequest = {};
  accountTransactionsRes: AccountTransactionsResponse;
  transactionsList: AccountTransaction[];
  totalRecords: number;

  constructor(private messageService: MessageService, private accountService: MWAccountService, public utils: UtilsService) {
  }

  ngOnInit() {
  }
  search() {
    this.accountTransactionsReq.accountNo = this.accountNo;
    this.accountTransactionsReq.fromDate = this.startDate.getTime();
    this.accountTransactionsReq.toDate = this.endDate.getTime();
    this.accountTransactionsReq.customerNo = this.customerBasic;
    this.accountTransactionsReq.idNumber = this.idNumber;
    this.accountTransactionsReq.lang="ar";
    this.accountTransactionsReq.segment=this.segment;

    this.accountService.getAccountTransactions(this.accountTransactionsReq).subscribe(
      result => {
        this.accountTransactionsRes = result;
        this.transactionsList = this.accountTransactionsRes.accountTransactionList.accountTransaction;
        this.totalRecords = this.accountTransactionsRes.totalRecordCount;
      }
    );
  }

}

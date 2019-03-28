import {Component, Input, OnInit} from '@angular/core';
import {AccountNo} from "../../../shared/model/AccountNo";
import {AccountTransactionsResponse} from "../../../shared/model/AccountTransactionsResponse";
import {AccountTransactionsRequest} from "../../../shared/model/AccountTransactionsRequest";
import {MWAccountService} from "../../../shared/services/account-service.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {MessageService} from "../../../shared/services/message.service";
import {AccountTransaction} from "../../../shared/model/AccountTransaction";
import {AbstractSharedDataClass} from "../../user-profile/abstract-shared-data-class";
import {SharedCustomerInfoService} from "../../../shared/services/shared-customer-info.service";
import {CustomerProfile} from "../../../shared/model/customerProfile";

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.scss']
})
export class AccountTransactionsComponent extends AbstractSharedDataClass {

  @Input() accountNo: AccountNo = {};
  @Input() customerProfile: CustomerProfile = {};
  startDate: Date;
  endDate: Date;

  accountTransactionsReq: AccountTransactionsRequest = {};
  accountTransactionsRes: AccountTransactionsResponse;
  transactionsDataList: AccountTransaction[];
  totalRecords: number;

  constructor(private messageService: MessageService, private accountService: MWAccountService, public utils: UtilsService, public sharedInfoService: SharedCustomerInfoService) {
    super();
  }

  ngOnInit() {

    super.ngOnInit();
  }

  search() {


    this.accountTransactionsReq.accountNo = this.accountNo;
    this.accountTransactionsReq.fromDate = this.startDate.getTime();
    this.accountTransactionsReq.toDate = this.endDate.getTime();
    this.accountTransactionsReq.customerBasic = this.customerProfile.caa.customerNo;
    this.accountTransactionsReq.idnumber = this.customerProfile.idNumber;
    this.accountTransactionsReq.lang = "ar";
    this.accountTransactionsReq.segment = this.customerProfile.customerType;


    console.log("this.accountTransactionsReq " + JSON.stringify(this.accountTransactionsReq))

    this.accountService.getAccountTransactions(this.accountTransactionsReq).subscribe(
      result => {
        this.accountTransactionsRes = result;
        this.transactionsDataList = this.accountTransactionsRes.accountTransactionList.accountTransaction;
        this.totalRecords = this.accountTransactionsRes.totalRecordCount;
      }
    );
  }

}

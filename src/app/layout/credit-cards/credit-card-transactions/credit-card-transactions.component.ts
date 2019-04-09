import {Component, Input, OnInit} from '@angular/core';
import {AbstractSharedDataClass} from "../../user-profile/abstract-shared-data-class";
import {CreditCardTransactionsRequest} from "../../../shared/model/CreditCardTransactionsRequest";
import {CreditCardTransactionsResponse} from "../../../shared/model/CreditCardTransactionsResponse";
import {CreditCardTransaction} from "../../../shared/model/CreditCardTransaction";
import {CustomerProfile} from "../../../shared/model/customerProfile";
import {MessageService} from "../../../shared/services/message.service";
import {CreditCardServiceService} from "../../../shared/services/credit-card-service.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {SharedCustomerInfoService} from "../../../shared/services/shared-customer-info.service";

@Component({
  selector: 'app-credit-card-transactions',
  templateUrl: './credit-card-transactions.component.html',
  styleUrls: ['./credit-card-transactions.component.scss']
})
export class CreditCardTransactionsComponent extends AbstractSharedDataClass {

  @Input() cardRefNo: string;
  @Input() customerProfile: CustomerProfile = {};
  startDate: Date;
  endDate: Date;
  blocked = false;
  ccTransactionsReq: CreditCardTransactionsRequest = {};
  ccTransactionsRes: CreditCardTransactionsResponse;
  ccDataList: CreditCardTransaction[];
  totalRecords: number;
  ccSearchType: number = 1;

  constructor(private messageService: MessageService, private creditCardServices: CreditCardServiceService, public utils: UtilsService, public sharedInfoService: SharedCustomerInfoService) {
    super();
  }

  ngOnInit() {

    super.ngOnInit();
  }

  search() {
    this.blocked = true;

    this.ccTransactionsReq.cardRefNo = this.cardRefNo;
    this.ccTransactionsReq.fromDate = this.startDate.getTime();
    this.ccTransactionsReq.toDate = this.endDate.getTime();
    this.ccTransactionsReq.customerBasic = this.customerProfile.caa.customerNo;
    this.ccTransactionsReq.lang = 'ar';

    this.creditCardServices.getCreditCardTransactions(this.ccTransactionsReq).subscribe(
      result => {
        this.ccTransactionsRes = result;
        this.ccDataList = this.ccTransactionsRes.postedTransactionsList.creditCardTransaction;
        this.totalRecords = this.ccTransactionsRes.totalRecordCount;
        this.blocked = false;
      }
    );
  }

  getCCTransactionsPeriod(month: number) {

    const currentDate = new Date();
    this.startDate = new Date();

    this.startDate.setMonth(currentDate.getMonth() - month);
    this.endDate = new Date();
    this.search();
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {MWAccountService} from '../../shared/services/account-service.service';
import {MessageService} from '../../shared/services/message.service';
import {UtilsService} from '../../shared/services/utils.service';
import {CustomerProfile} from '../../shared/model/customerProfile';
import {CustomerAccount} from '../../shared/model/CustomerAccount';
import {AccountList} from '../../shared/model/AccountList';
import {Account} from '../../shared/model/Account';
import {SharedCustomerInfoService} from '../../shared/services/shared-customer-info.service';
import {AbstractSharedDataClass} from '../user-profile/abstract-shared-data-class';
import {AccountTransactionsRequest} from '../../shared/model/AccountTransactionsRequest';
import {AccountTransactionsResponse} from '../../shared/model/AccountTransactionsResponse';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [ConfirmationService]
})

export class AccountsComponent extends AbstractSharedDataClass {

  customerAccounts: CustomerAccount = {};
  accountList: AccountList = {};
  accounts: Account[];

  @Input() customerProfile: CustomerProfile = {};
  cols: any[];
  blocked = false;
  display = false;
  accountTransactionsReq: AccountTransactionsRequest = {};
  accountTransactionsRes: AccountTransactionsResponse;
  statementTypes: any[];
  selectedStatementType: {};
  startDate: Date;
  endDate: Date;
  selectedAccount: Account;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private accountService: MWAccountService, public utils: UtilsService, public sharedInfoService: SharedCustomerInfoService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.accountList.account = this.accounts;
    this.customerAccounts.accountList = this.accountList;
    this.statementTypes = [
      {label: '', value: null},
      {label: this.utils.translateService.instant('Email'), value: '1'},
      {label: this.utils.translateService.instant('mail'), value: '2'}];
    this.cols = [
      {field: 'accountNostring', header: this.utils.translateService.instant('accountNo')},
      {field: 'accountTypeCode', header: this.utils.translateService.instant('accountTypeCode')},
      {field: 'status', header: this.utils.translateService.instant('Status')},
      {field: 'shortName', header: this.utils.translateService.instant('shortName')},
      {field: 'currency', header: this.utils.translateService.instant('currency')}
    ];

    this.getCustomerAccountsList();

  }

  getCustomerAccountsList() {
    if (this.customerProfile == null) {
      return;
    }
    this.blocked = true;
    const customerBasic = this.customerProfile.caa.customerNo;
    const segment = this.customerProfile.segmentDetails.customerCurrentSegmentCode;
    const IDNumber = this.customerProfile.idNumber;
    const lang = this.customerProfile.language;

    this.accountService.getCustomerAccounts(customerBasic, segment, IDNumber, lang).subscribe(customerAccounts => {
        this.customerAccounts = customerAccounts;
        this.prepareAccountsNoString();
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'Customer Accounts Success', this.utils, 'success');
        this.blocked = false;
      }
      , error => {
        this.utils.messageService.printLocalizedMessage('FailureMsg', 'Customer Accounts Not Found', this.utils, 'error');
        console.log(error);
        this.blocked = false;
      });
  }

  prepareAccountsNoString() {

    // console.log("prepareAccountsNoString " +this.customerAccounts.accountList.account[0].accountNo.customerNo);
    this.customerAccounts.accountList.account.forEach(function (account) {
      account.accountNostring = account.accountNo.branch.concat(account.accountNo.customerNo, account.accountNo.suffix);
    });

  }


  sendIbanSMS(account: Account) {
    this.blocked = true;
    this.accountTransactionsReq.accountNo = account.accountNo;
    this.accountTransactionsReq.customerBasic = this.customerProfile.caa.customerNo;
    this.accountTransactionsReq.idnumber = this.customerProfile.idNumber;
    this.accountTransactionsReq.lang = 'ar';

    console.log('this.accountTransactionsReq ' + JSON.stringify(this.accountTransactionsReq));
    this.accountService.sendIBANSMS(this.accountTransactionsReq).subscribe(
      result => {
        this.accountTransactionsRes = result;
        this.blocked = false;
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'IBAN Sent successfully', this.utils, 'success');
      }
    );

  }

  orderChequeBook(account: Account) {
    this.blocked = true;
    this.accountTransactionsReq.accountNo = account.accountNo;
    this.accountTransactionsReq.customerBasic = this.customerProfile.caa.customerNo;
    this.accountTransactionsReq.idnumber = this.customerProfile.idNumber;
    this.accountTransactionsReq.lang = 'ar';

    console.log('this.accountTransactionsReq ' + JSON.stringify(this.accountTransactionsReq));
    this.accountService.chequeBookRequest(this.accountTransactionsReq).subscribe(
      result => {
        this.accountTransactionsRes = result;
        this.blocked = false;
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'chequebook ordered successfully', this.utils, 'success');
      }
    );
  }

  statusChequeBook(account: Account) {
    this.blocked = true;
    this.accountTransactionsReq.accountNo = account.accountNo;
    this.accountTransactionsReq.customerBasic = this.customerProfile.caa.customerNo;
    this.accountTransactionsReq.idnumber = this.customerProfile.idNumber;
    this.accountTransactionsReq.lang = 'ar';

    console.log('this.accountTransactionsReq ' + JSON.stringify(this.accountTransactionsReq));
    this.accountService.chequeBookStatus(this.accountTransactionsReq).subscribe(
      result => {
        this.accountTransactionsRes = result;
        this.blocked = false;
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'chequebook status: ' + result['status'], this.utils, 'success');
      }
    );

  }

  statementRequest(account: Account) {
    this.blocked = true;
    this.accountTransactionsReq.accountNo = this.selectedAccount.accountNo;
    this.accountTransactionsReq.customerBasic = this.customerProfile.caa.customerNo;
    this.accountTransactionsReq.idnumber = this.customerProfile.idNumber;
    this.accountTransactionsReq.lang = 'ar';
    this.accountTransactionsReq.statementType = +this.selectedStatementType;
    this.accountTransactionsReq.toDate = this.startDate.getTime();
    this.accountTransactionsReq.fromDate = this.endDate.getTime();
    this.accountTransactionsReq.email = this.customerProfile.eMail;

    this.accountService.sendAccountStatement(this.accountTransactionsReq).subscribe(
      result => {
        this.accountTransactionsRes = result;
        this.blocked = false;
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'statement request sent successfully', this.utils, 'success');
      }
    );

  }

  showStatementDialog(account: Account) {
    this.display = true;
    this.selectedAccount = account;
  }

  confirm(account: Account) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        // statementRequest
        this.statementRequest(account);
      }
    });
  }
}

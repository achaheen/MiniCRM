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


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent extends AbstractSharedDataClass {

  customerAccounts: CustomerAccount = {};
  accountList: AccountList = {};
  accounts: Account[];

  @Input() customerProfile: CustomerProfile = {};
  cols: any[];
  blocked = false;


  constructor(private messageService: MessageService, private accoutService: MWAccountService, public utils: UtilsService, public sharedInfoService: SharedCustomerInfoService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.accountList.account = this.accounts;
    this.customerAccounts.accountList = this.accountList;

    this.cols = [
      {field: 'accountNostring', header: 'accountNo'},
      {field: 'accountTypeCode', header: 'accountTypeCode'},
      {field: 'status', header: 'status'},
      {field: 'shortName', header: 'shortName'},
      {field: 'currency', header: 'status'},
      {field: 'valuationDate', header: 'shortName'}
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

    this.accoutService.getCustomerAccounts(customerBasic, segment, IDNumber, lang).subscribe(customerAccounts => {
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

}

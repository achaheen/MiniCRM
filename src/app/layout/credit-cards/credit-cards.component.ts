import {Component, Input, OnInit} from '@angular/core';
import {AbstractSharedDataClass} from "../user-profile/abstract-shared-data-class";
import {SharedCustomerInfoService} from "../../shared/services/shared-customer-info.service";
import {UtilsService} from "../../shared/services/utils.service";
import {CreditCardServiceService} from "../../shared/services/credit-card-service.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {CustomerProfile} from "../../shared/model/customerProfile";
import {CustomerCreditCards} from "../../shared/model/CustomerCreditCards";
import {CreditCardList} from "../../shared/model/CreditCardList";
import {CreditCard} from "../../shared/model/CreditCard";
import {CreditCardStatus} from "../../shared/model/CreditCardStatus";

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.scss'],
  providers: [ConfirmationService]
})
export class CreditCardsComponent extends AbstractSharedDataClass implements OnInit {

  cols: any[];
  blocked:boolean = false;
  @Input() customerProfile: CustomerProfile = {};

  customerCreditCards: CustomerCreditCards = {};
  creditCardList: CreditCardList = {};
  creditCards: CreditCard[];

  constructor(private confirmationService: ConfirmationService,private messageService: MessageService ,private creditCardService: CreditCardServiceService, public utils: UtilsService, public sharedInfoService: SharedCustomerInfoService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.creditCardList.creditCard = this.creditCards;
    this.customerCreditCards.creditCardList = this.creditCardList;
    this.cols = [
      {field: 'maskedCardNo', header: this.utils.translateService.instant('maskedCardNo')},
      {field: 'cardStatus', header: this.utils.translateService.instant('cardStatus')},
      {field: 'accountNo', header: this.utils.translateService.instant('accountNo')},
      {field: 'creditLimit', header: this.utils.translateService.instant('creditLimit')},
      {field: 'redemableBalance', header: this.utils.translateService.instant('redemableBalance')},
      {field: 'cardIssueDate', header: this.utils.translateService.instant('cardIssueDate')},
      {field: 'cardHolderName', header: this.utils.translateService.instant('cardHolderName')},
      {field: 'CardType', header: this.utils.translateService.instant('CardType')}
    ];

    this.getCustomerCreditCards();
  }


  getCustomerCreditCards(){

    if (this.customerProfile == null) {
      return;
    }
    this.blocked = true;
    const customerBasic = this.customerProfile.caa.customerNo;
    const status = CreditCardStatus.ACTIVE;
    const IDNumber = this.customerProfile.idNumber;
    const lang = this.customerProfile.language;


    this.creditCardService.getCreditCardsList(customerBasic, CreditCardStatus[0].toString(), IDNumber, lang).subscribe(customerCreditCards => {
        this.customerCreditCards = customerCreditCards;
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'CreditCards Success', this.utils, 'success');
        this.blocked = false;
      }
      , error => {
        this.utils.messageService.printLocalizedMessage('FailureMsg', 'CreditCards Not Found', this.utils, 'error');
        console.log(error);
        this.blocked = false;
      });

  }

}

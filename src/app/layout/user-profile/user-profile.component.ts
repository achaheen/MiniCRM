import {Component, OnInit} from '@angular/core';
import {MWUsersService} from '../../shared/services/mwusers.service';
import {MessageService} from '../../shared/services/message.service';
import {UtilsService} from '../../shared/services/utils.service';
import {CustomerProfile} from '../../shared/model/customerProfile';
import {SharedCustomerInfoService} from '../../shared/services/shared-customer-info.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private messageService: MessageService, private mwUserServices: MWUsersService,
              public utils: UtilsService, private sharedInfo: SharedCustomerInfoService) {

  }

  searchTypes = [];
  selectedSearchType = {};
  nationalIdTypes = [];
  selectedNationalType = {};
  customerBasic: String = '80164576';
  customerProfile: CustomerProfile = {};
  mobileNo: String;
  inputValue: String = '';
  nationalID: String;
  blocked = false;


  ngOnInit() {

    this.sharedInfo.currentSubject.subscribe(value => {
      if (value != null && value !== '') {
        this.customerProfile = value as CustomerProfile;
      }
    });

    this.searchTypes = [
      {label: this.utils.translateService.instant('CustomerBasic'), value: '1'},
      {label: this.utils.translateService.instant('CustomerID'), value: '2'},
      {label: this.utils.translateService.instant('mobile'), value: '3'}];
    this.selectedSearchType = 1;
    this.nationalIdTypes = [
      {label: this.utils.translateService.instant('SelectType'), value: ''},
      {label: this.utils.translateService.instant('NAT_ID'), value: 'ID'},
      {label: this.utils.translateService.instant('IQAMA'), value: 'IQ'},
      {label: this.utils.translateService.instant('GCC_PASSPORT'), value: 'GP'},
      {label: this.utils.translateService.instant('FAMILY_BOOK'), value: 'FB'},
      {label: this.utils.translateService.instant('DIPLOMATIC_CARD'), value: 'DC'},
      {label: this.utils.translateService.instant('REGISTERATION_BOOK'), value: 'RG'},
      {label: this.utils.translateService.instant('HAFEEZA'), value: 'HN'},
      {label: this.utils.translateService.instant('BUSINESS_LICENSE'), value: 'BL'}

    ];
  }

  search() {
    this.blocked = true;
    this.customerProfile = {};
    switch (Number(this.selectedSearchType)) {
      case 1: {
        this.inputValue = this.customerBasic;
        break;
      }
      case 2 : {
        this.inputValue = String(this.selectedNationalType) + this.nationalID;
        break;
      }
      case 3 : {
        this.inputValue = this.mobileNo;
        break;
      }

    }

    this.mwUserServices.getCustomerProfileByInput(this.inputValue, Number(this.selectedSearchType), 'ar')
      .subscribe(returnedCustomerProfile => {
          this.customerProfile = returnedCustomerProfile;
          this.sharedInfo.setValue(this.customerProfile);
          this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'Customer Profile Success', this.utils, 'success');
          this.blocked = false;
        }
        , error => {
          this.utils.messageService.printLocalizedMessage('FailureMsg', 'Customer Not Found', this.utils, 'error');
          // this.utils.messageService.printError(error);
          this.blocked = false;
        });
  }

  clear() {

    this.customerProfile = {};

  }
}

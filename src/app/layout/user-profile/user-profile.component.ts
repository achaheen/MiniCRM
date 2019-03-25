import {Component, OnInit} from '@angular/core';
import {MWUsersService} from "../../shared/services/mwusers.service";
import {MessageService} from "../../shared/services/message.service";
import {UtilsService} from "../../shared/services/utils.service";
import {utils} from "protractor";
import {CustomerProfile} from "../../shared/model/customerProfile";
import {OTPMobile} from "../../shared/model/OTPMobile";
import {OTPMobileType} from "../../shared/model/OTPMobileType";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private messageService: MessageService, private mwUserServices: MWUsersService, public utils: UtilsService) {
  }

  searchTypes = [];
  selectedSearchType = {};
  nationalIdTypes = [];
  selectedNationalType = {};
  customerBasic: String = '516124';
  customerProfile: CustomerProfile = {};
  mobileNo: String;
  inputValue: String = "";
  nationalID: String;
  blocked = false;


  ngOnInit() {
    this.searchTypes = [
      {label: 'Select Search Type', value: ''},
      {label: 'Customer Basic', value: '1'},
      {label: 'National ID', value: '2'},
      {label: 'Mobile', value: '3'}]
    this.selectedSearchType = null;
    this.nationalIdTypes = [
      {label: 'Select Type', value: ''},
      {label: 'NAT_ID', value: 'ID'},
      {label: 'IQAMA', value: 'IQ'},
      {label: 'GCC_PASSPORT', value: 'GP'},
      {label: 'FAMILY_BOOK', value: 'FB'},
      {label: 'DIPLOMATIC_CARD', value: 'DC'},
      {label: 'REGISTERATION_BOOK', value: 'RG'},
      {label: 'HAFEEZA', value: 'HN'},
      {label: 'BUSINESS_LICENSE', value: 'BL'}

    ]
  }

  search() {
    this.blocked = true;

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
          this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'Customer Profile Success', this.utils, 'success');
          this.blocked = false;
        }
        , error => {
          this.utils.messageService.printLocalizedMessage('FailureMsg', 'Customer Not Found', this.utils, 'error');
          // this.utils.messageService.printError(error);
          this.blocked = false;
        });
  }
}

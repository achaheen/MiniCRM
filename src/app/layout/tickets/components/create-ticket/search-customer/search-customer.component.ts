import {Component, OnInit} from '@angular/core';
import {AccountServicesService} from '../../../../../shared/services/account-services.service';
import {CustomerSearchContainer} from '../../../../../shared/model/searchTicketsContainer';
import {CustomerAccounts} from '../../../../../shared/model/customerAccounts';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent implements OnInit {
  customerBasic: string;
  customerMobile: string;
  customerEmail: string;
  nin: string;
  accountsList: CustomerAccounts[];
  selectedAccount: CustomerAccounts;

  constructor(private accountServices: AccountServicesService) {
  }

  ngOnInit() {
  }

  search() {
    this.accountsList = [];
    const searchData: CustomerSearchContainer = {
      customerBasic: this.customerBasic, customerEmail: this.customerEmail
      , customerMobile: this.customerMobile, nan: this.nin
    };
    this.accountServices.search(searchData).subscribe(value => {
      this.accountsList = value;
    });
  }

  clear() {
    this.accountsList = [];
    this.customerBasic = null;
    this.customerMobile = null;
    this.customerEmail = null;
    this.nin = null;
  }




}

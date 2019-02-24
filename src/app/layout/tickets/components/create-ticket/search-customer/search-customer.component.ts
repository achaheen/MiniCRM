import {Component, Input, OnInit} from '@angular/core';
import {AccountServicesService} from '../../../../../shared/services/account-services.service';
import {CustomerSearchContainer} from '../../../../../shared/model/searchTicketsContainer';
import {CustomerAccounts} from '../../../../../shared/model/customerAccounts';
import {CreateTicketComponent} from '../create-ticket.component';

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
  cols: any;

  @Input() parent: CreateTicketComponent;

  constructor(private accountServices: AccountServicesService) {
    this.cols = [{header: 'id', field: 'id'}, {header: 'customerNameAR', field: 'customerNameAR'},
      {header: 'customerNameAR', field: 'customerNameAR'},
      {header: 'customerNameAR', field: 'customerNameEn'},
      {
        header: 'customerCIF',
        field: 'customerCIF'
      }, {header: 'nan', field: 'nin'},
      {header: 'CustomerMobile', field: 'mobile'}, {header: 'Email', field: 'email'}];
  }

  ngOnInit() {
  }

  search() {
    this.accountsList = [];
    const searchData: CustomerSearchContainer = {
      customerBasic: this.customerBasic == null ? '' : this.customerBasic,
      customerEmail: this.customerEmail == null ? '' : this.customerEmail,
      customerMobile: this.customerMobile == null ? '' : '%' + this.customerMobile + '%',
      nan: this.nin == null ? '' : '%' + this.nin + '%',
      customerName: '', customerBranch: '', customerSegment: ''
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

  doSelection() {
    this.parent.selectedAccount = this.selectedAccount;
    this.parent.updateCustomerAccountFields();
  }

}

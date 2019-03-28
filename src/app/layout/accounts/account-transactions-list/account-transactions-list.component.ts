import {Component, Input, OnInit} from '@angular/core';
import {AccountTransaction} from "../../../shared/model/AccountTransaction";

@Component({
  selector: 'app-account-transactions-list',
  templateUrl: './account-transactions-list.component.html',
  styleUrls: ['./account-transactions-list.component.scss']
})
export class AccountTransactionsListComponent implements OnInit {

  constructor() { }

  @Input() transactionsList:AccountTransaction[];
  cols:any[];
  ngOnInit() {
    this.cols = [
      {field: 'referenceNo', header: 'referenceNo'},
      {field: 'description', header: 'description'},
      {field: 'amount', header: 'amount'},
      {field: 'availableBalance', header: 'availableBalance'},
      {field: 'channel', header: 'channel'}
    ];
  }

}

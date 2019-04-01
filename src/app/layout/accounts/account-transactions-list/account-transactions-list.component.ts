import {Component, Input, OnInit} from '@angular/core';
import {AccountTransaction} from "../../../shared/model/AccountTransaction";
import {UtilsService} from "../../../shared/services/utils.service";

@Component({
  selector: 'app-account-transactions-list',
  templateUrl: './account-transactions-list.component.html',
  styleUrls: ['./account-transactions-list.component.scss']
})
export class AccountTransactionsListComponent implements OnInit {

  constructor(private utils:UtilsService) { }

  @Input() transactionsList:AccountTransaction[];
  cols:any[];
  ngOnInit() {
    this.cols = [
      {field: 'referenceNo', header: this.utils.translateService.instant('referenceNo') },
      {field: 'description', header: this.utils.translateService.instant('description')},
      {field: 'amount', header: this.utils.translateService.instant('amount')},
      {field: 'availableBalance', header: this.utils.translateService.instant('availableBalance')},
      {field: 'channel', header: this.utils.translateService.instant('channel')}
    ];
  }

}

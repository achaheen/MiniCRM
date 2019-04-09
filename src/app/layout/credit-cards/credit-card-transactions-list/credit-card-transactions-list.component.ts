import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from "../../../shared/services/utils.service";
import {CreditCardTransaction} from "../../../shared/model/CreditCardTransaction";

@Component({
  selector: 'app-credit-card-transactions-list',
  templateUrl: './credit-card-transactions-list.component.html',
  styleUrls: ['./credit-card-transactions-list.component.scss']
})
export class CreditCardTransactionsListComponent implements OnInit {

  constructor(private utils:UtilsService) { }

  @Input() transactionsList:CreditCardTransaction[];
  cols:any[];
  ngOnInit() {
    this.cols = [
      {field: 'cardRefNo', header: this.utils.translateService.instant('cardRefNo') },
      {field: 'description', header: this.utils.translateService.instant('description')},
      {field: 'orgAmount', header: this.utils.translateService.instant('orgAmount')},
      {field: 'eqvAmount', header: this.utils.translateService.instant('eqvAmount')},
      {field: 'status', header: this.utils.translateService.instant('status')}
    ];
  }

}

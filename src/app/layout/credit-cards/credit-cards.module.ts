import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditCardsRoutingModule } from './credit-cards-routing.module';
import { ViewCreditCardComponent } from './view-credit-card/view-credit-card.component';
import { CreditCardTransactionsComponent } from './credit-card-transactions/credit-card-transactions.component';
import { CreditCardTransactionsListComponent } from './credit-card-transactions-list/credit-card-transactions-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreditCardsRoutingModule
  ]
})
export class CreditCardsModule { }

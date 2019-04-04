import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import {UserProfileComponent} from "./user-profile.component";
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {BlockUIModule} from 'primeng/blockui';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {DataGridModule} from 'primeng/datagrid';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {MessageModule} from 'primeng/message';
import {CalendarModule, ConfirmDialogModule, RadioButtonModule, TooltipModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/listbox';
import {FieldsetModule} from 'primeng/fieldset';
import {PasswordModule} from 'primeng/password';
import {TranslateModule} from "@ngx-translate/core";
import {DropdownModule} from "primeng/primeng";
import {InputMaskModule} from "primeng/primeng";
import {TabViewModule} from "primeng/primeng";
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';
import {AccountsComponent} from "../accounts/accounts.component";
import {TableModule} from "primeng/table";
import {AccountTransactionsComponent} from "../accounts/account-transactions/account-transactions.component";
import {AccountTransactionsListComponent} from "../accounts/account-transactions-list/account-transactions-list.component";
import {CreditCardsComponent} from "../credit-cards/credit-cards.component";
import {ViewCreditCardComponent} from "../credit-cards/view-credit-card/view-credit-card.component";

@NgModule({
  declarations: [UserProfileComponent, ViewUserProfileComponent,AccountsComponent,AccountTransactionsComponent,AccountTransactionsListComponent,CreditCardsComponent,ViewCreditCardComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ButtonModule,
    DialogModule,
    BlockUIModule,
    PanelModule,
    InputTextModule,
    DataGridModule,
    FormsModule,
    TriStateCheckboxModule,
    CheckboxModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    RadioButtonModule,
    MultiSelectModule,
    ListboxModule,
    FieldsetModule,
    PasswordModule,
    TranslateModule,
    DropdownModule,
    InputMaskModule,
    TooltipModule,
    TabViewModule,
    TableModule,
    CalendarModule,
    ConfirmDialogModule
  ]
})
export class UserProfileModule { }

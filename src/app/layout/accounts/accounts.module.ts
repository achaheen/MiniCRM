import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountsRoutingModule} from './accounts-routing.module';
import {AccountsComponent} from './accounts.component';
import {ViewAccountComponent} from './view-account/view-account.component';

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
import {RadioButtonModule, TooltipModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/listbox';
import {FieldsetModule} from 'primeng/fieldset';
import {PasswordModule} from 'primeng/password';
import {TranslateModule} from "@ngx-translate/core";
import {DropdownModule} from "primeng/primeng";
import {InputMaskModule} from "primeng/primeng";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [ViewAccountComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
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
    TableModule

  ]
})
export class AccountsModule {
}

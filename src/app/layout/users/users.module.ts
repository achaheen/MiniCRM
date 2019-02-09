import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
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
import {RadioButtonModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/listbox';
import {FieldsetModule} from 'primeng/fieldset';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
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
    PasswordModule
  ]
})
export class UsersModule { }

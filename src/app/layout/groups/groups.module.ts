import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {BlockUIModule} from 'primeng/blockui';
import {PanelModule} from 'primeng/panel';
import {
  CheckboxModule,
  DataGridModule, FieldsetModule,
  InputTextModule, ListboxModule,
  MessageModule, MultiSelectModule, PasswordModule,
  RadioButtonModule,
  TriStateCheckboxModule
} from 'primeng/primeng';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
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
export class GroupsModule { }

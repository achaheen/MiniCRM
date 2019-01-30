import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {BlockUIModule} from 'primeng/blockui';
import {PanelModule} from "primeng/panel";
import {InputTextModule} from 'primeng/inputtext';
import {DataGridModule} from "primeng/datagrid";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {RadioButtonModule} from "primeng/primeng";
import {MultiSelectModule} from "primeng/primeng";
import {ListboxModule} from 'primeng/listbox';
import {FieldsetModule} from 'primeng/fieldset';



@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
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
    FieldsetModule
  ]
})
export class RolesModule { }

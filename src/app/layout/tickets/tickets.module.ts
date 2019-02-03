import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import {
  BlockUIModule,
  ButtonModule, CheckboxModule,
  DataGridModule,
  DialogModule, FieldsetModule,
  InputTextModule, ListboxModule, MessageModule, MultiSelectModule,
  PanelModule, PasswordModule, RadioButtonModule,
  TabViewModule, TriStateCheckboxModule
} from "primeng/primeng";
import { DyTicketTableComponent } from './components/dy-ticket-table/dy-ticket-table.component';
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [TicketsComponent, DyTicketTableComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    TabViewModule,
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
export class TicketsModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketsRoutingModule} from './tickets-routing.module';
import {TicketsComponent} from './tickets.component';
import {
  BlockUIModule,
  ButtonModule, CheckboxModule,
  DataGridModule,
  DialogModule, FieldsetModule,
  InputTextModule, ListboxModule, MessageModule, MultiSelectModule,
  PanelModule, PasswordModule, RadioButtonModule,
  TabViewModule, TriStateCheckboxModule
} from 'primeng/primeng';
import {DyTicketTableComponent} from './components/dy-ticket-table/dy-ticket-table.component';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import {FileUploadModule} from 'primeng/fileupload';
import { ViewTicketExtraListsComponent } from './components/view-ticket/view-ticket-extra-lists/view-ticket-extra-lists.component'
@NgModule({
  declarations: [TicketsComponent, DyTicketTableComponent, ViewTicketComponent, CreateTicketComponent, ViewTicketExtraListsComponent],
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
    PasswordModule,
    AccordionModule, TranslateModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule
  ]
})
export class TicketsModule {
}

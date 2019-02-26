import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketsRoutingModule} from './tickets-routing.module';
import {TicketsComponent} from './tickets.component';
import {
  BlockUIModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  DataGridModule,
  DialogModule,
  FieldsetModule,
  InputTextModule,
  ListboxModule,
  MessageModule,
  MessagesModule,
  MultiSelectModule,
  PanelModule,
  PasswordModule,
  RadioButtonModule,
  TabViewModule,
  TriStateCheckboxModule
} from 'primeng/primeng';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';
import {DyTicketTableComponent} from './components/dy-ticket-table/dy-ticket-table.component';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {TranslateModule} from '@ngx-translate/core';
import {ViewTicketComponent} from './components/view-ticket/view-ticket.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CreateTicketComponent} from './components/create-ticket/create-ticket.component';
import {FileUploadModule} from 'primeng/fileupload';
import {ViewTicketExtraListsComponent} from './components/view-ticket/view-ticket-extra-lists/view-ticket-extra-lists.component';
import {ViewAttachmentComponent} from './components/view-attachment/view-attachment.component';
import {ViewTicketDataComponent} from './components/view-ticket-data/view-ticket-data.component';
import {TicketReplyComponent} from './components/ticket-reply/ticket-reply.component';
import {TicketFiltersComponent} from './components/ticket-filters/ticket-filters.component';
import {TopicsSelectionModule} from '../topics-selection/topics-selection.module';
import {TopicspermissionsModule} from '../topicspermissions/topicspermissions.module';
import {SearchCustomerComponent} from './components/create-ticket/search-customer/search-customer.component';
import {TicketingMessagesModule} from '../messages/messages.module';
import { DynamicFieldsComponent } from './components/dynamic-fields/dynamic-fields.component';
import { DynamicFieldComponent } from './components/dynamic-fields/dynamic-field/dynamic-field.component';

@NgModule({
  providers: [],
  declarations: [TicketsComponent, DyTicketTableComponent, ViewTicketComponent,
    CreateTicketComponent, ViewTicketExtraListsComponent, ViewAttachmentComponent,
    ViewTicketDataComponent, TicketReplyComponent, TicketFiltersComponent, SearchCustomerComponent, DynamicFieldsComponent, DynamicFieldComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    TabViewModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BlockUIModule,
    MessageModule,
    PanelModule,
    InputTextModule,
    DataGridModule,
    FormsModule,
    TriStateCheckboxModule,
    CheckboxModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
    RadioButtonModule,
    MultiSelectModule,
    ListboxModule,
    FieldsetModule,
    PasswordModule,
    AccordionModule, TranslateModule,
    DropdownModule,
    InputTextareaModule, MessageModule,
    FileUploadModule, MenubarModule,
    SidebarModule, CalendarModule,
    TopicsSelectionModule,
    TopicspermissionsModule,
    TicketingMessagesModule
  ]
})
export class TicketsModule {
}

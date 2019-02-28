import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SlaRoutingModule} from './sla-routing.module';
import {SlaComponent} from './sla.component';
import {TopicsSelectionModule} from '../topics-selection/topics-selection.module';
import {
  AccordionModule,
  BlockUIModule,
  ButtonModule,
  CheckboxModule,
  DataGridModule,
  DialogModule,
  DropdownModule,
  FieldsetModule,
  FileUploadModule,
  InputTextareaModule,
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
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SlaComponent],
  imports: [
    CommonModule,
    SlaRoutingModule,
    TopicsSelectionModule,
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
  ]
})
export class SlaModule {
}

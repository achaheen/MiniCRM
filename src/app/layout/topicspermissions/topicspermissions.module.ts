import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TopicspermissionsRoutingModule} from './topicspermissions-routing.module';
import {ViewtopicpermissionComponent} from './viewtopicpermission/viewtopicpermission.component';
import {TranslateModule} from '@ngx-translate/core';
import {TableModule} from 'primeng/table';

import {
  AccordionModule,
  BlockUIModule,
  ButtonModule, CheckboxModule,
  DataGridModule,
  DialogModule, DropdownModule, FieldsetModule,
  InputTextModule, ListboxModule, MessageModule, MultiSelectModule,
  PanelModule, PasswordModule, RadioButtonModule,
  TabViewModule,
  TriStateCheckboxModule
} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ListtopicpermissionsComponent} from './listtopicpermissions/listtopicpermissions.component';
import {CreatetopicpermissionComponent} from './createtopicpermission/createtopicpermission.component';


@NgModule({
  declarations: [ViewtopicpermissionComponent, ListtopicpermissionsComponent, CreatetopicpermissionComponent],
  imports: [
    CommonModule,
    TopicspermissionsRoutingModule, TranslateModule, TableModule,
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
    DropdownModule
  ]
})
export class TopicspermissionsModule {
}

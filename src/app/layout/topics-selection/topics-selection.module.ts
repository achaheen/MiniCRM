import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopicsSelectionComponent} from './topics-selection.component';
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
import {TopicspermissionsRoutingModule} from '../topicspermissions/topicspermissions-routing.module';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';

@NgModule({
  providers: [TranslateService],
  exports: [TopicsSelectionComponent],
  declarations: [TopicsSelectionComponent],
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
export class TopicsSelectionModule {
}

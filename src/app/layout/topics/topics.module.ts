import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TopicsRoutingModule} from './topics-routing.module';
import {TopicsListComponent} from './topics-list/topics-list.component';
import {MainCatListComponent} from './main-cat-list/main-cat-list.component';
import {SubCatListComponent} from './sub-cat-list/sub-cat-list.component';
import {
  AccordionModule,
  BlockUIModule,
  ButtonModule,
  CheckboxModule,
  DataGridModule,
  DialogModule,
  DropdownModule,
  FieldsetModule,
  InputTextareaModule,
  InputTextModule,
  ListboxModule,
  MessageModule,
  MultiSelectModule,
  PanelModule,
  PasswordModule,
  RadioButtonModule,
  TabViewModule,
  TriStateCheckboxModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {TranslateModule} from '@ngx-translate/core';
import {CreateMainCatComponent} from './main-cat-list/create-main-cat/create-main-cat.component';
import {CreateSubCatComponent} from './sub-cat-list/create-sub-cat/create-sub-cat.component';
import {CreateTopicComponent} from './topics-list/create-topic/create-topic.component';
import {TopicItemFormComponent} from './topic-item-form/topic-item-form.component';

@NgModule({
  declarations: [TopicsListComponent, MainCatListComponent, SubCatListComponent, CreateMainCatComponent, CreateSubCatComponent, CreateTopicComponent, TopicItemFormComponent],
  imports: [
    CommonModule,
    TopicsRoutingModule,
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
    InputTextareaModule
  ]
})
export class TopicsModule {
}

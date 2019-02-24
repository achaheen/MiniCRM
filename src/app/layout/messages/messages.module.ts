import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TicketMessagesComponent} from './ticket-messages.component';
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/primeng';

@NgModule({
  declarations: [TicketMessagesComponent],
  providers: [MessageService],
  imports: [
    CommonModule,
    MessagesModule
  ], exports: [TicketMessagesComponent]
})
export class TicketingMessagesModule {
}

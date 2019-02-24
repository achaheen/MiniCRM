import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message, MessageService} from 'primeng/api';
import {GlobalMessageService} from './global-message.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './ticket-messages.component.html',
  styleUrls: ['./ticket-messages.component.scss']
})
export class TicketMessagesComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  msgs: Message[] = [];

  constructor(private messageService: GlobalMessageService) {
  }


  ngOnInit() {
    this.subscribeOnNotification();

  }

  subscribeOnNotification() {
    console.log('Subscribe');
    this.subscription = this.messageService.getMessage().subscribe(value => {
      console.log(`message received ${JSON.stringify(value)}`);
      this.msgs = [];
      this.msgs.push(value);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

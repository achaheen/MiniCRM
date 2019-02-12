import {Component, Input, OnInit} from '@angular/core';
import {TicketHistroy} from '../../../../../shared/model/ticketHistroy';
import {UtilsService} from '../../../../../shared/services/utils.service';
import {TicketActions} from '../../../../../shared/model/ticketActions';
import {Escalationhistory} from '../../../../../shared/model/escalationhistory';
import {Ticket} from '../../../../../shared/model/ticket';

@Component({
  selector: 'app-view-ticket-extra-lists',
  templateUrl: './view-ticket-extra-lists.component.html',
  styleUrls: ['./view-ticket-extra-lists.component.scss']
})
export class ViewTicketExtraListsComponent implements OnInit {

  @Input() ticket: Ticket;


  constructor(public utils: UtilsService) {
  }

  ngOnInit() {
  }

}

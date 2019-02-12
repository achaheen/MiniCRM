import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../../../../shared/services/utils.service';
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

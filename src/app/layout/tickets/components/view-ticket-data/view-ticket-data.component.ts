import {Component, Input, OnInit} from '@angular/core';
import {TicketsService} from "../../../../shared/services/tickets.service";
import {Ticketdata} from "../../../../shared/model/Ticketdata";

@Component({
  selector: 'app-view-ticket-data',
  templateUrl: './view-ticket-data.component.html',
  styleUrls: ['./view-ticket-data.component.scss']
})
export class ViewTicketDataComponent implements OnInit {
  @Input() ticketDataList: Ticketdata[];

  constructor(protected ticketsService: TicketsService) {
  }

  ngOnInit() {

  }

}

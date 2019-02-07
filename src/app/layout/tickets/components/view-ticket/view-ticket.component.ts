import {Component, Input, OnInit} from '@angular/core';
import {TicketsService} from '../../../../shared/services/tickets.service';
import {Ticket} from '../../../../shared/model/ticket';
import {Status} from "../../../../shared/model/status";
import {environment} from "../../../../../environments/environment";
import {Action} from "../../../../shared/model/action";
import {Type} from "../../../../shared/model/type";
import {Priority} from "../../../../shared/model/priority";
import {UtilsService} from "../../../../shared/services/utils.service";

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {

  @Input() ticketID: number;

  ticket: Ticket ;
  constructor(private utils:UtilsService, private ticketHttp: TicketsService) {

  }

  ngOnInit() {

    if (this.ticketID !== undefined) {
      this.ticketHttp.getTicketByID(this.ticketID).subscribe(value => {
        this.ticket = value;
       }, error1 => {
        console.log(JSON.stringify(error1));
      });
    }


  }


}
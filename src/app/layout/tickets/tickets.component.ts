import { Component, OnInit } from '@angular/core';
import {SearchTicketsContainer} from "../../shared/model/searchTicketsContainer";
import {TicketsService} from "../../shared/services/tickets.service";
import {Ticket} from "../../shared/model/ticket";
import {SearchTicketsResult} from "../../shared/model/searchTicketsResult";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  openTicketFilter:SearchTicketsContainer = {"status":[1], "createdBy":["admin"], "size":10,page:1};
  closedTicketFilter:SearchTicketsContainer = {"status":[8], "createdBy":["admin"] , "size":10,page:1};
  wordOnProgressTicketFilter:SearchTicketsContainer = {"status":[2], "createdBy":["admin"] , "size":10,page:1};
  assignedTicketFilter:SearchTicketsContainer = {"status":[0], "createdBy":["admin"] , "size":10,page:1};

  ticketList:Ticket[];
  ticketsResult:SearchTicketsResult;
  constructor(private ticketService:TicketsService) { }

  ngOnInit() {
    this.getTicketList(this.openTicketFilter);
  }

  handleChange(e) {
    let index = e.index;
    let filter;
    switch (index) {
      case 0:
        filter = this.openTicketFilter;
        break;
      case 1:
        filter = this.assignedTicketFilter;
        break;
      case 2:
        filter = this.openTicketFilter;
        break;
      case 3:
        filter = this.wordOnProgressTicketFilter;
        break;
      case 4:
        filter = this.closedTicketFilter;
        break;
    }
    this.getTicketList(filter);
  }


  getTicketList(ticketFilters:SearchTicketsContainer){
    this.ticketService.getTicketsByFilter(ticketFilters).subscribe(
      result => {
        this.ticketsResult =  result;
        this.ticketList = result.content;
      }
    );
  }


}

import {Component, Input, OnInit} from '@angular/core';
import {TicketsService} from '../../../../shared/services/tickets.service';
import {Ticket} from '../../../../shared/model/ticket';
import {UtilsService} from '../../../../shared/services/utils.service';
import {MenuItem} from "primeng/api";
import {TicketActions} from "../../../../shared/model/ticketActions";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {

  @Input() ticketID: number;

  ticket: Ticket;
  items: MenuItem[] =[];
  actionItem : MenuItem ={};
  actionsItems : MenuItem[] = [];
  ticketActionList: TicketActions[] = [];
  constructor(public utils: UtilsService, private ticketHttp: TicketsService) {

  }

  ngOnInit() {

    this.prepareMenuItems();

    if (this.ticketID !== undefined) {
      this.ticketHttp.getTicketByID(this.ticketID).subscribe(value => {
        this.ticket = value;
      }, error1 => {
        console.log(JSON.stringify(error1));
      });
    }


  }


  onSelectAction(){

  }


  prepareMenuItems(){

    let self = this;
    this.ticketActionList.forEach(function (ticketAction) {
      let menuItem : MenuItem = {};
      menuItem.label = ticketAction.englishLabel;
      menuItem.command = (event: any) => {this.onSelectAction();};
      self.actionsItems.push(menuItem);
      console.log(ticketAction);
    });

    this.actionItem.label ="Actions";
    this.actionItem.icon ="fa fa-cogs";
    this.actionItem.items = this.actionsItems;

    this.items.push(this.actionItem);

  }
}

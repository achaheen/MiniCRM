import {Component, Input, OnInit} from '@angular/core';
import {TicketsService} from '../../../../shared/services/tickets.service';
import {Ticket} from '../../../../shared/model/ticket';
import {UtilsService} from '../../../../shared/services/utils.service';
import {MenuItem} from 'primeng/api';
import {TicketActions} from '../../../../shared/model/ticketActions';
import {forEach} from '@angular/router/src/utils/collection';
import {utils} from 'protractor';
import {TicketLock} from '../../../../shared/model/ticket-lock';
import {TicketsComponent} from '../../tickets.component';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {

  @Input() ticketID: number;
  @Input() ticketListParent: TicketsComponent;
  public ticket: Ticket;
  items: MenuItem[] = [];
  actionItem: MenuItem = {};
  actionsItems: MenuItem[] = [];
  ticketActionList: TicketActions[] = [];
  selectedTicketAction: TicketActions;
  ticketLock: TicketLock;

  constructor(public utils: UtilsService, private ticketHttp: TicketsService) {
  }

  ngOnInit() {
    if (this.ticketID !== undefined) {
      this.ticketHttp.getTicketByID(this.ticketID).subscribe(value => {
        this.ticket = value;
        this.ticketHttp.getAuthorizedActionsByTicket(this.ticket.id).subscribe(value1 => {
          this.ticketActionList = value1;
          this.prepareMenuItems();
        }, error1 => {
          console.log(`cannot get available actions for ticket ${this.ticket.id} , error ${JSON.stringify(error1)}`);
        });
      }, error1 => {
        console.log(JSON.stringify(error1));
      });
    }
  }

  onSelectAction(menuItem) {
    console.log(JSON.stringify(menuItem));
    if (menuItem != null) {
      try {
        const actionID = Number(menuItem.item['id']);
        console.log('action ID ' + actionID);
        this.selectedTicketAction = this.utils.findAction(actionID);
        if (this.selectedTicketAction != null) {
          this.ticketHttp.getLock(this.ticket.id, this.selectedTicketAction.actionID).subscribe(value => {
            this.ticketLock = value;
            this.ticket = this.ticketLock.ticketID;
          }, error1 => this.ticketLock = null)
          ;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  prepareMenuItems() {
    this.items = [];
    this.actionItem = {};
    this.actionsItems = [];
    if (this.ticketActionList != null) {
      this.ticketActionList.forEach(value => {
        const menuItem: MenuItem = {
          label: this.utils.printLocLabel(value),
          id: value.actionID.toString(),
          command: (event: any) => {
            this.onSelectAction(event);
          }
        };
        this.actionsItems.push(menuItem);
      });
    }
    this.actionItem.label = 'Actions';
    this.actionItem.icon = 'fa fa-cogs';
    this.actionItem.id = '0';
    this.actionItem.items = this.actionsItems;
    this.items.push(this.actionItem);
  }
}

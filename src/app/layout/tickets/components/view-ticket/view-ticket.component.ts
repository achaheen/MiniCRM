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
import {Configuration} from '../../../../shared/model/configuration';

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
  mainCatConfigurations: Configuration;

  constructor(public utils: UtilsService, private ticketHttp: TicketsService) {
  }

  ngOnInit() {
    if (this.ticketID !== undefined) {
      this.ticketHttp.getTicketByID(this.ticketID).subscribe(value => {
        this.ticket = value;
        this.getAuthorizedActions();
        this.getConfigurations();
      }, error1 => {
        console.log(JSON.stringify(error1));
      });
    }
  }

  getAuthorizedActions() {
    this.ticketHttp.getAuthorizedActionsByTicket(this.ticket.id).subscribe(value1 => {
      this.ticketActionList = value1;
      this.prepareMenuItems();
    }, error1 => {
      console.log(`cannot get available actions for ticket ${this.ticket.id} , error ${JSON.stringify(error1)}`);
    });
  }

  onSelectAction(menuItem) {
    // console.log(JSON.stringify(menuItem));
    if (menuItem != null) {
      this.ticketLock = null;
      try {
        const actionID = Number(menuItem.item['id']);
        console.log('action ID ' + actionID);
        this.selectedTicketAction = this.utils.findAction(actionID);
        this.ticketHttp.validateAuthorizedAction(this.ticket.id, actionID).subscribe(value => {
          if (value) {
            if (this.selectedTicketAction != null) {
              this.ticketHttp.getLock(this.ticket.id, this.selectedTicketAction.actionID).subscribe(value1 => {
                this.ticketLock = value1;
                this.ticket = this.ticketLock.ticketID;
              }, error1 => {
                this.ticketLock = null;
                console.log(JSON.stringify(error1));

                if (error1.error.lockID !== undefined) {
                  this.utils.translateService.get(['TicketIsLocked', 'ErrorMSG'], {
                    'user': error1.error.userID, 'date': new Date(error1.error.expiresOn)
                  }).subscribe(langs => {
                    this.utils.messageService.error(langs['ErrorMSG'], langs['TicketIsLocked']);
                  });
                } else {
                  this.utils.messageService.printError(error1);
                }

              });
            }
          } else {
            this.getAuthorizedActions();
          }
        });
      } catch (e) {
        console.log(e);
        this.utils.messageService.printError(e);
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

  getConfigurations() {
    if (this.ticket.topic.subCategory.mainCategory.configuration != null && this.ticket.topic.subCategory.mainCategory.id != null) {
      this.mainCatConfigurations = this.ticket.topic.subCategory.mainCategory.configuration;
      if (this.mainCatConfigurations != null && this.mainCatConfigurations.fields != null) {
        this.mainCatConfigurations.slicedFields = [[]];
        if (this.mainCatConfigurations.fields.length <= 4) {
          this.mainCatConfigurations.slicedFields = [this.mainCatConfigurations.fields];
        } else {
          this.mainCatConfigurations.slicedFields = this.utils.chunkArray(this.mainCatConfigurations.fields, 3);
        }
      }
    } else {
      this.mainCatConfigurations = null;
    }
  }

}

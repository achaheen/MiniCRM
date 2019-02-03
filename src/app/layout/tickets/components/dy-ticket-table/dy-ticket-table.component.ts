import {Component, Input, OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {SearchTicketsContainer} from "../../../../shared/model/searchTicketsContainer";
import {MessageService} from "primeng/api";
import {TicketsService} from "../../../../shared/services/tickets.service";
import {SearchTicketsResult} from "../../../../shared/model/searchTicketsResult";
import {Ticket} from "../../../../shared/model/ticket";

@Component({
  selector: 'app-dy-ticket-table',
  templateUrl: './dy-ticket-table.component.html',
  styleUrls: ['./dy-ticket-table.component.scss'],
  providers: [MessageService]
})
export class DyTicketTableComponent implements OnInit {

  constructor(private fb: FormBuilder,private messageServie: MessageService, private ticketsService: TicketsService) { }

//Global Variables
  cols: any[];
  @Input() ticketFilters: SearchTicketsContainer;
  ticketForm : FormGroup;
  ticketsResult: SearchTicketsResult;
  ticketList: Ticket[];
  selectedTicket: Ticket;
//End Global Variables

// Class Init
  ngOnInit() {
  this.getTicketList()
  this.initDataTable();
  this.initFormBuilder();
  }



  getTicketList(){
   this.ticketsService.getTicketsByFilter(this.ticketFilters).subscribe(
      result => {
        this.ticketsResult =  result;
        this.ticketList = result.content;
      }
    );
  }

  initDataTable(){
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'topic', header: 'Topic' },
      { field: 'currentStatus', header: 'Current Status' },
      { field: 'subject', header: 'Subject' },
      { field: 'ticketType', header: 'Ticket Type' },
      { field: 'assignedTo', header: 'Assigned To' },
      { field: 'escalationCalDate', header: 'Escalation Date' },
      { field: 'crossedMainSLA', header: 'Crossed Main SLA' },
      { field: 'lastSLA', header: 'Last SLA' }];
  }
  initFormBuilder() {

    this.ticketForm = this.fb.group({
      'userID': new FormControl('',  Validators.required ),
      'staffID': new FormControl('', Validators.required),
      'title': new FormControl(''),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'department': new FormControl(''),
      'userType': new FormControl('', Validators.required),
      'enabled': new FormControl(''),
      'email': new FormControl('', Validators.compose([Validators.required,Validators.email] )),
      'password': new FormControl('', Validators.required)
    });


  }
}

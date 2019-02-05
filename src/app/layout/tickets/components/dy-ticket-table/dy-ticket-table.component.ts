import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {SearchTicketsContainer} from "../../../../shared/model/searchTicketsContainer";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {TicketsService} from "../../../../shared/services/tickets.service";
import {SearchTicketsResult} from "../../../../shared/model/searchTicketsResult";
import {Ticket} from "../../../../shared/model/ticket";
import { trigger,state,style,transition,animate } from '@angular/animations';
import {SearchTicketsSorting} from "../../../../shared/model/searchTicketsSorting";




@Component({
  selector: 'app-dy-ticket-table',
  templateUrl: './dy-ticket-table.component.html',
  styleUrls: ['./dy-ticket-table.component.scss'],
  providers: [MessageService],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class DyTicketTableComponent implements OnInit {

  constructor(private fb: FormBuilder,private messageServie: MessageService, private ticketsService: TicketsService) { }


 @Output() eventEmitter: EventEmitter<SearchTicketsContainer> = new EventEmitter();


  cols: any[];
  sortCols: any[];
  @Input() ticketFilters: SearchTicketsContainer;
  @Input() ticketList: Ticket[] = [];
  @Input() totalRecords: number;
  ticketForm : FormGroup;
 // @Input() ticketsResult: SearchTicketsResult = {};
  selectedTicket: Ticket;


// Class Init
  ngOnInit() {
//  this.getTicketList()
  this.initDataTable();
  this.initFormBuilder();
  }



  initDataTable(){
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'mainCategory', header: 'Main Categ' },
      { field: 'subCategory', header: 'Sub Categ' },
      { field: 'topic', header: 'Topic' },
      { field: 'currentStatus', header: 'Status' },
      { field: 'ticketType', header: 'Type'},
      { field: 'assignedTo', header: 'Assigned To' },
      { field: 'creationDate', header: 'Create Date' }];

    this.sortCols= [
      { field: 'id', header: 'ID' },{header: 'Main Categ'},{header: 'Sub Categ'},
      { field: 'topic', header: 'Topic' },
      { field: 'currentStatus', header: 'Status' },
      { field: 'ticketType', header: 'Type'},
      { field: 'assignedTo', header: 'Assigned To' },
      { field: 'creationDate', header: 'Create Date' }];
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


  loadCarsLazy(event: LazyLoadEvent) {
    console.log(JSON.stringify(event))

    let pageNum = (event.first / event.rows);
    this.ticketFilters.page = pageNum;
    let sortField:SearchTicketsSorting = { sortBy:event.sortField , sortType:event.sortOrder};
    this.ticketFilters.sorting = sortField;

    this.eventEmitter.emit(this.ticketFilters);
    

  }

}

import { Component, OnInit } from '@angular/core';
import {SearchTicketsContainer} from "../../shared/model/searchTicketsContainer";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  openTicketFilter:SearchTicketsContainer[] = [
    {status:[1], createdBy:['admin'],types:[1,2,3]}
    ];
  closedTicketFilter:SearchTicketsContainer[] = [
     {status:[2], createdBy:['admin'],types:[1,2,3]}
  ];
  wordOnProgressTicketFilter:SearchTicketsContainer[] = [
    {status:[3], createdBy:['admin'],types:[1,2,3]}
  ];
  assignedTicketFilter:SearchTicketsContainer[] = [
     {status:[4], createdBy:['admin'],types:[1,2,3]}
  ];


  constructor() { }

  ngOnInit() {

  }

}

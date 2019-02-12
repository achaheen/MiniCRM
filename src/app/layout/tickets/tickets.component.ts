import {Component, OnInit} from '@angular/core';
import {SearchTicketsContainer} from '../../shared/model/searchTicketsContainer';
import {TicketsService} from '../../shared/services/tickets.service';
import {Ticket} from '../../shared/model/ticket';
import {SearchTicketsResult} from '../../shared/model/searchTicketsResult';
import {MainCategory} from '../../shared/model/mainCategory';
import {Subcategory} from '../../shared/model/subcategory';
import {Topic} from '../../shared/model/topic';
import {MainCategoryService} from '../../shared/services/main-category.service';
import {SubCategoryService} from '../../shared/services/sub-category.service';
import {TopicService} from '../../shared/services/topic.service';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../shared/model/user';
import {environment} from '../../../environments/environment';
import {Status} from '../../shared/model/status';
import {BasicTopicSelection} from '../general/basic-topic-selection';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent extends BasicTopicSelection implements OnInit {
  defaultPageSize = 10;
  openTicketFilter: SearchTicketsContainer = {'status': [1], 'size': this.defaultPageSize, page: 0};
  escalatedTicketFilter: SearchTicketsContainer = {'status': [8], 'size': this.defaultPageSize, page: 0};
  closedTicketFilter: SearchTicketsContainer = {'status': [3], 'size': this.defaultPageSize, page: 0};
  wordOnProgressTicketFilter: SearchTicketsContainer = {'status': [2], 'size': this.defaultPageSize, page: 0};
  assignedTicketFilter: SearchTicketsContainer = {'assignedTo': [this.getCurrentUserID()], 'size': this.defaultPageSize, page: 0};
  ticketList: Ticket[];
  totalRecords = 0;
  ticketsResult: SearchTicketsResult;
  mainCategories: MainCategory[];
  selectedMainCategory: MainCategory;
  subCategories: Subcategory[];
  selectedSubCategory: Subcategory;
  topics: Topic[];
  selectedTopic: Topic;
  selectedFilter: SearchTicketsContainer = this.openTicketFilter;

  items: any[];
  selectedTab = 0;
  selectedTicketId: number;
  disableViewTicketBTN = true;
  disableEditTicketBTN = true;
  disableCreateTicketBTN = false;

  constructor(public ticketService: TicketsService, public mainCategoryService: MainCategoryService,
              public subCategoryService: SubCategoryService, public topicService: TopicService,
              public  translate: TranslateService) {
    super(topicService, subCategoryService, mainCategoryService, null);

    this.enableAdminSelection = false;
  }

  ngOnInit() {

    this.getTicketList(this.openTicketFilter);
    this.listAllMainCategories();

    this.items = [

      {
        header: 'All Tickets',
        content: 'Tab 2 Content',
        closable: false,
        type: 'filters',
        ticketFilter: this.openTicketFilter
      },

      {
        header: 'Assigned Tickets',
        content: 'Tab 1 Content',
        closable: false,
        type: 'filters',
        ticketFilter: this.assignedTicketFilter
      },

      {
        header: 'Opened Tickets',
        content: 'Tab 2 Content',
        closable: false,
        type: 'filters',
        ticketFilter: this.openTicketFilter
      },

      {
        header: 'Work On Progress Tickets',
        content: 'Tab 2 Content',
        closable: false,
        type: 'filters',
        ticketFilter: this.openTicketFilter
      },

      {
        header: 'Closed Tickets',
        content: 'Tab 2 Content',
        closable: false,
        type: 'filters',
        ticketFilter: this.openTicketFilter
      },

      {
        header: 'Advanced Search',
        content: 'Tab 2 Content',
        closable: false,
        type: 'filters',
        ticketFilter: null
      },
      {
        header: 'Escalated Tickets',
        content: 'Tab 1 Content',
        closable: false,
        type: 'filters',
        ticketFilter: this.escalatedTicketFilter
      }

    ];

  }

  handleChange(e) {
    const index = e.index;

    switch (index) {
      case 0:
        this.selectedFilter = this.openTicketFilter;
        break;
      case 1:
        this.selectedFilter = this.assignedTicketFilter;
        break;
      case 2:
        this.selectedFilter = this.openTicketFilter;
        break;
      case 3:
        this.selectedFilter = this.wordOnProgressTicketFilter;
        break;
      case 4:
        this.selectedFilter = this.closedTicketFilter;
        break;
      case 6:
        this.selectedFilter = this.escalatedTicketFilter;
        break;
    }
    this.getTicketList(this.selectedFilter);
  }

  getTicketList(ticketFilters: SearchTicketsContainer) {
    this.ticketService.getTicketsByFilter(ticketFilters).subscribe(
      result => {
        this.ticketsResult = result;
        this.ticketList = result.content;
        this.totalRecords = result.totalElements;
      }
    );
  }

  catchEvent(filter: SearchTicketsContainer) {
    this.getTicketList(filter);
  }

  applyGlobalFilter() {
    if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
      const mainCategory = this.selectedMainCategory.id;
      this.selectedFilter.mainCats = [mainCategory];
    } else {
      this.selectedFilter.mainCats = [];
    }

    if (this.selectedSubCategory != null && this.selectedSubCategory.id != null) {
      const subCategory = this.selectedSubCategory.id;
      this.selectedFilter.subCats = [subCategory];
    } else {
      this.selectedFilter.subCats = [];
    }

    if (this.selectedTopic != null && this.selectedTopic.id != null) {
      const topic = this.selectedTopic.id;
      this.selectedFilter.topics = [topic];
    } else {
      this.selectedFilter.topics = [];
    }
    this.getTicketList(this.selectedFilter);
  }

  setSelectedTicket(ticketID: number) {

    this.selectedTicketId = ticketID;
    if (this.selectedTicketId != null) {
      this.disableViewTicketBTN = false;
      this.disableEditTicketBTN = false;
    } else {
      this.disableViewTicketBTN = true;
      this.disableEditTicketBTN = true;
    }
  }

  activeIndexChange() {
    this.selectedTab = this.items.length - 1;
  }

  getCurrentUserID(): string {
    const user: User = JSON.parse(localStorage.getItem(environment.currentUser)) as User;
    return user.userID;
  }

  handleClose(event) {
    this.items.splice(event['index'], 1);
    this.selectedTab = 0;
  }


  openTicketForView(event: Event) {
    // check id the ticket is already opened
    // if opened -> activate its tab
    let itemAlreadyFound = false;
    let itemIndex = 0;

    for (let i = 0; i <= this.items.length - 1; i++) {
      console.log(this.items[i].header);
      if (this.items[i].header == this.selectedTicketId) {
        itemAlreadyFound = true;
        itemIndex = i;
        break;
      }
    }

    if (!itemAlreadyFound) {
      this.items.push({
        header: this.selectedTicketId, content: 'Dynamic Tab Content', closable: true,
        type: 'viewTicket',
        ticketFilter: null
      });
      setTimeout(() => {
        this.activeIndexChange();
      }, 10);
    } else {
      this.selectedTab = itemIndex;
    }
  }


  openTicketForEdit() {

    // check id the ticket is already opened
    // if opened -> activate its tab
    let itemAlreadyFound = false;
    let itemIndex = 0;

    for (let i = 0; i <= this.items.length - 1; i++) {
      console.log(this.items[i].header);
      if (this.items[i].header == this.selectedTicketId) {
        itemAlreadyFound = true;
        itemIndex = i;
        break;
      }
    }

    if (!itemAlreadyFound) {
      this.items.push({
        header: this.selectedTicketId, content: 'Dynamic Tab Content', closable: true,
        type: 'viewTicket',
        ticketFilter: null
      });
      setTimeout(() => {
        this.activeIndexChange();
      }, 10);
    } else {
      this.selectedTab = itemIndex;
    }

  }

  createNewTicket() {

    // check id the ticket is already opened
    // if opened -> activate its tab
    let itemAlreadyFound = false;
    let itemIndex = 0;

    for (let i = 0; i <= this.items.length - 1; i++) {
      console.log(this.items[i].header);
      if (this.items[i].header === 'New Ticket') {
        itemAlreadyFound = true;
        itemIndex = i;
        break;
      }
    }

    if (!itemAlreadyFound) {
      this.items.push({
        header: 'New Ticket', content: 'Dynamic Tab Content', closable: true,
        type: 'NewTicket',
        ticketFilter: null
      });
      setTimeout(() => {
        this.activeIndexChange();
      }, 10);
    } else {
      this.selectedTab = itemIndex;
    }
  }
}



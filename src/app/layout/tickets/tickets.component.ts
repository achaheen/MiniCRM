import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerSearchContainer, SearchTicketsContainer} from '../../shared/model/searchTicketsContainer';
import {TicketsService} from '../../shared/services/tickets.service';
import {Ticket} from '../../shared/model/ticket';
import {SearchTicketsResult} from '../../shared/model/searchTicketsResult';
import {MainCategoryService} from '../../shared/services/main-category.service';
import {SubCategoryService} from '../../shared/services/sub-category.service';
import {TopicService} from '../../shared/services/topic.service';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../shared/model/user';
import {environment} from '../../../environments/environment';
import {BasicTopicSelection} from '../general/basic-topic-selection';
import {UtilsService} from '../../shared/services/utils.service';
import {AbstractSharedDataClass} from '../user-profile/abstract-shared-data-class';
import {Subscription} from 'rxjs';
import {SharedCustomerInfoService} from '../../shared/services/shared-customer-info.service';
import {CustomerProfile} from '../../shared/model/customerProfile';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent extends BasicTopicSelection implements OnInit, OnDestroy {
  public subscription: Subscription;

  defaultPageSize = 10;
  openTicketFilter: SearchTicketsContainer = {
    'status': [1, 6],
    'size': this.defaultPageSize,
    page: 0,
    sorting: {sortBy: 'priority', sortType: 1}
  };
  escalatedTicketFilter: SearchTicketsContainer = {'status': [8], 'size': this.defaultPageSize, page: 0};
  closedTicketFilter: SearchTicketsContainer = {'status': [2], 'size': this.defaultPageSize, page: 0};
  workOnProgressTicketFilter: SearchTicketsContainer = {'status': [3], 'size': this.defaultPageSize, page: 0};
  nonFilteredTickets: SearchTicketsContainer = {'size': this.defaultPageSize, page: 0};
  createdTicketsFilter: SearchTicketsContainer = {createdBy: [this.getCurrentUserID()], size: this.defaultPageSize, page: 0};
  customerTicketFilter: SearchTicketsContainer = {
    'size': this.defaultPageSize,
    page: 0,
    customerContainer: {}
    , sorting: {sortType: 1, sortBy: 'creationDate'}
  };
  ticketList: Ticket[];
  totalRecords = 0;
  ticketsResult: SearchTicketsResult;
  selectedFilter: SearchTicketsContainer;
  previousTab = 0;
  items: any[];
  selectedTab = 0;
  selectedTicketId: number;
  disableViewTicketBTN = true;
  disableEditTicketBTN = true;
  disableCreateTicketBTN = false;
  customerProfile: CustomerProfile = null;

  constructor(public ticketService: TicketsService, public mainCategoryService: MainCategoryService,
              public subCategoryService: SubCategoryService, public topicService: TopicService,
              public sharedInfoService: SharedCustomerInfoService,
              public  translate: TranslateService, public utils: UtilsService) {
    super(topicService, subCategoryService, mainCategoryService, utils);
    this.enableAdminSelection = false;
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.listAllMainCategories();
    this.items = [];
    this.subscription = this.sharedInfoService.currentSubject.subscribe(value => {
      if (value !== null && value !== '') {
        this.customerProfile = value as CustomerProfile;
        const customerContainer: CustomerSearchContainer = {
          customerBasic: this.customerProfile.basicNumber,
          nan: this.customerProfile.idNumber
        };
        this.customerTicketFilter.customerContainer = customerContainer;
        this.items.push(
          {
            header: this.utils.translateService.instant('CustomerTickets'),
            content: '',
            closable: true,
            type: 'filters',
            ticketFilter: this.customerTicketFilter
            , ticketsTab: true
          });
        this.selectedFilter = this.customerTicketFilter;
      }
      this.buildTabs();
      if (this.selectedFilter == null) {
        this.selectedFilter = this.nonFilteredTickets;
      }
      this.getTicketList(this.selectedFilter);
    });
  }

  buildTabs() {
    this.items.push(
      {
        header: this.utils.translateService.instant('NonFilteredTicketTab'),
        content: '',
        closable: true,
        type: 'filters',
        ticketFilter: this.nonFilteredTickets
        , ticketsTab: true
      },
      {
        header: this.utils.translateService.instant('WorkOnProgressTab'),
        content: '',
        closable: true,
        type: 'filters',
        ticketFilter: this.workOnProgressTicketFilter, ticketsTab: true
      },
      {
        header: this.utils.translateService.instant('EscalatedTicketsTab'),
        content: '',
        closable: true,
        type: 'filters',
        ticketFilter: this.escalatedTicketFilter, ticketsTab: true
      },

      {
        header: this.utils.translateService.instant('OpenedTicketsTab'),
        content: '',
        closable: true,
        type: 'filters',
        ticketFilter: this.openTicketFilter, ticketsTab: true
      },

      {
        header: this.utils.translateService.instant('ClosedTicketsTab'),
        content: '',
        closable: true,
        type: 'filters',
        ticketFilter: this.closedTicketFilter, ticketsTab: true
      },
      {
        header: this.utils.translateService.instant('CreatedTicketsTab'),
        content: '',
        closable: true,
        type: 'filters',
        ticketFilter: this.createdTicketsFilter, ticketsTab: true
      }
    );
  }

  handleChange(e) {
    // console.log(JSON.stringify(e));
    const index = e.index;

    if (index != null && index < this.items.length) {
      this.previousTab = index;
      this.selectedFilter = this.items[index].ticketFilter;
      this.getTicketList(this.selectedFilter);
    }
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
    this.selectedTab = this.previousTab;
  }


  openTicketForView(event: Event) {
    // check id the ticket is already opened
    // if opened -> activate its tab
    let itemAlreadyFound = false;
    let itemIndex = 0;

    for (let i = 0; i <= this.items.length - 1; i++) {
      if (this.items[i].header === this.selectedTicketId) {
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
      if (this.items[i].header === this.selectedTicketId) {
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



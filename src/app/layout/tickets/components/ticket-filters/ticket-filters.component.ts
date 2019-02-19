import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasicTopicSelection} from '../../../general/basic-topic-selection';
import {MainCategoryService} from '../../../../shared/services/main-category.service';
import {SubCategoryService} from '../../../../shared/services/sub-category.service';
import {TopicService} from '../../../../shared/services/topic.service';
import {TranslateService} from '@ngx-translate/core';
import {UtilsService} from '../../../../shared/services/utils.service';
import {SearchTicketsContainer} from '../../../../shared/model/searchTicketsContainer';
import {Type} from '../../../../shared/model/type';
import {Status} from '../../../../shared/model/status';
import {Priority} from '../../../../shared/model/priority';

@Component({
  selector: 'app-ticket-filters',
  templateUrl: './ticket-filters.component.html',
  styleUrls: ['./ticket-filters.component.scss']
})
export class TicketFiltersComponent extends BasicTopicSelection implements OnInit {
  @Input() defaultPageSize = 10;
  @Input() selectedFilter: SearchTicketsContainer = {};
  @Input() parent: any;
  @Output() eventEmitter: EventEmitter<SearchTicketsContainer> = new EventEmitter();
  customerBasic: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  customerSegment: string;
  customerBranch: string;
  startDate: Date;
  endDate: Date;
  nan: string;
  status: any;

  ticketType: Type;
  ticketStatus: Status;
  // ticketChannel: Ticket;
  ticketPriority: Priority;

  constructor(public mainCategoryService: MainCategoryService,
              public subCategoryService: SubCategoryService, public topicService: TopicService,
              public  translate: TranslateService, public utils: UtilsService) {
    super(topicService, subCategoryService, mainCategoryService, utils);
  }

  ngOnInit() {
  }

  applyFilter() {
    if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
      const mainCategory = this.selectedMainCategory.id;
      this.selectedFilter.mainCats = [mainCategory];
    } else {
      this.selectedFilter.mainCats = undefined;
    }

    if (this.selectedSubCategory != null && this.selectedSubCategory.id != null) {
      const subCategory = this.selectedSubCategory.id;
      this.selectedFilter.subCats = [subCategory];
    } else {
      this.selectedFilter.subCats = undefined;
    }

    if (this.selectedTopic != null && this.selectedTopic.id != null) {
      const topic = this.selectedTopic.id;
      this.selectedFilter.topics = [topic];
    } else {
      this.selectedFilter.topics = undefined;
    }
    this.selectedFilter.customerContainer = {};
    if (this.validateString(this.customerMobile)) {
      this.selectedFilter.customerContainer.customerMobile = this.customerMobile;
    }
    if (this.validateString(this.customerSegment)) {
      this.selectedFilter.customerContainer.customerSegment = this.customerSegment;
    }
    if (this.validateString(this.customerName)) {
      this.selectedFilter.customerContainer.customerName = this.customerName;
    }
    if (this.validateString(this.customerEmail)) {
      this.selectedFilter.customerContainer.customerEmail = this.customerEmail;
    }
    if (this.validateString(this.customerBranch)) {
      this.selectedFilter.customerContainer.customerBranch = this.customerBranch;
    }
    if (this.validateString(this.customerBasic)) {
      this.selectedFilter.customerContainer.customerBasic = this.customerBasic;
    }
    if (this.validateString(this.nan)) {
      this.selectedFilter.customerContainer.nan = this.nan;
    }
    if (this.ticketType != null && this.ticketType.typeID != null) {
      this.selectedFilter.types = [this.ticketType.typeID];
    }
    if (this.ticketStatus != null && this.ticketStatus.id != null) {
      this.selectedFilter.status = [this.ticketStatus.id];
    }
    if (this.ticketPriority != null) {
      this.selectedFilter.priority = [this.ticketPriority.priorityValue];
    }
    if (this.startDate != null) {
      this.selectedFilter.startDate = this.startDate;
    }
    if (this.endDate != null) {
      this.selectedFilter.endDate = this.endDate;
    }
    // this.eventEmitter.emit(this.selectedFilter);
    this.parent.getTicketList(this.selectedFilter);
  }

  clear() {
    this.customerBasic = null;
    this.customerBranch = null;
    this.customerEmail = null;
    this.customerMobile = null;
    this.customerName = null;
    this.customerSegment = null;
    this.selectedMainCategory = null;
    this.selectedSubCategory = null;
    this.selectedTopic = null;
    this.ticketType = null;
    this.ticketPriority = null;
    this.ticketStatus = null;
    this.startDate = null;
    this.endDate = null;
    this.listAllMainCategories();
  }

  validateString(value: string): boolean {
    if (value !== undefined && value !== null && value !== '') {
      return true;
    }
    return false;
  }
}

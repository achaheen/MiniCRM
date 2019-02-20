import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Status} from '../model/status';
import {Action} from '../model/action';
import {Type} from '../model/type';
import {Priority} from '../model/priority';
import {LabelEnabled} from '../model/label-enabled';
import {MainCategory} from '../model/mainCategory';
import {Topic} from '../model/topic';
import {TranslateService} from '@ngx-translate/core';
import {TicketActions} from '../model/ticketActions';
import {Ticket} from '../model/ticket';
import {SelectItem} from 'primeng/api';
import {SourceChannel} from '../model/source-channel';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  statusList: Status[];
  actionList: TicketActions[];
  typesList: Type[];
  priorityList: Priority[];
  channelList: SourceChannel[];
  statusListSelectItems: SelectItem[] = [];
  typesListSelectItems: SelectItem[] = [];
  priorityListSelectItems: SelectItem[] = [];
  channelListSelectItems: SelectItem[] = [];

  constructor(public translateService: TranslateService) {
    this.statusList = JSON.parse(localStorage.getItem(environment.ticketStatusList)) as Status[];
    this.actionList = JSON.parse(localStorage.getItem(environment.ticketActionsList)) as TicketActions[];
    this.typesList = JSON.parse(localStorage.getItem(environment.ticketTypeList)) as Type[];
    this.typesList.unshift({'typeID': null, 'englishLabel': 'Select Ticket Type', arabicLabel: 'برجاء اختيار نوع الطلب'});
    this.priorityList = JSON.parse(localStorage.getItem(environment.ticketPriorityList)) as Priority[];
    this.priorityList.unshift({'priorityValue': null, 'priority': 'Select Priority'});
    this.channelList = JSON.parse(localStorage.getItem(environment.ticketChannelList)) as SourceChannel[];
    this.channelList.unshift({channelID: null, arabicLabel: 'برجاء اختبار المصدر', englishLabel: 'Select Source Channel'});

    this.initSelectItemLists();
  }

  initSelectItemLists() {
    this.getPriorityListAsSelectItems();
    this.getChannelsListAsSelectItems();
    this.getTicketTypesListAsSelectItems();
    this.getStatusListAsSelectItems();
  }

  getStatusListAsSelectItems() {
    this.statusListSelectItems = [];
    if (this.statusList != null) {

      this.statusList.forEach(value => {
        const item: SelectItem = {label: value[this.getLabelNameLoc(value)], value};
        this.statusListSelectItems.push(item);
      });
    }
  }

  getChannelsListAsSelectItems() {
    this.channelListSelectItems = [];
    if (this.channelList != null) {
      const list: SelectItem[] = [];
      this.channelList.forEach(value => {
        const item: SelectItem = {label: value[this.getLabelNameLoc(value)], value};
        this.channelListSelectItems.push(item);
      });
    }
  }

  getPriorityListAsSelectItems() {
    this.priorityListSelectItems = [];
    if (this.priorityList != null) {
      this.priorityList.forEach(value => {
        const item: SelectItem = {label: value.priority, value};
        this.priorityListSelectItems.push(item);
      });
    }
  }

  getTicketTypesListAsSelectItems() {
    this.typesListSelectItems = [];
    if (this.typesList != null) {
      this.typesList.forEach(value => {
        const item: SelectItem = {label: value[this.getLabelNameLoc(value)], value};
        this.typesListSelectItems.push(item);
      });
    }
  }

  findStatus(id: number) {
    const status = this.statusList.find(x => x.id == id);
    return (status != null && status !== undefined ? status.englishLabel : '');
  }

  findType(id: number) {
    const type = this.typesList.find(x => x.typeID == id);
    return (type != null && type !== undefined ? type.englishLabel : '');
  }

  findPriority(id: number) {
    const priority = this.priorityList.find(x => x.priorityValue == id);
    return (priority != null && priority != undefined ? priority.priority : '');
  }

  findActionAsString(id: number) {
    const action = this.findAction(id);
    return (action != null && action !== undefined ? this.printLocLabel(action) : '');
  }

  findAction(id: number): TicketActions {
    return this.actionList.find(value => id === value.actionID);
  }

  printLocLabel(labelObj: LabelEnabled): string {
    if (labelObj !== undefined && labelObj !== null) {
      // console.log('printing ' + JSON.stringify(labelObj));
      const lang: string = localStorage.getItem(environment.language);

      if (lang === null || lang === '' || lang === 'en') {
        return labelObj.englishLabel;
      } else {
        return labelObj.arabicLabel;
      }

    }

    return '';
  }

  getLabelNameLoc(labelObj: LabelEnabled): string {
    if (labelObj !== undefined && labelObj !== null) {
      // console.log('printing ' + JSON.stringify(labelObj));
      const lang: string = localStorage.getItem(environment.language);

      if (lang === null || lang === '' || lang === 'en') {
        return 'englishLabel';
      } else {
        return 'arabicLabel';
      }

    }

    return 'arabicLabel';
  }

  getMainCat(topic: Topic) {
    if (topic !== undefined && topic !== null) {
      if (!topic.subCategory !== undefined && topic.subCategory !== null) {
        if (topic.subCategory.mainCategory !== undefined && topic.subCategory.mainCategory !== null) {
          return topic.subCategory.mainCategory;
        }
      }
    }
    return null;
  }

  getSubCat(topic: Topic) {
    if (topic !== undefined && topic !== null) {
      if (!topic.subCategory !== undefined && topic.subCategory !== null) {
        return topic.subCategory;
      }
    }
    return null;
  }
}

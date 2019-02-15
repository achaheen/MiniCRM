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

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  statusList: Status[];
  actionList: TicketActions[];
  typesList: Type[];
  priorityList: Priority[];


  constructor(public translateService: TranslateService) {
    this.statusList = JSON.parse(localStorage.getItem(environment.ticketStatusList)) as Status[];
    this.actionList = JSON.parse(localStorage.getItem(environment.ticketActionsList)) as TicketActions[];
    this.typesList = JSON.parse(localStorage.getItem(environment.ticketTypeList)) as Type[];
    this.typesList.unshift({'typeID': null, 'englishLabel': 'Select Ticket Type'});
    this.priorityList = JSON.parse(localStorage.getItem(environment.ticketPriorityList)) as Priority[];
    this.priorityList.unshift({'priorityValue': null, 'priority': 'Select Priority'});

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

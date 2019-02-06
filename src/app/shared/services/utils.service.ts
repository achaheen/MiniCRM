import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Status} from '../model/status';
import {Action} from '../model/action';
import {Type} from '../model/type';
import {Priority} from '../model/priority';
import {LabelEnabled} from '../model/label-enabled';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  statusList: Status[];
  actionList: Action[];
  typesList: Type[];
  priorityList: Priority[];

  constructor() {
    this.statusList = JSON.parse(localStorage.getItem(environment.ticketStatusList)) as Status[];
    this.actionList = JSON.parse(localStorage.getItem(environment.ticketActionsList)) as Action[];
    this.typesList = JSON.parse(localStorage.getItem(environment.ticketTypeList)) as Type[];
    this.priorityList = JSON.parse(localStorage.getItem(environment.ticketPriorityList)) as Priority[];

  }

  findStatus(id: number) {
    let status = this.statusList.find(x => x.id == id);
    return (status != null && status != undefined ? status.englishLabel : '');
  }

  findType(id: number) {
    let type = this.typesList.find(x => x.typeID == id);
    return (type != null && type != undefined ? type.englishLabel : '');
  }

  findPriority(id: number) {
    let priority = this.priorityList.find(x => x.priorityValue == id);
    return (priority != null && priority != undefined ? priority.priority : '');
  }

  findAction(id: number) {
    let action = this.actionList.find(x => x.actionID == id);
    return (action != null && action != undefined ? action.englishLabel : '');
  }

  printLocLabel(labelObj: LabelEnabled): string {
    if (labelObj !== undefined && labelObj !== null) {
      const lang: string = localStorage.getItem(environment.language);

      if (lang === null || lang === '' || lang === 'en') {
        return labelObj.englishLabel;
      } else {
        return labelObj.arabicLabel;
      }

    }
    return '';

  }
}

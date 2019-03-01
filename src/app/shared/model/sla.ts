import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Escalationhistory} from './escalationhistory';
import {TopicSla} from './topicSla';


export interface Sla extends BasicModelWithIDInt {
  time?: number;
  catID?: number;
  slaname?: string;
}

export interface TopisSlaHolder {
  topicsla: TopicSla;
  usersList?: string[];
}

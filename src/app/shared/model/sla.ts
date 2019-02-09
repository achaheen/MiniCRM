import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Escalationhistory} from './escalationhistory';
import {TopicSla} from './topicSla';


export interface Sla extends  BasicModelWithIDInt {

  time?: number;
  creationDate?: Date;
  createdBy?: string;
  modifiedBy?: string;
  modificationDate?: Date;
  sLAName?: string;
  catID?: number;
  topicslaList?: TopicSla[];
  escalationhistoryList?: Escalationhistory[];

}

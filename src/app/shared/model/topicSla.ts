import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Sla} from './sla';
import {Topic} from './topic';

export interface TopicSla extends BasicModelWithIDInt {
  slaid: Sla;
  topicID: Topic;
  slalevel: number;
}



import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Sla} from './sla';
import {Topic} from './topic';

export interface TopicSla extends BasicModelWithIDInt {

  slalevel?: number;
  sLAImpl?: string;
  slaid?: Sla;
  topicID?: Topic;

}

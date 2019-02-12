import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Ticket} from './ticket';
import {Sla} from './sla';
import {TopicSla} from './topicSla';
import {Topic} from './topic';

export interface Escalationhistory {

  id?: number;
  escDateTime?: Date;
  topicSLA?: TopicSla;

}

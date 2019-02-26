import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Ticket} from './ticket';
import {TopicsPermissions} from './topicsPermissions';
import {UserTopic} from './userTopic';
import {TopicSla} from './topicSla';
import {GeneratedTopicPermissions} from './generatedTopicPermissions';
import {Subcategory} from './subcategory';
import {LabelEnabled} from './label-enabled';

export interface Topic extends BasicModelWithIDInt, LabelEnabled {
  enabled?: boolean;
  principals?: string;
  topicspermissionsList?: TopicsPermissions[];
  usertopicList?: UserTopic[];
  topicslaList?: TopicSla[];
  generatedTopicPermissionsList?: GeneratedTopicPermissions[];
  ticketList?: Ticket[];
  subCategory?: Subcategory;
}

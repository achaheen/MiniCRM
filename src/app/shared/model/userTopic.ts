import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Topic} from './topic';

export interface UserTopic extends BasicModelWithIDInt {

  userID?: string;
  status?: number;
  topicID?: Topic;

}

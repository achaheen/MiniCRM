import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {Topic} from './topic';
import {User} from './user';

export interface GeneratedTopicPermissions extends BasicModelWithIDInt {
  topic?: Topic;
  userName?: string;
  inheritedFrom?: string;
  admin?: boolean;
  canCreate?: boolean;
  canReopen?: boolean;
  canRead?: boolean;
  canDelete?: boolean;
  canReply?: boolean;
  canClose?: boolean;
  canResolve?: boolean;
  canChgDpt?: boolean;
  canAssign?: boolean;
  canModify?: boolean;
  canRunReport?: boolean;
  canSubscribe?: boolean;
  userID?: User;
}

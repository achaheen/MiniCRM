import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Topic} from "./topic";

export interface TopicsPermissions extends BasicModelWithIDInt{


  assigne?:number;
  type?:string;
  admin?:boolean;
  canCreate?:boolean;
  canReopen?:boolean;
  canRead?:boolean;
  canDelete?:boolean;
  canReply?:boolean;
  canClose?:boolean;
  canAssign?:boolean;
  canResolve?:boolean;
  canModify?:boolean;
  canChgDpt?:boolean;
  canRunReport?:boolean;
  canSubscribe?:boolean;
  topicId?:Topic;
  
  
}

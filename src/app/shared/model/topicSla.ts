import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Sla} from "./sla";
import {Topic} from "./topic";

export interface TopicSla extends BasicModelWithIDInt{

  sLALevel?:number;
  sLAImpl?:string;
  slaid?:Sla;
  topicID?:Topic;

}

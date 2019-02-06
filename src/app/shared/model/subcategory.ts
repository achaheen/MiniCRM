import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Topic} from "./topic";
import {MainCategory} from "./mainCategory";
import {LabelEnabled} from './label-enabled';

export interface Subcategory extends BasicModelWithIDInt,LabelEnabled{


  enabled?:boolean;
  topicList?:Topic[];
  mainCategory?:MainCategory;

}

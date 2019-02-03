import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Topic} from "./topic";
import {MainCategory} from "./mainCategory";

export interface Subcategory extends BasicModelWithIDInt{

  arabicLabel?:string;
  englishLabel?:string;
  enabled?:boolean;
  topicList?:Topic[];
  mainCategory?:MainCategory;

}

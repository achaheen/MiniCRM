import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Subcategory} from "./subcategory";
import {MainCatHolidays} from "./mainCatHolidays";
import {LabelEnabled} from './label-enabled';

export interface MainCategory extends BasicModelWithIDInt, LabelEnabled{
  enabled?:boolean;
  maincatholidaysList?:MainCatHolidays[];
  subcategoryList?:Subcategory[];

  
}

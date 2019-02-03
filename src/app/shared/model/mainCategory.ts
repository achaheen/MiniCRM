import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {Subcategory} from "./subcategory";
import {MainCatHolidays} from "./mainCatHolidays";

export interface MainCategory extends BasicModelWithIDInt{

  arabicLabel?:string;
  englishLabel?:string;
  enabled?:boolean;
  maincatholidaysList?:MainCatHolidays[];
  subcategoryList?:Subcategory[];

  
}

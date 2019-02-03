import {BasicModelWithIDInt} from "./basicModelWithIDInt";
import {MainCatHolidays} from "./mainCatHolidays";

export interface Holidays extends BasicModelWithIDInt{



  holidayID?:number;
  holidayName?:string;
  startDate?:Date;
  endData?:Date;
  enabled?:boolean;
  maincatholidaysList?:MainCatHolidays[];

  
}

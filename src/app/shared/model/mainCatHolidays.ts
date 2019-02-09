import {BasicModelWithIDInt} from './basicModelWithIDInt';
import {MainCategory} from './mainCategory';
import {Holidays} from './holidays';

export interface MainCatHolidays extends BasicModelWithIDInt {


  holidayID?: Holidays;
  mainCategory?: MainCategory;


}


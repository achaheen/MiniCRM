import {BasicModelWithIDInt} from './basicModelWithIDInt';

export interface Status extends BasicModelWithIDInt {


  listOrder?: number;
  enabled?: boolean;
  enableSLA?: boolean;
  displayOnTicketEdit?: boolean;
  arabicLabel?: string;
  englishLabel?: string;

}

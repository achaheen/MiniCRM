import {Topic} from './topic';

export interface TicketHistroy  {
  id: number;
  ticketID: number;
  createdBy: string;
  actionID: number;
  oldStatus?: number;
  newStatus?: number;
  oldTopic?: Topic;
  newTopic?: Topic;
  oldAssigne?: any;
  newAssigne?: any;
  creationDate: number;
  dataID?: any;
  escalationHisID?: any;
}

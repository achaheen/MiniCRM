export interface TicketHistroy  {
  id: number;
  ticketID: number;
  createdBy: string;
  actionID: number;
  oldStatus?: any;
  newStatus?: any;
  oldTopic?: any;
  newTopic?: any;
  oldAssigne?: any;
  newAssigne?: any;
  creationDate: number;
  dataID?: any;
  escalationHisID?: any;
}

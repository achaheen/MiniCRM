import {Group} from '../../shared/model/group';
import {GroupsService} from '../../shared/services/groups.service';

export class BasicGroupSelections {
  allGroups: Array<Group> = [];
  activeGroups: Array<Group> = [];

  constructor(private groupServices: GroupsService) {

  }
  public getAllGroups() {
    this.groupServices.all().subscribe(value => {
      this.allGroups = value;
      if (this.allGroups != null && this.allGroups.length > 0) {
        const group: Group = {id: 0, groupName: ''};
        this.allGroups.unshift(group);
      }
    });
  }
  public getActiveGroups() {
    this.groupServices.active().subscribe(value => {
      this.activeGroups = value;
      if (this.activeGroups != null && this.activeGroups.length > 0) {
        const group: Group = {id: 0, groupName: ''};
        this.activeGroups.unshift(group);
      }
    });
  }
}

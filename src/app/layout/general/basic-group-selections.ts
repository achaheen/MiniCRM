import {Group} from '../../shared/model/group';
import {GroupsService} from '../../shared/services/groups.service';
import {SelectItem} from 'primeng/api';

export class BasicGroupSelections {
  allGroups: Array<Group> = [];
  activeGroups: Array<Group> = [];
  public groupsOptions: SelectItem[] = [];

  constructor(private groupServices: GroupsService) {
  }

  public getAllGroups() {
    this.groupServices.all().subscribe(value => {
      this.allGroups = value;
      this.buildOptions(value);
    });
  }

  buildOptions(value) {
    if (value != null) {
      this.groupsOptions = [{value: null, label: ''}];
      value.forEach(value1 => {
        this.groupsOptions.push({value: value1, label: value1.groupName});
      });
    }
  }

  public getActiveGroups() {
    this.groupServices.active().subscribe(value => {
      this.activeGroups = value;
      this.buildOptions(value);
    });
  }
}

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/model/user';
import {SelectItem} from 'primeng/api';

export class BasicUserSelection {
  public activeUsers: Array<User> = [];
  public allUsers: Array<User> = [];

  public usersOptions: SelectItem[] = [];

  constructor(public  userServices: UsersService) {

  }

  public getAllUsers() {
    this.userServices.all().subscribe(value => {
      this.allUsers = value;
      this.buildOptions(value);
    });
  }

  public getActiveUsers() {
    this.userServices.activeUsers().subscribe(value => {
      this.activeUsers = value;
      this.buildOptions(value);
    });
  }

  buildOptions(value) {
    if (value != null) {
      this.usersOptions = [];
      this.usersOptions.push({label: '', value: null});
      value.forEach(value1 => {

        this.usersOptions.push({label: value1.firstName + ' ' + value1.lastName, value: value1});
      });
    }
  }
}

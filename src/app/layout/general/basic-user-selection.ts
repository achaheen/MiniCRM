import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/model/user';

export class BasicUserSelection {
  public activeUsers: Array<User> = [];
  public allUsers: Array<User> = [];


  constructor(public  userServices: UsersService) {

  }

  public getAllUsers() {
    this.userServices.all().subscribe(value => {
      this.allUsers = value;
      /**
       if (this.allUsers != null && this.allUsers.length > 0) {
        const user: User = {id: 0, userID: ''};
        this.allUsers.unshift(user);
      }
       */
    });
  }

  public getActiveUsers() {
    this.userServices.activeUsers().subscribe(value => {
      this.activeUsers = value;
      /**    if (this.activeUsers != null && this.activeUsers.length > 0) {
        const user: User = {id: 0, userID: ''};
        this.activeUsers.unshift(user);
      }*/
    });
  }
}

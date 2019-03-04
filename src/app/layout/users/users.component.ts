import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/model/user';
import {UsersService} from '../../shared/services/users.service';
import {MessageService} from 'primeng/api';
import {UtilsService} from "../../shared/services/utils.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]

})
export class UsersComponent implements OnInit {

  enableCreateEditMode = false;
  editMood:string;
  users: User[];
  selectedUser: User;
  cols: any[];
  blocked = true;
  ngOnInit() {
    this.getAllUsers();

    this.selectedUser = null;

    this.cols = [
      {field: 'title', header:this.utils.translateService.instant('title') },
      {field: 'userID', header:this.utils.translateService.instant( 'UserName')},
      {field: 'staffID', header: this.utils.translateService.instant('StaffNo')},
      {field: 'firstName', header: this.utils.translateService.instant('firstName')},
      {field: 'lastName', header: this.utils.translateService.instant('lastName')},
      {field: 'department', header: this.utils.translateService.instant('dept')},
      {field: 'systemUser', header: this.utils.translateService.instant('systemUser')},
      {field: 'createdBy', header: this.utils.translateService.instant('createdBy')},
      {field: 'creationDate', header: this.utils.translateService.instant('creationDate')},
      {field: 'enabled', header: this.utils.translateService.instant('enabled' )}];
  }

  getAllUsers(): void {
    this.userService.all()
      .subscribe(users => {
        this.users = users;
        this.blocked = false;
      });

  }

  handleCreateEditEvent(event) {
    if (event != null) {
      this.enableCreateEditMode = false;
    }
  }

  constructor(private userService: UsersService, private utils:UtilsService) {
  }

}

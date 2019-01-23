import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/model/user";
import {UsersService} from "../../shared/services/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users : User[];
  cols: any[];

  getAllUsers(): void {
    this.userService.all()
      .subscribe(users => this.users = users);

  }


  constructor(private userService : UsersService) { }

  ngOnInit() {
   this.getAllUsers();


    this.cols = [
      { field: 'title', header: 'title' },
      { field: 'userID', header: 'userID' },
      { field: 'staffID', header: 'staffID' },
      { field: 'firstName', header: 'firstName' },
      { field: 'lastName', header: 'lastName' },
      { field: 'department', header: 'department' },
      { field: 'systemUser', header: 'systemUser' },
      { field: 'createdBy', header: 'createdBy' },
      { field: 'creationDate', header: 'creationDate' },
      { field: 'enabled', header: 'enabled' },
    /*
      { field: 'ldapuser', header: 'ldapuser' },
          { field: 'email', header: 'email' },
    { field: 'loginAttempts', header: 'loginAttempts' },
      { field: 'modificationDate', header: 'modificationDate' },
      { field: 'modifiedBy', header: 'modifiedBy' },*/
    ];

  }

}

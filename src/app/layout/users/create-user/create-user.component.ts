import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../shared/model/role";
import {Group} from "../../../shared/model/group";
import {UserHolder} from "../../../shared/model/user-holder";
import {UsersService} from "../../../shared/services/users.service";
import {MessageService} from "primeng/api";
import {RolesService} from "../../../shared/services/roles.service";
import {GroupsService} from "../../../shared/services/groups.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {User} from "../../../shared/model/user";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  @Input() selectedUser: User;
  @Output() event: EventEmitter<Object> = new EventEmitter();
  @Input() parent: any;
  userForm: FormGroup;
  disablePassword = true;
  userType = 'ldap';
  display = false;

  editMood: string;
  disableForEdit: boolean;

  userHolder: UserHolder;
  password: string;
  selectedGroups: number[];
  selectedRoles: number[];

  userRoles: Role[];
  selectedUserRoles: Role[];

  userGroups: Group[];
  selectedUserGroups: Group[];

  constructor(private fb: FormBuilder, private userService: UsersService,
              private messageService: MessageService, private rolesService: RolesService, private groupsService: GroupsService, public utils: UtilsService) {
  }

  ngOnInit() {

    this.editMood = this.parent.editMood;

    this.userHolder = {};
    this.selectedGroups = [];
    this.selectedRoles = [];
    this.userForm = this.fb.group({
      'userID': new FormControl('', Validators.required),
      'staffID': new FormControl('', Validators.required),
      'title': new FormControl(''),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'department': new FormControl(''),
      'userType': new FormControl('', Validators.required),
      'enabled': new FormControl(''),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl('', Validators.required)
    });
    this.getSystemGroups();
    this.getSystemRoles();

     this.BindUserValues(this.editMood);

  }

  BindUserValues(editMood) {

    this.display = true;
    if (editMood != 'Edit') {
      this.disableForEdit = false;
      // const user: User = {} as any;
      this.selectedUser = {};
      this.selectedUser.enabled = true;
      if (this.userType != 'ldap') {
        this.userForm.controls.userType.setValue('system');
      } else {
        this.userForm.controls.userType.setValue('ldap');
      }
      this.bindUserToForm();
      this.togglePassword();

      this.userForm.controls['password'].setValidators(Validators.required);
      this.userForm.controls['password'].updateValueAndValidity();

    } else {
      this.disableForEdit = true;

      if (this.selectedUser.ldapuser) {
        this.userForm.controls.userType.setValue('ldap');
      } else {
        this.userForm.controls.userType.setValue('system');
        this.disablePassword = false;
      }
      this.bindUserToForm();
      this.togglePassword();
      this.userForm.controls['password'].setValidators(null);
      this.userForm.controls['password'].updateValueAndValidity();


      this.selectedUserRoles = [];
      this.selectedUserGroups = [];

      let self = this;

      this.userService.getUserGroups(this.selectedUser.id).subscribe(groups => {
        console.log('Groups for User length : ' + groups.length);
        if (groups != undefined) {
          groups.forEach(function (group) {
            self.selectedUserGroups.push(group);
          });
        }
      });

      this.userService.getUserRoles(this.selectedUser.id).subscribe(roles => {
        if (roles != undefined) {
          roles.forEach(function (role) {
            self.selectedUserRoles.push(role);
          });
        }

      });

    }
  }

  onSubmit() {
    let self = this;
    this.bindFormToUser();

    this.userHolder.user = this.selectedUser;

    this.selectedGroups = [];
    this.selectedRoles = [];

    if (this.selectedUserGroups != undefined) {
      this.selectedUserGroups.forEach(function (group) {
        self.selectedGroups.push(group.id);   // this.userHolder.selectedGroups.push(group.id)
      });
    }

    if (this.selectedUserRoles != undefined) {
      this.selectedUserRoles.forEach(function (role) {
        self.selectedRoles.push(role.id);
      });
    }

    this.userHolder.selectedGroups = this.selectedGroups;
    this.userHolder.selectedRoles = this.selectedRoles;

    if (this.userType === 'ldap') {
      this.userHolder.user.ldapuser = true;
      this.userHolder.user.systemUser = false;
    } else {
      this.userHolder.user.ldapuser = false;
      this.userHolder.user.systemUser = true;
    }

    if (this.editMood != 'New') {
      this.userService.edit(this.userHolder).subscribe(
        returnedUser => {
          this.display = false;
          this.fireEvent(returnedUser);
          this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'UpdateUserSuccess', this.utils, 'success');
        }
        , error => {
          // can't create user
          this.utils.messageService.printLocalizedMessage('FailureMsg', 'UpdateUserFailed', this.utils, 'error');
          this.utils.messageService.printError(error);
          this.display = true;
        });
    } else {
      this.userService.create(this.userHolder)
        .subscribe(returnedUser => {
            this.parent.users.unshift(returnedUser);
            this.fireEvent(returnedUser);
            this.display = false;
            this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'CreateUserSuccess', this.utils, 'success');
          }
          , error => {
            // can't create user
            this.utils.messageService.printLocalizedMessage('FailureMsg', 'CreateUserFailed', this.utils, 'error');
            this.utils.messageService.printError(error);
            this.display = true;
          });
    }

  }


  bindUserToForm() {
    this.userForm.controls.userID.setValue(this.selectedUser.userID);
    this.userForm.controls.staffID.setValue(this.selectedUser.staffID);
    this.userForm.controls.firstName.setValue(this.selectedUser.firstName);
    this.userForm.controls.lastName.setValue(this.selectedUser.lastName);
    this.userForm.controls.title.setValue(this.selectedUser.title);
    this.userForm.controls.email.setValue(this.selectedUser.email);
    this.userForm.controls.department.setValue(this.selectedUser.department);
    this.userForm.controls.enabled.setValue(this.selectedUser.enabled);
    // this.userForm.controls.password.setValue(this.userh);
  }

  bindFormToUser() {

    this.userType = this.userForm.value.userType;
    this.selectedUser.userID = this.userForm.value.userID;
    this.selectedUser.staffID = this.userForm.value.staffID;
    this.selectedUser.firstName = this.userForm.value.firstName;
    this.selectedUser.lastName = this.userForm.value.lastName;
    this.selectedUser.title = this.userForm.value.title;
    this.selectedUser.email = this.userForm.value.email;
    this.selectedUser.department = this.userForm.value.department;
//    console.log("this.userForm.value.enabled = " + (this.userForm.value.enabled != null && this.userForm.value.enabled != undefined && this.selectedUser.enabled))
    if (this.userForm.value.enabled) {
      this.selectedUser.enabled = true;
    } else {
      this.selectedUser.enabled = false;
    }

    this.userHolder.password = this.userForm.value.password;
  }

  togglePassword() {

    if (this.userForm.value.userType != null && this.userForm.value.userType === 'ldap') {
      this.disablePassword = true;
      this.userForm.controls['password'].setValue('123');
    } else {
      this.disablePassword = false;
      this.userForm.patchValue({password: null});

    }
  }


  getSystemRoles(): void {
    this.rolesService.all().subscribe(roles => {
      this.userRoles = roles;
    });
  }

  getSystemGroups(): void {
    this.groupsService.all().subscribe(groups => {
      this.userGroups = groups;
    });
  }

  fireEvent(value) {
    this.event.emit(value);
  }

}

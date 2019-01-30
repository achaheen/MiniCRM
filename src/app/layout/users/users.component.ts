import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/model/user";
import {UsersService} from "../../shared/services/users.service";
import {UserHolder} from "../../shared/model/user-holder";
import {MessageService} from "primeng/api";
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {Role} from "../../shared/model/role";
import {RolesService} from "../../shared/services/roles.service";
import {Group} from "../../shared/model/group";
import {GroupsService} from "../../shared/services/groups.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]

})
export class UsersComponent implements OnInit {

  userRoles: Role[];
  selectedUserRoles : Role[];

  userGroups: Group[];
  selectedUserGroups : Group[];

  userForm : FormGroup;
  users : User[];
  selectedUser : User;
  cols: any[];
  userHolder :UserHolder;
  password: string;
  selectedGroups: number[];
  selectedRoles: number[];

  disablePassword: boolean = true;
  userType:string = 'ldap';
  display: boolean = false;
  blocked:boolean = true;
  dialogType: string;
  disableForEdit: boolean;
  showDialog(dialogType: string) {

    this.dialogType = dialogType;
    this.display = true;
    if(dialogType != 'Edit'){
      this.disableForEdit = false;
      //const user: User = {} as any;
        this.selectedUser = {} ;

      if(this.userType != 'ldap' ){
          this.userForm.controls.userType.setValue('system');
      }else{
        this.userForm.controls.userType.setValue('ldap');
      }
      this.bindUserToForm();
      this.togglePassword();

      this.userForm.controls["password"].setValidators(Validators.required);
      this.userForm.controls["password"].updateValueAndValidity();

    }else{
      this.disableForEdit = true;

      if(this.selectedUser.ldapuser){
        this.userForm.controls.userType.setValue('ldap');
      }else{
        this.userForm.controls.userType.setValue('system');
        this.disablePassword = false;
      }
      this.bindUserToForm();
      this.togglePassword();
      this.userForm.controls["password"].setValidators(null);
      this.userForm.controls["password"].updateValueAndValidity();


      this.selectedUserRoles = [];
      this.selectedUserGroups= [];

      var self = this;

      this.userService.getUserGroups(this.selectedUser.id).subscribe(groups =>{
        console.log("Groups for User length : " + groups.length)
        if(groups != undefined) {
          groups.forEach(function(group){
            self.selectedUserGroups.push(group)
          })}
      });

      this.userService.getUserRoles(this.selectedUser.id).subscribe(roles=>{
        if(roles != undefined) {
          roles.forEach(function(role){
            self.selectedUserRoles.push(role)
          })}

      });

    }
  }

  togglePassword(){

    if(this.userForm.value.userType != null && this.userForm.value.userType === 'ldap' ){
      this.disablePassword = true;
      this.userForm.controls['password'].setValue('123');
    }else{
      this.disablePassword = false;
      this.userForm.patchValue({password: null});

    }
  }
  hideDialog() {
    this.display = false;
  }
  getAllUsers(): void {
    this.userService.all()
      .subscribe(users => { this.users = users;
        this.blocked=false;});

  }

  getSystemRoles(): void {
    this.rolesService.all().subscribe( roles=> {this.userRoles = roles})
  }

  getSystemGroups(): void {
    this.groupsService.all().subscribe( groups=> {this.userGroups = groups})
  }

  onSubmit() {
    var self = this;
    this.bindFormToUser();

    console.log("Start" + this.dialogType +"Service");
    this.userHolder.user = this.selectedUser;

    this.selectedGroups = [];
    this.selectedRoles = [];

    if (this.selectedUserGroups != undefined) {
     this.selectedUserGroups.forEach(function(group){
      self.selectedGroups.push(group.id)   //this.userHolder.selectedGroups.push(group.id)
    })}

    if(this.selectedUserRoles != undefined) {
    this.selectedUserRoles.forEach(function(role){
      self.selectedRoles.push(role.id)
    })}

    this.userHolder.selectedGroups = this.selectedGroups;
    this.userHolder.selectedRoles=this.selectedRoles;

    if(this.userType === 'ldap'){
      this.userHolder.user.ldapuser = true;
      this.userHolder.user.systemUser = false;
    }else{
      this.userHolder.user.ldapuser = false;
      this.userHolder.user.systemUser = true;
    }

    if (this.dialogType != 'New')  {
      this.userService.edit(this.userHolder).subscribe(
        returnedUser => {
          this.display = false;
          this.messageService.add({severity:'info', summary:'Success', detail:'User Updated Successfully'});
        }
        ,error => {
          // can't create user
          console.error('Creation Failed !' + error.error.msg);
          this.messageService.add({severity:'error', summary:'Failed', detail:error.error.msg});
          this.display = true;
        });
    }else{
      this.userService.create(this.userHolder)
        .subscribe(returnedUser => {
          this.users.unshift(returnedUser);
            this.display = false;
            this.messageService.add({severity:'info', summary:'Success', detail:'User Created Successfully'});
          }
          ,error => {
            // can't create user
            console.error('Creation Failed !' + error.error.msg);
            this.messageService.add({severity:'error', summary:'Failed', detail:error.error.msg});
            this.display = true;
          });
    }
    console.log("End" + this.dialogType +"Service")



  }



  bindUserToForm(){
    this.userForm.controls.userID.setValue(this.selectedUser.userID  );
    this.userForm.controls.staffID.setValue(this.selectedUser.staffID);
    this.userForm.controls.firstName.setValue(this.selectedUser.firstName);
    this.userForm.controls.lastName.setValue(this.selectedUser.lastName);
    this.userForm.controls.title.setValue(this.selectedUser.title);
    this.userForm.controls.email.setValue(this.selectedUser.email);
    this.userForm.controls.department.setValue(this.selectedUser.department);
    this.userForm.controls.enabled.setValue(this.selectedUser.enabled);
   // this.userForm.controls.password.setValue(this.userh);
  }

  bindFormToUser(){

    this.userType = this.userForm.value.userType;
    this.selectedUser.userID  = this.userForm.value.userID
    this.selectedUser.staffID = this.userForm.value.staffID;
    this.selectedUser.firstName = this.userForm.value.firstName;
    this.selectedUser.lastName = this.userForm.value.lastName;
    this.selectedUser.title = this.userForm.value.title;
    this.selectedUser.email = this.userForm.value.email;
    this.selectedUser.department = this.userForm.value.department;
//    console.log("this.userForm.value.enabled = " + (this.userForm.value.enabled != null && this.userForm.value.enabled != undefined && this.selectedUser.enabled))
    if(this.userForm.value.enabled){
      this.selectedUser.enabled =  true;
    }else{
      this.selectedUser.enabled =  false;
    }

    this.userHolder.password = this.userForm.value.password;
  }

  ngOnInit() {
    this.getAllUsers();
    this.getSystemRoles();
    this.getSystemGroups();
    this.selectedUser = null;
    this.userHolder = {};
    this.selectedGroups = [];
    this.selectedRoles = [];
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
      { field: 'enabled', header: 'enabled' }];


    this.userForm = this.fb.group({
      'userID': new FormControl('',  Validators.required ),
      'staffID': new FormControl('', Validators.required),
      'title': new FormControl(''),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'department': new FormControl(''),
      'userType': new FormControl('', Validators.required),
      'enabled': new FormControl(''),
      'email': new FormControl('', Validators.compose([Validators.required,Validators.email] )),
      'password': new FormControl('', Validators.required)
    });




  }





  constructor(private fb: FormBuilder,private userService : UsersService,
              private messageService : MessageService, private rolesService: RolesService,private groupsService: GroupsService) {
  }

}

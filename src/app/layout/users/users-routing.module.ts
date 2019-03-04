import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent} from './users.component';
import {CreateUserComponent} from "./create-user/create-user.component";

const routes: Routes = [ {
  path: '',
  component: UsersComponent
},{
  path: 'create',
  component: CreateUserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

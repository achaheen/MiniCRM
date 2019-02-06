import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListtopicpermissionsComponent} from './listtopicpermissions/listtopicpermissions.component';
import {CreatetopicpermissionComponent} from './createtopicpermission/createtopicpermission.component';

const routes: Routes = [
  {
    path: 'list', component: ListtopicpermissionsComponent
  }, {
    path: 'create', component: CreatetopicpermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicspermissionsRoutingModule {
}

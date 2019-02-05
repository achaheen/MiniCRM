import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewtopicpermissionComponent} from './viewtopicpermission/viewtopicpermission.component';

const routes: Routes = [
  {
    path: 'view', component: ViewtopicpermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicspermissionsRoutingModule {
}

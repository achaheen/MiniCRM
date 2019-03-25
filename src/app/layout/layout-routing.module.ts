import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'users', pathMatch: 'prefix'},
      {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
      {path: 'charts', loadChildren: './charts/charts.module#ChartsModule'},
      {path: 'tables', loadChildren: './tables/tables.module#TablesModule'},
      {path: 'forms', loadChildren: './form/form.module#FormModule'},
      {path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule'},
      {path: 'grid', loadChildren: './grid/grid.module#GridModule'},
      {path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule'},
      {path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule'},
      {path: 'users', loadChildren: './users/users.module#UsersModule'},
      {path: 'roles', loadChildren: './roles/roles.module#RolesModule'},
      {path: 'groups', loadChildren: './groups/groups.module#GroupsModule'},
      {path: 'tickets', loadChildren: './tickets/tickets.module#TicketsModule'},
      {path: 'tp', loadChildren: './topicspermissions/topicspermissions.module#TopicspermissionsModule'},
      {path: 'mc', loadChildren: './topics/topics.module#TopicsModule'},
      {path: 'sla', loadChildren: './sla/sla.module#SlaModule'},
      {path: 'userProfile', loadChildren: './user-profile/user-profile.module#UserProfileModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}

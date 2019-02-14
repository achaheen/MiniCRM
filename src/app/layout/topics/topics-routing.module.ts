import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainCatListComponent} from './main-cat-list/main-cat-list.component';
import {SubCatListComponent} from './sub-cat-list/sub-cat-list.component';
import {TopicsListComponent} from './topics-list/topics-list.component';

const routes: Routes = [{
  path: '', component: MainCatListComponent
},
  {path: 'sc', component: SubCatListComponent}
  , {path: 'sc/topic', component: TopicsListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule {
}

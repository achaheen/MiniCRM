import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainCatListComponent} from './main-cat-list/main-cat-list.component';
import {SubCatListComponent} from './sub-cat-list/sub-cat-list.component';

const routes: Routes = [{
  path: '', component: MainCatListComponent
},
  {
    path: 'subCats', component: SubCatListComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule {
}

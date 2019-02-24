import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MainCategoryService} from '../../../shared/services/main-category.service';
import {UtilsService} from '../../../shared/services/utils.service';
import {BasicTopicSelection} from '../../general/basic-topic-selection';
import {SubCategoryService} from '../../../shared/services/sub-category.service';
import {TopicService} from '../../../shared/services/topic.service';
import {SubCatListComponent} from '../sub-cat-list/sub-cat-list.component';

@Component({
  selector: 'app-main-cat-list',
  templateUrl: './main-cat-list.component.html',
  styleUrls: ['./main-cat-list.component.scss']
})
export class MainCatListComponent extends BasicTopicSelection implements OnInit {
  mainCatCols: any[];

  enableCreateEditMode = false;
  @ViewChild('subCatList')
  subCatList: SubCatListComponent;

  constructor(public  subCatService: SubCategoryService, public  mainCatService: MainCategoryService
    , public topicService: TopicService, public utils: UtilsService) {
    super(topicService, subCatService, mainCatService, utils);
    this.mainCatCols = [
      {field: 'id', header: utils.translateService.instant('ID')},
      {field: 'arabicLabel', header: utils.translateService.instant('arabicLabel')},
      {field: 'englishLabel', header: utils.translateService.instant('englishLabel')},
      {field: 'enabled', header: utils.translateService.instant('enabled')},
      {field: 'creationdate', header: utils.translateService.instant('creationDate')},
      {field: 'createdBy', header: utils.translateService.instant('createdBy')},
      {field: 'modificationDate', header: utils.translateService.instant('modificationDate')},
      {field: 'modifiedBy', header: utils.translateService.instant('modifiedBy')}];
  }

  ngOnInit() {
    this.mainCatService.all().subscribe(value => {
      this.mainCategories = value;
    });
  }

  changeStatus() {
    if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
      this.mainCatService.changeStatus(this.selectedMainCategory.id, !this.selectedMainCategory.enabled).subscribe(value => {
        this.mainCategories = value;
      });
    }
  }

  handleCreateEditEvent(event) {
    if (event != null) {
      this.mainCategories = event;
      this.enableCreateEditMode = false;
    }
  }
}

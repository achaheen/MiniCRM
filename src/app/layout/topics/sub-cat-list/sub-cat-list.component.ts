import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SubCategoryService} from '../../../shared/services/sub-category.service';
import {MainCategoryService} from '../../../shared/services/main-category.service';
import {BasicTopicSelection} from '../../general/basic-topic-selection';
import {TopicService} from '../../../shared/services/topic.service';
import {UtilsService} from '../../../shared/services/utils.service';
import {MainCatListComponent} from '../main-cat-list/main-cat-list.component';
import {TopicsListComponent} from '../topics-list/topics-list.component';

@Component({
  selector: 'app-sub-cat-list',
  templateUrl: './sub-cat-list.component.html',
  styleUrls: ['./sub-cat-list.component.scss']
})
export class SubCatListComponent extends BasicTopicSelection implements OnInit {
  subCatCols: any[];
  enableCreateEditMode = false;
  @Input() parentMainCat: MainCatListComponent;
  @ViewChild('topicList')
  topicList: TopicsListComponent;

  constructor(public  subCatService: SubCategoryService, public  mainCatService: MainCategoryService
    , public topicService: TopicService, public utils: UtilsService) {
    super(topicService, subCatService, mainCatService, utils);
    this.subCatCols = [
      {field: 'id', header: utils.translateService.instant('ID')},
      {field: 'arabicLabel', header: utils.translateService.instant('arabicLabel')},
      {field: 'englishLabel', header: utils.translateService.instant('englishLabel')},
      {field: 'enabled', header: utils.translateService.instant('enabled')},
      {field: 'creationDate', header: utils.translateService.instant('creationDate')},
      {field: 'createdBy', header: utils.translateService.instant('createdBy')},
      {field: 'modificationDate', header: utils.translateService.instant('modificationDate')},
      {field: 'modifiedBy', header: utils.translateService.instant('modifiedBy')}];
  }

  ngOnInit() {
    if (this.selectedMainCategory != null) {
      this.updateSubCategory();
    }
  }


  onParentChange(event) {
    if (event != null && event.data != null) {
      this.selectedMainCategory = event.data;
      this.updateSubCategory();
    } else {
      this.subCategories = [];
    }
  }

  changeStatus() {
    if (this.selectedSubCategory != null && this.selectedSubCategory.id != null) {
      this.subCatService.changeStatus(this.selectedSubCategory.id, !this.selectedSubCategory.enabled).subscribe(value => {
        this.subCategories = value;
      });
    }
  }

  handleCreateEditEvent(event) {
    if (event != null) {
      this.subCategories = event;
      this.selectedSubCategory = null;
      this.selectedMainCategory = null;
      this.enableCreateEditMode = false;
    }
  }

  public updateSubCategory() {
    if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
      this.subCategoryService.allByMainCat(this.selectedMainCategory.id).subscribe(
        result => {
          this.subCategories = result;
        }
      );
    } else {
      this.topics = [];
      this.selectedTopic = null;
      this.selectedSubCategory = null;
      this.subCategories = [];
    }
  }

}

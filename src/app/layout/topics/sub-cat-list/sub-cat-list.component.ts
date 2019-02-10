import {Component, OnInit} from '@angular/core';
import {SubCategoryService} from '../../../shared/services/sub-category.service';
import {MainCategoryService} from '../../../shared/services/main-category.service';
import {BasicTopicSelection} from '../../general/basic-topic-selection';
import {TopicService} from '../../../shared/services/topic.service';
import {UtilsService} from '../../../shared/services/utils.service';

@Component({
  selector: 'app-sub-cat-list',
  templateUrl: './sub-cat-list.component.html',
  styleUrls: ['./sub-cat-list.component.scss']
})
export class SubCatListComponent extends BasicTopicSelection implements OnInit {
  subCatCols: any[];
  enableCreateEditMode = false;

  constructor(public  subCatService: SubCategoryService, public  mainCatService: MainCategoryService
    , public topicService: TopicService, public utils: UtilsService) {
    super(topicService, subCatService, mainCatService, utils);
    this.subCatCols = [
      {field: 'id', header: 'ID'},
      {field: 'mainCategory', header: 'Main Category'},
      {field: 'enabled', header: 'Enabled?'},
      {field: 'creationDate', header: 'Creation Date'},
      {field: 'createdBy', header: 'Created By'},
      {field: 'modificationDate', header: 'Modification Date'},
      {field: 'modifiedBy', header: 'Modified By'}];
  }

  ngOnInit() {
    this.listAllMainCategories();
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

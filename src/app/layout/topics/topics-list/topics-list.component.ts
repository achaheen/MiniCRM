import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../../../shared/model/topic';
import {BasicTopicSelection} from '../../general/basic-topic-selection';
import {UtilsService} from '../../../shared/services/utils.service';
import {GroupsService} from '../../../shared/services/groups.service';
import {SubCategoryService} from '../../../shared/services/sub-category.service';
import {TopicService} from '../../../shared/services/topic.service';
import {MainCategoryService} from '../../../shared/services/main-category.service';
import {UsersService} from '../../../shared/services/users.service';
import {Subcategory} from '../../../shared/model/subcategory';
import {SubCatListComponent} from '../sub-cat-list/sub-cat-list.component';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent extends BasicTopicSelection implements OnInit {

  @Input() parentSubCat: SubCatListComponent;
  topicCols: any[];
  enableCreateEditMode = false;

  constructor(public topicService: TopicService
    , public subCategoryService: SubCategoryService, public mainCatService: MainCategoryService, private  userServices: UsersService
    , private groupServices: GroupsService, public utils: UtilsService) {
    super(topicService, subCategoryService, mainCatService, utils);
    this.topicCols = [
      {field: 'id', header: 'ID'},
      {field: 'mainCategory', header: 'Main Category'},
      {field: 'subCategory', header: 'Sub Category'},
      {field: 'topic', header: 'Topic'},
      {field: 'enabled', header: 'Enabled?'},
      {field: 'creationDate', header: 'Creation Date'},
      {field: 'createdBy', header: 'Created By'},
      {field: 'modificationDate', header: 'Modification Date'},
      {field: 'modifiedBy', header: 'Modified By'}];

  }

  ngOnInit() {
    if (this.selectedSubCategory != null) {
      this.updateTopicList();
    }
  }

  onParentChange(event) {
    if (event != null && event.data != null) {
      this.selectedSubCategory = event.data;
      this.updateTopicList();
    } else {
      this.topics = [];
    }
  }

  changeStatus() {
    if (this.selectedTopic != null && this.selectedTopic.id != null) {
        this.topicService.changeStatus(this.selectedTopic.id, !this.selectedTopic.enabled).subscribe(value => {
          this.topics = value;
        });
    }
  }


  handleCreateEditEvent(event) {
    if (event != null) {
      this.topics = event;
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
          const subcategory: Subcategory = {englishLabel: 'Select Sub Category', arabicLabel: 'Select Sub Category', id: null};
          this.subCategories.unshift(subcategory);
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

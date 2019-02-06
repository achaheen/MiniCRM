import {Component, OnInit} from '@angular/core';
import {MainCategoryService} from '../../../shared/services/main-category.service';
import {SubCategoryService} from '../../../shared/services/sub-category.service';
import {TopicService} from '../../../shared/services/topic.service';
import {TopicPermissionsService} from '../../../shared/services/topic-permissions-service.service';
import {BasicTopicSelection} from '../../general/basic-topic-selection';

@Component({
  selector: 'app-createtopicpermission',
  templateUrl: './createtopicpermission.component.html',
  styleUrls: ['./createtopicpermission.component.scss']
})
export class CreatetopicpermissionComponent extends BasicTopicSelection implements OnInit {

  constructor(mainCatService: MainCategoryService, subCatService: SubCategoryService
    , topicService: TopicService, topicPermissionService: TopicPermissionsService) {
    super(topicService, subCatService, mainCatService);
  }
  ngOnInit() {
    this.listAllMainCategories();
  }
  prepare() {

  }

  create() {

  }

}

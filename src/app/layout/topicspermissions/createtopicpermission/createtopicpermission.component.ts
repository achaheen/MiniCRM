import {Component, OnInit} from '@angular/core';
import {MainCategoryService} from '../../../shared/services/main-category.service';
import {SubCategoryService} from '../../../shared/services/sub-category.service';
import {TopicService} from '../../../shared/services/topic.service';
import {TopicPermissionsService} from '../../../shared/services/topic-permissions-service.service';
import {BasicTopicSelection} from '../../general/basic-topic-selection';
import {UtilsService} from '../../../shared/services/utils.service';
import {BasicUserSelection} from '../../general/basic-user-selection';
import {BasicGroupSelections} from '../../general/basic-group-selections';
import {GroupsService} from '../../../shared/services/groups.service';
import {UsersService} from '../../../shared/services/users.service';
import {User} from '../../../shared/model/user';
import {Group} from '../../../shared/model/group';
import {TopicsPermissions} from '../../../shared/model/topicsPermissions';
import {Topic} from '../../../shared/model/topic';

@Component({
  selector: 'app-createtopicpermission',
  templateUrl: './createtopicpermission.component.html',
  styleUrls: ['./createtopicpermission.component.scss']
})
export class CreatetopicpermissionComponent extends BasicTopicSelection implements OnInit {
  selectType: string = 'Users';
  basicUserSelection: BasicUserSelection;
  basicGroupSelection: BasicGroupSelections;
  selectedUsers: User[] = [];
  selectedGroups: Group[] = [];
  topicsPermissions: TopicsPermissions[];

  constructor(mainCatService: MainCategoryService, subCatService: SubCategoryService
    , topicService: TopicService, topicPermissionService: TopicPermissionsService, utils: UtilsService
    , private  groupServices: GroupsService, private userServices: UsersService) {
    super(topicService, subCatService, mainCatService, utils);

    this.basicGroupSelection = new BasicGroupSelections(groupServices);
    this.basicUserSelection = new BasicUserSelection(userServices);
  }

  ngOnInit() {
    this.listAllMainCategories();
    this.loadActiveUsers();
  }

  loadActiveUsers() {
    this.basicUserSelection.getActiveUsers();
  }

  prepare() {

    this.topicsPermissions = [];
    if (this.selectedUsers.length > 0 || this.selectedGroups.length > 0) {
      let topics: Topic[] = [];
      if (this.selectedTopic != null || this.selectedTopic.id == null) {
        topics = [this.selectedTopic];
        this.createPermObjects(topics);
      } else if (this.selectedSubCategory != null) {
        this.topicService.active(this.selectedSubCategory.id).subscribe(value => {
          this.createPermObjects(value);
        });
      } else if (this.selectedMainCategory != null) {
        this.topicService.activeByMainCat(this.selectedMainCategory.id).subscribe(value => {
          this.createPermObjects(value);
        });
      }
    }
  }

  createPermObjects(topics: Topic[]) {
    if (this.selectedUsers.length > 0) {
      this.createUserTopicsPerm(topics);
    } else if (this.selectedGroups.length > 0) {
      this.createGroupTopicsPerm(topics);
    }
  }

  createUserTopicsPerm(topics: Topic[]) {

    this.topics.forEach(topic => {
      this.selectedUsers.forEach(u => {
        let tp: TopicsPermissions = {id: null, type: 'user', assigne: u.id, topicId: topic};
        this.topicsPermissions.push(tp);
      });
    });
  }

  createGroupTopicsPerm(topics: Topic[]) {

    this.topics.forEach(topic => {
      this.selectedGroups.forEach(g => {
        let tp: TopicsPermissions = {id: null, type: 'group', assigne: g.id, topicId: topic};
        this.topicsPermissions.push(tp);
      });
    });
  }

  create() {

  }

}

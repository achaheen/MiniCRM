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
  selectedUser: User;
  selectedGroup: Group;
  topicsPermissions: TopicsPermissions[];

  constructor(mainCatService: MainCategoryService, subCatService: SubCategoryService
    , topicService: TopicService, topicPermissionService: TopicPermissionsService, utils: UtilsService
    , private  groupServices: GroupsService, private userServices: UsersService, private  topicsPermService: TopicPermissionsService) {
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


    // old
    this.topicsPermissions = [];
    if (this.selectedUser != null || this.selectedGroup != null) {
      let topics: Topic[] = [];
      if (this.selectedTopic != null && this.selectedTopic.id != null) {
        topics = [this.selectedTopic];
        this.createPermObjects(topics);
      } else if (this.selectedSubCategory != null && this.selectedSubCategory.id != null) {
        this.topicService.active(this.selectedSubCategory.id).subscribe(value => {
          this.createPermObjects(value);
        });
      } else if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
        this.topicService.activeByMainCat(this.selectedMainCategory.id).subscribe(value => {
          this.createPermObjects(value);
        });
      }
    }
  }

  createPermObjects(topics: Topic[]) {
    // console.log(`creating topics ${JSON.stringify(topics)}`);
    if (this.selectedUser != null) {
      this.topicsPermService.prepare({}).subscribe(value => {
        value.forEach(item => {
          if (item.assigne == null) {
            item.assigne = this.selectedUser.id;
            item.user = this.selectedUser;
            item.group = null;
          }
        });

      });
    }

    /**
     * old
     if (this.selectedUsers.length > 0) {
      this.createUserTopicsPerm(topics);
    } else if (this.selectedGroups.length > 0) {
      this.createGroupTopicsPerm(topics);
    }*/
    console.log(`topics permissions ${JSON.stringify(this.topicsPermissions)}`);
  }

  createUserTopicsPerm(topics: Topic[]) {
    console.log(`Selected Users ${JSON.stringify(this.selectedUser)}`);
    topics.forEach(topic => {

      let tp: TopicsPermissions = {
        id: null,
        type: 'user',
        assigne: this.selectedUser.id,
        topicId: topic,
        user: this.selectedUser,
        group: null
      };
      this.topicsPermissions.unshift(tp);

    });
  }

  createGroupTopicsPerm(topics: Topic[]) {
    topics.forEach(topic => {

      let tp: TopicsPermissions = {
        id: null,
        type: 'group',
        assigne: this.selectedGroup.id,
        topicId: topic,
        group: this.selectedGroup,
        user: null
      };
      this.topicsPermissions.unshift(tp);

    });
  }

  create() {
    if (this.topicsPermissions != null && this.topicsPermissions.length > 0) {
      this.topicsPermService.create(this.topicsPermissions).subscribe(value => {
        console.log('Success');
        this.topicsPermissions = value;
      }, error1 => {
        console.log(JSON.stringify(error1));
      });
    }

  }

}

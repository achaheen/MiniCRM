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
  selectType = 'Users';
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
    this.enableAdminSelection = true;
  }

  ngOnInit() {
    this.listAllMainCategories();
    this.loadActiveUsers();
  }

  loadActiveUsers() {
    this.basicUserSelection.getActiveUsers();
  }

  enablePrepareBTN(): boolean {
    if (this.selectedMainCategory != null && (this.selectedUser != null || this.selectedGroup != null)) {
      return true;
    }

    return false;
  }

  prepare() {

    if (!this.enablePrepareBTN()) {
      return;
    }

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
    let request: any = {};
    if (this.selectedGroup != null) {
      request = {'topicList': topics, 'assigne': this.selectedGroup.id, 'type': 'group'};
    } else {
      request = {'topicList': topics, 'assigne': this.selectedUser.id, 'type': 'user'};
    }

    this.topicsPermService.prepare(request).subscribe(value => {
      this.topicsPermissions = value;

    },error1 => {
      this.utils.messageService.printLocalizedMessage('FailureMsg','',this.utils,'error');
      this.utils.messageService.printError(error1);
    });

   }


  create() {
    if (this.topicsPermissions != null && this.topicsPermissions.length > 0) {
        this.topicsPermService.create(this.topicsPermissions).subscribe(value => {
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg','TopicPermCreateSuccess',this.utils,'success');
        this.topicsPermissions = value;
      }, error1 => {
          this.utils.messageService.printLocalizedMessage('FailureMsg','TopicPermCreateFailed',this.utils,'error');
          this.utils.messageService.printError(error1);

      });
    }
  }

}

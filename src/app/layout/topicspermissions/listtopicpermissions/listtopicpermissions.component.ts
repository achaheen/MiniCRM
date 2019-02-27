import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TopicsPermissions} from '../../../shared/model/topicsPermissions';
import {TopicPermissionsService} from '../../../shared/services/topic-permissions-service.service';
import {TopicService} from '../../../shared/services/topic.service';
import {SubCategoryService} from '../../../shared/services/sub-category.service';
import {MainCategoryService} from '../../../shared/services/main-category.service';
import {ViewtopicpermissionComponent} from '../viewtopicpermission/viewtopicpermission.component';
import {User} from '../../../shared/model/user';
import {Group} from '../../../shared/model/group';
import {UsersService} from '../../../shared/services/users.service';
import {GroupsService} from '../../../shared/services/groups.service';
import {BasicTopicSelection} from '../../general/basic-topic-selection';
import {BasicUserSelection} from '../../general/basic-user-selection';
import {BasicGroupSelections} from '../../general/basic-group-selections';
import {UtilsService} from '../../../shared/services/utils.service';

@Component({
  selector: 'app-listtopicpermissions',
  templateUrl: './listtopicpermissions.component.html',
  styleUrls: ['./listtopicpermissions.component.scss']
})
export class ListtopicpermissionsComponent extends BasicTopicSelection implements OnInit, AfterViewInit {
  @ViewChild(ViewtopicpermissionComponent)
  private viewPermComponent: ViewtopicpermissionComponent;
  permissionsList: Array<TopicsPermissions>;
  selectedUser: User;
  selectedGroup: Group;
  filterType = 'mainCat';
  basicUserSelection: BasicUserSelection;
  basicGroupSelection: BasicGroupSelections;

  constructor(private topicPermissionService: TopicPermissionsService, public topicService: TopicService
    , public subCategoryService: SubCategoryService, public mainCatService: MainCategoryService, private  userServices: UsersService
    , private groupServices: GroupsService, public utils: UtilsService) {
    super(topicService, subCategoryService, mainCatService, utils);
    this.basicUserSelection = new BasicUserSelection(this.userServices);
    this.basicGroupSelection = new BasicGroupSelections(this.groupServices);
  }
  ngOnInit() {
    this.listAllMainCategories();
  }
  ngAfterViewInit(): void {
  }
  applyFilter() {
    console.log('filtering topic permissions');
    this.permissionsList = [];
    if (this.filterType === 'mainCat') {
      console.log('filtering by cats');
      if (this.selectedTopic != null && this.selectedTopic.id != null) {
        this.topicPermissionService.getTopicPermissions(this.selectedTopic.id).subscribe(value => {
          this.permissionsList = value;
        });
      } else if (this.selectedSubCategory != null && this.selectedSubCategory.id != null) {
        this.topicPermissionService.getSubCatPermissions(this.selectedSubCategory.id).subscribe(value => {
          this.permissionsList = value;
        });
      } else if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
        this.topicPermissionService.getMainCatPermissions(this.selectedMainCategory.id).subscribe(value => {
          this.permissionsList = value;
        });
      }
    } else if (this.filterType === 'users') {

      if (this.selectedUser !== null) {
        this.topicPermissionService.getUserPermissions(this.selectedUser.id).subscribe(value => {
          this.permissionsList = value;
        }, error1 => {
          this.utils.messageService.error('', this.utils.translateService.instant('FailureMsg'));
          console.log(error1);
        });
      }
    } else if (this.filterType === 'groups') {
      if (this.selectedGroup !== null) {
        this.topicPermissionService.getGroupPermissions(this.selectedGroup.id).subscribe(value => {
          this.permissionsList = value;
        }, error1 => {
          this.utils.messageService.error('', this.utils.translateService.instant('FailureMsg'));
          console.log(error1);
        });
      }
    }
  }

  updatePermissions() {
    if (this.viewPermComponent.selectedPermissionsList != null && this.viewPermComponent.selectedPermissionsList.length > 0) {

      this.topicPermissionService.modify(this.viewPermComponent.selectedPermissionsList).subscribe(value => {
        this.applyFilter();
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'UpdatePermSuccess', this.utils, 'success');
      }, error1 => {
        this.utils.messageService.printLocalizedMessage('FailureMsg', 'UpdatePermFailed', this.utils, 'error');
        this.utils.messageService.printError(error1);
      });
    }
  }

  deletePermissions() {
    if (this.viewPermComponent.selectedPermissionsList != null && this.viewPermComponent.selectedPermissionsList.length > 0) {
      this.topicPermissionService.delete(this.viewPermComponent.selectedPermissionsList).subscribe(value => {
        console.log(JSON.stringify(value));
        this.viewPermComponent.selectedPermissionsList = null;
        this.applyFilter();
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg', 'DeletePermSuccess', this.utils, 'success');
      }, error1 => {
        this.utils.messageService.printLocalizedMessage('FailureMsg', 'DeletePermFailed', this.utils, 'error');
        this.utils.messageService.printError(error1);
      });
    }
  }


}

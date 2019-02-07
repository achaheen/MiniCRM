import {Component, Input, OnInit} from '@angular/core';
import {TopicPermissionsService} from '../../../shared/services/topic-permissions-service.service';
import {TopicsPermissions} from '../../../shared/model/topicsPermissions';
import {Tablecols} from '../../../shared/model/tablecols';

@Component({
  selector: 'app-viewtopicpermission',
  templateUrl: './viewtopicpermission.component.html',
  styleUrls: ['./viewtopicpermission.component.scss']
})
export class ViewtopicpermissionComponent implements OnInit {

  @Input() permissionsList: Array<TopicsPermissions>;
  cols: Tablecols[];
  selectedPermissionsList: Array<TopicsPermissions>;


  constructor(private topicPermissionService: TopicPermissionsService) {
    this.cols = [
      {'field': 'id', 'header': 'id'},
      {'field': 'mainCat', 'header': 'MainCat', composed: true},
      {'field': 'subCat', 'header': 'SubCat', composed: true},
      {'field': 'topicId', 'header': 'topic', composed: true},
      {'field': 'userName', 'header': 'FullName', composed: true},
      {'field': 'userID', 'header': 'User ID', composed: true},
      {'field': 'group', 'header': 'GroupName', composed: true},
      {'field': 'createdBy', 'header': 'createdBy'},
      {'field': 'creationDate', 'header': 'creationDate', format: true, formatType: 'date'},
      {'field': 'assigne', 'header': 'assigne'},
      {'field': 'type', 'header': 'type'},
      {'field': 'admin', 'header': 'admin', format: true, formatType: 'checkbox'},
      {'field': 'canCreate', 'header': 'canCreate', format: true, formatType: 'checkbox'},
      {'field': 'canReopen', 'header': 'canReopen', format: true, formatType: 'checkbox'},
      {'field': 'canRead', 'header': 'canRead', format: true, formatType: 'checkbox'},
      {'field': 'canDelete', 'header': 'canDelete', format: true, formatType: 'checkbox'},
      {'field': 'canReply', 'header': 'canReply', format: true, formatType: 'checkbox'},
      {'field': 'canClose', 'header': 'canClose', format: true, formatType: 'checkbox'},
      {'field': 'canAssign', 'header': 'canAssign', format: true, formatType: 'checkbox'},
      {'field': 'canResolve', 'header': 'canResolve', format: true, formatType: 'checkbox'},
      {'field': 'canModify', 'header': 'canModify', format: true, formatType: 'checkbox'},
      {'field': 'canChgDpt', 'header': 'canChgDpt', format: true, formatType: 'checkbox'},
      {'field': 'canRunReport', 'header': 'canRunReport', format: true, formatType: 'checkbox'},
      {'field': 'canSubscribe', 'header': 'canSubscribe', format: true, formatType: 'checkbox'}
    ];

  }

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';
import {TopicsPermissions} from '../../../shared/model/topicsPermissions';
import {TopicPermissionsService} from '../../../shared/services/topic-permissions-service.service';

@Component({
  selector: 'app-listtopicpermissions',
  templateUrl: './listtopicpermissions.component.html',
  styleUrls: ['./listtopicpermissions.component.scss']
})
export class ListtopicpermissionsComponent implements OnInit {
  permissionsList: Array<TopicsPermissions>;
  constructor(private topicPermissionService: TopicPermissionsService) { }

  ngOnInit() {
  }

}

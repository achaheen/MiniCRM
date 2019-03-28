import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CustomerProfile} from '../../../shared/model/customerProfile';
import {SharedCustomerInfoService} from '../../../shared/services/shared-customer-info.service';
import {Observable, Subscription} from 'rxjs';
import {AbstractSharedDataClass} from '../abstract-shared-data-class';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.scss']
})
export class ViewUserProfileComponent extends AbstractSharedDataClass {

  constructor(public sharedInfoService: SharedCustomerInfoService) {
    super();

  }

}

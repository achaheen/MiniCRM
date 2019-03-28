import {Input, OnDestroy, OnInit} from '@angular/core';
import {CustomerProfile} from '../../shared/model/customerProfile';
import {Subscription} from 'rxjs';
import {SharedCustomerInfoService} from '../../shared/services/shared-customer-info.service';

export class AbstractSharedDataClass implements OnInit, OnDestroy {
  @Input() public customerProfile: CustomerProfile;
  public subscription: Subscription;
  public sharedInfoService: SharedCustomerInfoService;

  ngOnInit() {
    this.subscription = this.sharedInfoService.currentSubject
      .subscribe(value => {
        this.customerProfile = value as CustomerProfile;
      });
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }

  }
}

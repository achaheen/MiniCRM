import {Component, Input, OnInit} from '@angular/core';
import {CustomerProfile} from "../../../shared/model/customerProfile";

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.scss']
})
export class ViewUserProfileComponent implements OnInit {

  @Input() customerProfile:CustomerProfile;

  constructor() { }

  ngOnInit() {
  }

}

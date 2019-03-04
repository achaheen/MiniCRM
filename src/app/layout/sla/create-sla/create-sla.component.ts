import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicSla} from '../../../shared/model/topicSla';
import {UtilsService} from '../../../shared/services/utils.service';
import {SelectItem} from 'primeng/api';
import {SlaService} from '../../../shared/services/sla.service';
import {UsersService} from '../../../shared/services/users.service';
import {User} from '../../../shared/model/user';
import {TopisSlaHolder} from '../../../shared/model/sla';
import {TopicSlaService} from '../../../shared/services/topic-sla.service';

@Component({
  selector: 'app-create-sla',
  templateUrl: './create-sla.component.html',
  styleUrls: ['./create-sla.component.scss']
})
export class CreateSlaComponent implements OnInit {

  @Input() topicSla: TopicSla;
  editMode: boolean = false;
  @Input() existingSLA: number[];
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter();
  availableSLA: SelectItem[];
  slaList: SelectItem[] = [{value: null, label: ''}];
  activeUsers: SelectItem[] = [{value: null, label: ''}];

  selectedUsers: User[];

  constructor(private utils: UtilsService, private  slaService: SlaService,
              private userServices: UsersService, private topicSlaService: TopicSlaService) {
  }

  ngOnInit() {
    this.slaService.all().subscribe(value => {
      if (value != null && value.length > 0) {
        value.forEach(value1 => {
          this.slaList.push({label: value1.slaname, value: value1});
        });
      }

    });
    this.userServices.activeUsers().subscribe(value => {
      this.selectedUsers = null;
      value.forEach(v => {
        this.activeUsers.push({label: v.firstName + ' ' + v.lastName + ' ( ' + v.userID + ' )', value: v});
      });
    });
    const allSla: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (this.topicSla != null && this.topicSla.id != null) {
      this.editMode = true;
    }

    this.availableSLA = [{label: '', value: null}];
    allSla.forEach(value => {
      if (this.existingSLA.indexOf(value) === -1) {
        this.availableSLA.push({label: value.toString(10), value: value});
      }
    });
  }

  create() {
    if (this.topicSla == null || this.topicSla.slaid === null || this.topicSla.slalevel === null) {
      this.utils.messageService.error('Error', 'Please fill mandatory fields');
    } else {
      const users: string[] = [];
      if (this.selectedUsers != null && this.selectedUsers.length > 0) {
        this.selectedUsers.forEach(value => {
          users.push(value.userID);
        });
      }
      const holder: TopisSlaHolder = {topicsla: this.topicSla, usersList: users};
      this.topicSlaService.create(holder).subscribe(value => {
        this.utils.messageService.success('Success', 'Topic SLA Created');
        this.eventEmitter.emit(value);
      }, error1 => this.utils.messageService.printError(error1));
    }
  }

  cancel() {

  }

}

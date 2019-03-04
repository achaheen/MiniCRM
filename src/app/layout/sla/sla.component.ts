import {Component, OnInit} from '@angular/core';
import {BasicTopicSelection} from '../general/basic-topic-selection';
import {MainCategoryService} from '../../shared/services/main-category.service';
import {SubCategoryService} from '../../shared/services/sub-category.service';
import {TopicService} from '../../shared/services/topic.service';
import {UtilsService} from '../../shared/services/utils.service';
import {SlaService} from '../../shared/services/sla.service';
import {TopicSlaService} from '../../shared/services/topic-sla.service';
import {TopicSla} from '../../shared/model/topicSla';
import {Topic} from '../../shared/model/topic';
import {User} from '../../shared/model/user';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class SlaComponent extends BasicTopicSelection implements OnInit {

//  @ViewChild('create_edit') createEditComponent: CreateSlaComponent;
  selectedTopicSla: TopicSla;
  topicSlaList: TopicSla[];
  cols: any;
  selectedTopic: Topic;
  existingSla: number[] = [];
  enableCreateEdit: boolean = false;
  displayDialog: boolean = false;
  slaUsersList: User[];

  constructor(public slaService: SlaService, public mainCategoryService: MainCategoryService,
              public subCategoryService: SubCategoryService, public topicService: TopicService,
              public  topicSlaService: TopicSlaService, public utils: UtilsService) {
    super(topicService, subCategoryService, mainCategoryService, utils);
    this.enableAdminSelection = true;
    this.cols = [
      {field: 'id', header: 'ID', main: true},
      {field: 'mainCategory', header: this.utils.translateService.instant('MainCat'), sort: false, topic: true},
      {field: 'subCategory', header: this.utils.translateService.instant('SubCat'), sort: false, topic: true},
      {field: 'topic', header: this.utils.translateService.instant('Topic'), sort: true, topic: false},
      {field: 'slaname', header: this.utils.translateService.instant('slaName'), sort: false, sla: true},
      {field: 'slalevel', header: this.utils.translateService.instant('slaLevel'), sort: true, main: true},
      {field: 'time', header: this.utils.translateService.instant('slaTime'), sort: true, sla: true},
      {field: 'createdBy', header: this.utils.translateService.instant('createdBy'), sort: true, main: true},
      {field: 'creationDate', header: this.utils.translateService.instant('creationDate'), sort: true, main: true},
      {field: 'modifiedBy', header: this.utils.translateService.instant('modifiedBy'), sort: true, main: true},
      {field: 'modificationDate', header: this.utils.translateService.instant('modificationDate'), sort: true, main: true}
    ];
  }

  ngOnInit() {

  }

  topicSelected(event) {
    if (event != null && event.value != null) {
      this.selectedTopic = event.value;
      if (this.selectedTopic != null && this.selectedTopic.id != null) {
        this.topicSlaService.getByTopic(this.selectedTopic.id).subscribe(value => {
          this.topicSlaList = value;
        }, error1 => {
          this.utils.messageService.printError(error1);
        });
      }
    } else {
      this.topicSlaList = null;
    }
  }

  onRowSelect(event) {
    this.displayDialog = false;
    this.topicSlaService.getSlaUsers(event.data.id).subscribe(value => {
      this.slaUsersList = value;
      if (this.slaUsersList != null && this.slaUsersList.length > 0) {
        // this.displayDialog = true;
      }
    });
  }

  create() {
    if (this.selectedTopic != null) {
      this.selectedTopicSla = {
        id: null,
        topicID: this.selectedTopic,
        slaid: null,
        slalevel: null
      };
      if (this.topicSlaList == null || this.topicSlaList.length <= 0) {
        this.existingSla = [];
      } else {
        this.topicSlaList.forEach(tslaItem => {
          this.existingSla.push(tslaItem.slalevel);
        });
      }
      this.enableCreateEdit = true;
    }
  }

  modify() {
    if (this.selectedTopicSla != null) {
      this.enableCreateEdit = true;
    }
  }

  delete() {
    this.topicSlaService.delete(this.selectedTopicSla.id).subscribe(value => {
      this.utils.messageService.success('Deleted', 'Topic SLA Deleted Successfully');
      this.topicSlaList = value;
    }, error1 => {
      this.utils.messageService.printError(error1);
    });
  }

  handleEvent(event) {
    if (event !== null) {
      this.topicSlaList = event;
    }
    this.enableCreateEdit = false;

  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {BasicTopicSelection} from '../general/basic-topic-selection';
import {MainCategoryService} from '../../shared/services/main-category.service';
import {SubCategoryService} from '../../shared/services/sub-category.service';
import {TopicService} from '../../shared/services/topic.service';
import {UtilsService} from '../../shared/services/utils.service';
import {SlaService} from '../../shared/services/sla.service';
import {TopicSlaService} from '../../shared/services/topic-sla.service';
import {TopicSla} from '../../shared/model/topicSla';
import {Topic} from '../../shared/model/topic';
import {CreateSlaComponent} from './create-sla/create-sla.component';

@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.scss']
})
export class SlaComponent extends BasicTopicSelection implements OnInit {

//  @ViewChild('create_edit') createEditComponent: CreateSlaComponent;
  selectedTopicSla: TopicSla;
  topicSlaList: TopicSla[];
  cols: any;
  selectedTopic: Topic;
  existingSla: number[] = [];
  enableCreateEdit: boolean = false;

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

  handleEvent(event) {
    if (event !== null) {
      this.topicSlaList = event;
    }
    this.enableCreateEdit = false;

  }
}

import {Component, OnInit} from '@angular/core';
import {BasicTopicSelection} from '../general/basic-topic-selection';
import {MainCategoryService} from '../../shared/services/main-category.service';
import {SubCategoryService} from '../../shared/services/sub-category.service';
import {TopicService} from '../../shared/services/topic.service';
import {UtilsService} from '../../shared/services/utils.service';
import {SlaService} from '../../shared/services/sla.service';
import {TopicSlaService} from '../../shared/services/topic-sla.service';
import {TopicSla} from '../../shared/model/topicSla';

@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.scss']
})
export class SlaComponent extends BasicTopicSelection implements OnInit {

  selectedTopicSla: TopicSla;
  topicSlaList: TopicSla[];
  cols: any;

  constructor(public slaService: SlaService, public mainCategoryService: MainCategoryService,
              public subCategoryService: SubCategoryService, public topicService: TopicService,
              public  topicSlaService: TopicSlaService, public utils: UtilsService) {
    super(topicService, subCategoryService, mainCategoryService, utils);
    this.enableAdminSelection = true;
    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'mainCategory', header: this.utils.translateService.instant('MainCat'), sort: false},
      {field: 'subCategory', header: this.utils.translateService.instant('SubCat'), sort: false},
      {field: 'topic', header: this.utils.translateService.instant('Topic'), sort: true},
      {field: 'slaName', header: this.utils.translateService.instant('slaName'), sort: false},
      {field: 'slaUnit', header: this.utils.translateService.instant('slaUnit'), sort: false},
      {field: 'slaLevel', header: this.utils.translateService.instant('slaLevel'), sort: true},
      {field: 'slaTime', header: this.utils.translateService.instant('slaTime'), sort: true},
      {field: 'createdBy', header: this.utils.translateService.instant('createdBy'), sort: true},
      {field: 'creationDate', header: this.utils.translateService.instant('creationDate'), sort: true},
      {field: 'modifiedBy', header: this.utils.translateService.instant('modifiedBy'), sort: true},
      {field: 'modificationDate', header: this.utils.translateService.instant('modificationDate'), sort: true}
    ];
  }

  ngOnInit() {


  }

}

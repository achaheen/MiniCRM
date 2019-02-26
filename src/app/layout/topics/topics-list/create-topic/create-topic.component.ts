import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MainCategoryService} from '../../../../shared/services/main-category.service';
import {SubCategoryService} from '../../../../shared/services/sub-category.service';
import {TopicService} from '../../../../shared/services/topic.service';
import {UtilsService} from '../../../../shared/services/utils.service';
import {Location} from '@angular/common';
import {BasicTopicSelection} from '../../../general/basic-topic-selection';
import {Topic} from '../../../../shared/model/topic';
import {TopicsListComponent} from '../topics-list.component';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent extends BasicTopicSelection implements OnInit {

  @Input() item: Topic = {};
  @Output() event: EventEmitter<Object> = new EventEmitter();
  @Input() parent: TopicsListComponent;

  constructor(mainCatService: MainCategoryService,
              subCatService: SubCategoryService, topicService: TopicService, utils: UtilsService,
              private location: Location
  ) {
    super(topicService, subCatService, mainCatService, utils);
  }

  ngOnInit() {
    this.selectedSubCategory = this.parent.selectedSubCategory;
    if (this.item == null) {
      this.item = {};

    } else {
      this.selectedMainCategory = this.item.subCategory.mainCategory;
      this.selectedSubCategory = this.item.subCategory;

    }
    this.selectedMainCategory = this.selectedSubCategory.mainCategory;
  }

  execute() {

    if (this.item == null) {
      return;
    }
    this.item.subCategory = this.selectedSubCategory;
    this.item.configuration = '{"lockTime":10}';

    if (this.item.id != null) {
      this.topicService.edit(this.item).subscribe(value => {
        this.fireEvent(value);
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg','EditTopicSuccess',this.utils,'success');
      },error1 => {
        this.utils.messageService.printLocalizedMessage('FailureMsg','EditTopicFailed',this.utils,'error');
        this.utils.messageService.printError(error1);
      });
    } else {
      this.topicService.create(this.item).subscribe(value => {
        this.fireEvent(value);
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg','CreateTopicSuccess',this.utils,'success');
      },error1 => {
        this.utils.messageService.printLocalizedMessage('FailureMsg','CreateTopicFailed',this.utils,'error');
        this.utils.messageService.printError(error1);
      });
    }
  }

  fireEvent(value) {
    console.log('fireEvent ' + value);
    this.event.emit(value);
  }

}

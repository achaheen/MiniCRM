import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MainCategoryService} from '../../../../shared/services/main-category.service';
import {Location} from '@angular/common';
import {SubCategoryService} from '../../../../shared/services/sub-category.service';
import {BasicTopicSelection} from '../../../general/basic-topic-selection';
import {TopicService} from '../../../../shared/services/topic.service';
import {UtilsService} from '../../../../shared/services/utils.service';
import {Subcategory} from '../../../../shared/model/subcategory';

@Component({
  selector: 'app-create-sub-cat',
  templateUrl: './create-sub-cat.component.html',
  styleUrls: ['./create-sub-cat.component.scss']
})
export class CreateSubCatComponent extends BasicTopicSelection implements OnInit {


  @Input() item: Subcategory = {};
  @Output() event: EventEmitter<Object> = new EventEmitter();
  @Input() parent: any;

  constructor(mainCatService: MainCategoryService,
              subCatService: SubCategoryService, topicService: TopicService, utils: UtilsService,
              private location: Location
  ) {
    super(topicService, subCatService, mainCatService, utils);
  }

  ngOnInit() {
    if (this.item == null) {
      this.item = {};
    } else {
      this.selectedMainCategory = this.item.mainCategory;
    }
  }

  execute() {

    if (this.item == null) {
      return;
    }
    this.item.mainCategory = this.selectedMainCategory;

    if (this.item.id != null) {
      this.item.enabled = true;
      this.subCategoryService.edit(this.item).subscribe(value => {
        this.fireEvent(value);
      });
    } else {
      this.subCategoryService.create(this.item).subscribe(value => {
        this.fireEvent(value);
      });
    }
  }

  fireEvent(value) {
    this.event.emit(value);
  }
}

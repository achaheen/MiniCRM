import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MainCategoryService} from "../../../../shared/services/main-category.service";
import {SubCategoryService} from "../../../../shared/services/sub-category.service";
import {TopicService} from "../../../../shared/services/topic.service";
import {UtilsService} from "../../../../shared/services/utils.service";
import {Location} from "@angular/common";
import {BasicTopicSelection} from "../../../general/basic-topic-selection";
import {Topic} from "../../../../shared/model/topic";

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent extends BasicTopicSelection implements OnInit {

  @Input() item: Topic = {};
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
      this.selectedMainCategory = this.item.subCategory.mainCategory;
      this.selectedSubCategory = this.item.subCategory;
    }
  }

  execute() {

    if (this.item == null) {
      return;
    }
    this.item.subCategory = this.selectedSubCategory;
    this.item.configuration = '{"lockTime":10}';

    if (this.item.id != null) {
      this.item.enabled = true;
      this.topicService.edit(this.item).subscribe(value => {
        this.fireEvent(value);
      });
    } else {
      this.topicService.create(this.item).subscribe(value => {
       this.fireEvent(value);
      });
    }
  }

  fireEvent(value) {
    console.log("fireEvent " + value)
    this.event.emit(value);
  }

}

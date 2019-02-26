import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MainCategoryService} from '../../../../shared/services/main-category.service';
import {Location} from '@angular/common';
import {SubCategoryService} from '../../../../shared/services/sub-category.service';
import {BasicTopicSelection} from '../../../general/basic-topic-selection';
import {TopicService} from '../../../../shared/services/topic.service';
import {UtilsService} from '../../../../shared/services/utils.service';
import {Subcategory} from '../../../../shared/model/subcategory';
import {SubCatListComponent} from '../sub-cat-list.component';

@Component({
  selector: 'app-create-sub-cat',
  templateUrl: './create-sub-cat.component.html',
  styleUrls: ['./create-sub-cat.component.scss']
})
export class CreateSubCatComponent extends BasicTopicSelection implements OnInit {


  @Input() item: Subcategory = {};
  @Output() event: EventEmitter<Object> = new EventEmitter();
  @Input() parent: SubCatListComponent;

  constructor(mainCatService: MainCategoryService,
              subCatService: SubCategoryService, topicService: TopicService, utils: UtilsService,
              private location: Location
  ) {
    super(topicService, subCatService, mainCatService, utils);
  }

  ngOnInit() {
    if (this.parent.selectedMainCategory != null) {
      this.selectedMainCategory = this.parent.selectedMainCategory;
    }
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
      this.subCategoryService.edit(this.item).subscribe(value => {
        this.fireEvent(value);
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg','EditSubCatSuccess',this.utils,'success');
      },error1 => {

        this.utils.messageService.printLocalizedMessage('FailureMsg','EditSubCatFailed',this.utils,'error');
        this.utils.messageService.printError(error1);
      });
    } else {
      this.subCategoryService.create(this.item).subscribe(value => {
        this.fireEvent(value);
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg','CreateSubCatSuccess',this.utils,'success');
      },error1 => {
        
        this.utils.messageService.printLocalizedMessage('FailureMsg','CreateSubCatFailed',this.utils,'error');
        this.utils.messageService.printError(error1);
      });
    }
  }

  fireEvent(value) {
    this.event.emit(value);
  }
}

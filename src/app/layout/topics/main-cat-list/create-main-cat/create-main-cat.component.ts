import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MainCategory} from '../../../../shared/model/mainCategory';
import {MainCategoryService} from '../../../../shared/services/main-category.service';

import {Location} from '@angular/common';
import {UtilsService} from "../../../../shared/services/utils.service";


@Component({
  selector: 'app-create-main-cat',
  templateUrl: './create-main-cat.component.html',
  styleUrls: ['./create-main-cat.component.scss']
})
export class CreateMainCatComponent implements OnInit {

  @Input() item: MainCategory = {};
  @Output() event: EventEmitter<Object> = new EventEmitter();
  @Input() parent: any;

  constructor(private mainCatService: MainCategoryService, private location: Location,  public utils: UtilsService ) {
  }

  ngOnInit() {
    if (this.item == null) {
      this.item = {};
    }
  }

  execute() {
    if (this.item.id != null) {
      this.mainCatService.edit(this.item).subscribe(value => {
        this.fireEvent(value);
        this.utils.messageService.printLocalizedMessage('SuccessFullMsg','EditMainCatSuccess',this.utils,'success');
      },error1 => {
        this.utils.messageService.printLocalizedMessage('FailureMsg','EditMainCatFailed',this.utils,'error');
        this.utils.messageService.printError(error1);
      });
    } else {
      this.mainCatService.create(this.item).subscribe(value => {
        this.fireEvent(value);

        this.utils.messageService.printLocalizedMessage('SuccessFullMsg','CreateMainCatSuccess',this.utils,'success');
      },error1 => {
        this.utils.messageService.printLocalizedMessage('FailureMsg','CreateMainCatFailed',this.utils,'error');
        this.utils.messageService.printError(error1);
      });
    }
  }

  fireEvent(value) {
    this.event.emit(value);
  }

}

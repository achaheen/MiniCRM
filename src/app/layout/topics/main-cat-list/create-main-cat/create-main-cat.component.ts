import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MainCategory} from '../../../../shared/model/mainCategory';
import {MainCategoryService} from '../../../../shared/services/main-category.service';

import {Location} from '@angular/common';

@Component({
  selector: 'app-create-main-cat',
  templateUrl: './create-main-cat.component.html',
  styleUrls: ['./create-main-cat.component.scss']
})
export class CreateMainCatComponent implements OnInit {

  @Input() item: MainCategory = {};
  @Output() event: EventEmitter<Object> = new EventEmitter();
  @Input() parent: any;

  constructor(private mainCatService: MainCategoryService, private location: Location) {
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
      });
    } else {
      this.mainCatService.create(this.item).subscribe(value => {
        this.fireEvent(value);
      });
    }
  }

  fireEvent(value) {
    this.event.emit(value);
  }

}

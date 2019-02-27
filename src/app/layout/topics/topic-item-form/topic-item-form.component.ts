import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-topic-item-form',
  templateUrl: './topic-item-form.component.html',
  styleUrls: ['./topic-item-form.component.scss']
})
export class TopicItemFormComponent implements OnInit {
  item: any;
  @Output('item') emitter: EventEmitter<any> = new EventEmitter<any>();

  configurationValue: string;

  @Input('item') get itemValue() {
    return this.item;
  }

  set itemValue(value) {
    this.item = value;
    if (this.item.configuration != null) {
      this.configurationValue = JSON.stringify(this.item.configuration);
    }
    this.emitter.emit(value);
  }

  onConfigValueChange(event) {
    // console.log(JSON.stringify(event));
    if (event != null && event !== '') {
      this.item.configuration = JSON.parse(event);
    } else {
      this.item.configuration = {};
    }

  }

  constructor() {
  }

  ngOnInit() {
  }


}

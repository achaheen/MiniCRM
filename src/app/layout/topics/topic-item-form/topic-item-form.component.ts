import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-topic-item-form',
  templateUrl: './topic-item-form.component.html',
  styleUrls: ['./topic-item-form.component.scss']
})
export class TopicItemFormComponent implements OnInit {
  item: any;
  @Output('item') emitter: EventEmitter<any> = new EventEmitter<any>();

  @Input('item') get itemValue() {
    return this.item;
  }

  set itemValue(value) {
    this.item = value;
    this.emitter.emit(value);
  }


  constructor() {
  }

  ngOnInit() {
  }

}

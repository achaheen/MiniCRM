import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../../../shared/model/configuration';
import {TicketExtData} from '../../../../shared/model/ticketExtData';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent implements OnInit {

  @Input() dynamicListValue: Field[];
  extData: TicketExtData = {};
  @Input() rowSize: number;
  @Output() emitter: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  updateFields() {
    if (this.extData != null && this.dynamicListValue != null) {
      this.dynamicListValue.forEach(value => {
        if (value.value === null) {
          value.value = '';
        }
        this.extData[value.mappedField] = value.value;
      });
    }
    this.emitter.emit(this.extData);
    console.log('Exd Data : ' + JSON.stringify(this.extData));
  }


  clear() {
    console.log('Clear');
    this.dynamicListValue.forEach(value => {
      value.value = null;
    });
  }
}

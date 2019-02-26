import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../../../shared/model/configuration';
import {TicketExtData} from '../../../../shared/model/ticketExtData';
import {SelectItem} from "primeng/api";

@Component({
  selector: 'div[app-dynamic-fields]',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent implements OnInit {

  @Input() dynamicListValue: Field[];
  extData: TicketExtData = {};
  @Input() rowSize: number;
  @Output() emitter: EventEmitter<any> = new EventEmitter();


  field: Field;

  selections: SelectItem[];

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



  init() {
    if (this.field != null && this.field.type === 1) {
      this.selections = [];
      this.field.options.forEach(opt => {
        this.selections.push({value: opt.value, label: opt.label});
      });
    }
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../../../shared/model/configuration';
import {TicketExtData} from '../../../../shared/model/ticketExtData';
import {SelectItem} from 'primeng/api';

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


  constructor() {
  }

  ngOnInit() {

  }


  getLabelModel(field) {
    let selections: SelectItem[];
    if (field != null && field.type === 1) {
      selections = [];
      field.options.forEach(opt => {
        selections.push({value: opt.value, label: opt.label});
      });
    }
    return selections;
  }


}

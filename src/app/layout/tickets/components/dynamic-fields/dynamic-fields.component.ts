import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../../../shared/model/configuration';
import {TicketExtData} from '../../../../shared/model/ticketExtData';
import {SelectItem} from 'primeng/api';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'div[app-dynamic-fields]',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent implements OnInit {

  @Input() dynamicListValue: Field[];
  @Input() extData: TicketExtData[];
  @Input() rowSize: number;
  @Output() emitter: EventEmitter<any> = new EventEmitter();
  @Input() viewType: string;
  hideFields :boolean = false;

  field: Field;


  constructor() {
  }

  ngOnInit() {
    this.mapExDataToConfiguration();
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


  mapExDataToConfiguration() {

    console.log(this.viewType + "   " + this.hideFields)
    if(this.viewType === 'viewTicket' && (this.extData === undefined ||this.extData.length === 0 )){
      this.hideFields = true;
    }

    if (this.extData != null && this.extData != undefined && this.extData.length != 0) {
      this.dynamicListValue.forEach(field => {
        field.value = this.extData[0][field.mappedField]
      })
    }
  }

}

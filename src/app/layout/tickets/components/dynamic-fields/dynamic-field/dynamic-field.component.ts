import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../../../../../shared/model/configuration';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss']
})
export class DynamicFieldComponent implements OnInit {

  @Input() field: Field;

  selections: SelectItem[];

  constructor() {
  }

  ngOnInit() {
    this.init();
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

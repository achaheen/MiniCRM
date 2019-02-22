import {Component, Input, OnInit} from '@angular/core';
import {BasicTopicSelection} from '../general/basic-topic-selection';

@Component({
  selector: 'app-topics-selection',
  templateUrl: './topics-selection.component.html',
  styleUrls: ['./topics-selection.component.scss']
})
export class TopicsSelectionComponent implements OnInit {

  @Input() public parent: BasicTopicSelection;

  @Input() skipTable: boolean;

  constructor() {
  }

  ngOnInit() {
    this.parent.listAllMainCategories();
  }

}

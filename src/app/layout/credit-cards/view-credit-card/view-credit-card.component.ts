import {Component, Input, OnInit} from '@angular/core';
import {CreditCard} from "../../../shared/model/CreditCard";

@Component({
  selector: 'app-view-credit-card',
  templateUrl: './view-credit-card.component.html',
  styleUrls: ['./view-credit-card.component.scss']
})
export class ViewCreditCardComponent implements OnInit {

  @Input() creditCardList:CreditCard[];
  constructor() { }

  ngOnInit() {
  }

}

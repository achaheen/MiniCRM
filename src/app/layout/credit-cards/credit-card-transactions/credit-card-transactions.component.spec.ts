import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardTransactionsComponent } from './credit-card-transactions.component';

describe('CreditCardTransactionsComponent', () => {
  let component: CreditCardTransactionsComponent;
  let fixture: ComponentFixture<CreditCardTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

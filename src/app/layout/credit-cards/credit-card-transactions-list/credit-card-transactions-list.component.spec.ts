import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardTransactionsListComponent } from './credit-card-transactions-list.component';

describe('CreditCardTransactionsListComponent', () => {
  let component: CreditCardTransactionsListComponent;
  let fixture: ComponentFixture<CreditCardTransactionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardTransactionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreditCardComponent } from './view-credit-card.component';

describe('ViewCreditCardComponent', () => {
  let component: ViewCreditCardComponent;
  let fixture: ComponentFixture<ViewCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCreditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

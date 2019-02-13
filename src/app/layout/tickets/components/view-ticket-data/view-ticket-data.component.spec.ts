import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketDataComponent } from './view-ticket-data.component';

describe('ViewTicketDataComponent', () => {
  let component: ViewTicketDataComponent;
  let fixture: ComponentFixture<ViewTicketDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTicketDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

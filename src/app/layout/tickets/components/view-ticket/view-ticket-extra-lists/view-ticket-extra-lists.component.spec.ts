import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketExtraListsComponent } from './view-ticket-extra-lists.component';

describe('ViewTicketExtraListsComponent', () => {
  let component: ViewTicketExtraListsComponent;
  let fixture: ComponentFixture<ViewTicketExtraListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTicketExtraListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketExtraListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

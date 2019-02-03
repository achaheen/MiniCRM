import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyTicketTableComponent } from './dy-ticket-table.component';

describe('DyTicketTableComponent', () => {
  let component: DyTicketTableComponent;
  let fixture: ComponentFixture<DyTicketTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyTicketTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyTicketTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

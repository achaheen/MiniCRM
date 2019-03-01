import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlaComponent } from './create-sla.component';

describe('CreateSlaComponent', () => {
  let component: CreateSlaComponent;
  let fixture: ComponentFixture<CreateSlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

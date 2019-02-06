import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtopicpermissionComponent } from './viewtopicpermission.component';

describe('ViewtopicpermissionComponent', () => {
  let component: ViewtopicpermissionComponent;
  let fixture: ComponentFixture<ViewtopicpermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtopicpermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtopicpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

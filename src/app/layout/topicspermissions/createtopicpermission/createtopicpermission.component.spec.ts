import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetopicpermissionComponent } from './createtopicpermission.component';

describe('CreatetopicpermissionComponent', () => {
  let component: CreatetopicpermissionComponent;
  let fixture: ComponentFixture<CreatetopicpermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetopicpermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetopicpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

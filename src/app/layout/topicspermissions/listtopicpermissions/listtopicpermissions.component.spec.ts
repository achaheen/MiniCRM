import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtopicpermissionsComponent } from './listtopicpermissions.component';

describe('ListtopicpermissionsComponent', () => {
  let component: ListtopicpermissionsComponent;
  let fixture: ComponentFixture<ListtopicpermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtopicpermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtopicpermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
